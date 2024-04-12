import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  return (
    <div>
      <Canvas nodes={[{ x: 50.5, y: 50.5, id: -1, edges: [], inEdges: [] }]} />
    </div>
  );
}

export default App;
