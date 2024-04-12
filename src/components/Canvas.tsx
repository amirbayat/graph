import { useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { TNode } from "../types/node.type";
import { generateNodes } from "../utils/generateNodes";
import Actions from "./Actions";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const [zoom, setZoom] = useState<number>(1);
  function generate() {
    const nodes = generateNodes(1000, 3000, 1000, 1000);
    renderGraph(nodes);
  }

  function zoomIn() {
    setZoom(Number((zoom + 0.1).toFixed(2)));
    // renderGraph(nodesRef.current);
  }

  function zoomOut() {
    if (zoom > 1) {
      setZoom(Number((zoom - 0.1).toFixed(2)));
      //   renderGraph(nodesRef.current);
    }
  }

  function renderGraph(nodes: TNode[]) {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    nodes.forEach(({ x, y, id, edges, inEdges }) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(id.toString(), x - 5, y - 10);
    });
  }

  return (
    <div>
      <canvas height={600} width={600} ref={canvasRef}></canvas>
      <Actions
        generate={generate}
        zoom={zoom}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
    </div>
  );
};

export default Canvas;
