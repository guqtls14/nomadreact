import { useState } from "react";
import Circle from "./Circle";

import "./App.css";

function App() {
  return (
    <div>
      <Circle bgColor="orange" borderColor="yellow" />
      <Circle bgColor="pink" text="lalala" />
    </div>
  );
}

export default App;
