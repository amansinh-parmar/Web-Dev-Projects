import { useState } from "react";
import DailyUpdate from "../pages/DailyUpdate";
import "./index.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="text-center bg-purple-500 p-2">
        <h1 className="text-lg text-white tracking-widest font-bold  text-bold">
          Hello Developer
        </h1>
      </div>

      <DailyUpdate />
    </>
  );
}

export default App;
