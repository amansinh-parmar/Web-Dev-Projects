from flask import Flask, request, jsonify  # type: ignore[import]
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

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses")
    rows = cursor.fetchall()

    conn.close()

    return jsonify([dict(row) for row in rows])


# ================= ADD EXPENSE =================

@app.route("/add-expense", methods=["POST"])
def add_expense():

    data = request.get_json()

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (title, amount, category, date, note)
        VALUES (?, ?, ?, ?, ?)
    """, (
        data.get("title"),
        data.get("amount"),
        data.get("category"),
        data.get("date"),
        data.get("note")
    ))

    conn.commit()
    conn.close()

    return jsonify({"message": "Expense added"})


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

    cursor.execute("""
        UPDATE expenses
        SET title = ?, amount = ?, category = ?, date = ?, note = ?
        WHERE id = ?
    """, (
        data.get("title"),
        data.get("amount"),
        data.get("category"),
        data.get("date"),
        data.get("note"),
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

# ================= RUN SERVER =================
if __name__ == "__main__":
    app.run(debug=True)