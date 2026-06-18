from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # type: ignore[import]
import sqlite3

app = Flask(__name__)
CORS(app)

# ================= DB CONNECTION =================

def connect_db():
    conn = sqlite3.connect("expenses.db")
    conn.row_factory = sqlite3.Row
    return conn


# ================= HELPER FUNCTION =================
def row_to_dict(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "amount": row["amount"],
        "category": row["category"],
        "date": row["date"],
        "note": row["note"]
    }


# ================= GET ALL EXPENSES =================
@app.route("/expenses", methods=["GET"])
def get_expenses():
    print("GET /expenses called")

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses")
    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])
# ================= ADD EXPENSE =================

@app.route("/add-expense", methods=["POST"])
def add_expense():

    print("=" * 50)
    print("POST /add-expense called")

    try:

        data = request.get_json()

        print("DATA:", data)

        title = data.get("title")
        amount = data.get("amount")
        category = data.get("category")
        date = data.get("date")
        note = data.get("note", "")

        print(title, amount, category, date)

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO expenses
            (title, amount, category, date, note)
            VALUES (?, ?, ?, ?, ?)
        """, (
            title,
            float(amount),
            category,
            date,
            note
        ))

        conn.commit()

        print("INSERT SUCCESS")

        return jsonify({
            "message": "Expense added successfully"
        }), 201

    except Exception as e:

        print("ERROR:", repr(e))

        return jsonify({
            "error": str(e)
        }), 500

# ================= DELETE EXPENSE =================

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):

    # connect to DB
    conn = connect_db()
    cursor = conn.cursor()

    # check if expense exists first
    cursor.execute("SELECT * FROM expenses WHERE id = ?", (id,))
    expense = cursor.fetchone()

    if expense is None:
        conn.close()
        return jsonify({"error": "Expense not found"}), 404

    # delete expense
    cursor.execute("DELETE FROM expenses WHERE id = ?", (id,))
    conn.commit()
    conn.close()

    return jsonify({"message": "Expense deleted successfully"}), 200


# ================= EDIT EXPENSE =================
@app.route("/expenses/<int:id>", methods=["GET"])
def get_expense(id):

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses WHERE id = ?", (id,))
    row = cursor.fetchone()

    conn.close()

    if row is None:
        return jsonify({"error": "Not found"}), 404

    return jsonify(row_to_dict(row))


# ================= UPDATE EXPENSE =================
@app.route("/update-expense/<int:id>", methods=["PUT"])
def update_expense(id):

    data = request.get_json()

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT id FROM expenses WHERE id=?",
        (id,)
    )

    if cursor.fetchone() is None:
        conn.close()
        return jsonify({"error": "Expense not found"}), 404

    cursor.execute("""
        UPDATE expenses
        SET title=?, amount=?, category=?, date=?, note=?
        WHERE id=?
    """, (
        data["title"],
        data["amount"],
        data["category"],
        data["date"],
        data["note"],
        id
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Expense updated"})

# ================= CLEAR ALL EXPENSE =================
@app.route("/clear-expenses", methods=["DELETE"])
def clear_expenses():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM expenses")
    conn.commit()
    conn.close()

    return jsonify({"message": "All expenses deleted"})

# ================= Create Database Table =================
def init_db():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT,
        date TEXT,
        note TEXT
    )
    """)

    conn.commit()
    conn.close()


# ================= ERROR LOGGING =================
@app.errorhandler(404)
def not_found(e):
    return jsonify({
        "error": "Route not found",
        "requested_url": request.url
    }), 404


# ================= HOME ROUTE =================
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Expense Tracker API Running"
    })
# ================= RUN SERVER =================
if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=5000, debug=True)