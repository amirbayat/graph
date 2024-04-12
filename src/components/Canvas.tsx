import { useRef, useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { TNode } from "../types/node.type";
import { generateNodes } from "../utils/generateNodes";
import Actions from "./Actions";
import { useMouseDrag } from "../hooks/useMouseDrag";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const [zoom, setZoom] = useState<number>(1);

  const {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
    translateX,
    translateY,
  } = useMouseDrag({ renderGraphOnMouseMove });
  const nodesRef = useRef<TNode[]>([]);

  function generate() {
    const nodes = generateNodes(1000, 3000, 2000, 2000);
    nodesRef.current = nodes;
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
      const xP = x + translateX;
      const yP = y + translateY;
      ctx.arc(xP, yP, 5, 0, Math.PI * 2);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.font = "12px Arial";
      ctx.fillStyle = "black";
      ctx.fillText(id.toString(), xP - 5, yP - 10);
    });
  }

  function renderGraphOnMouseMove() {
    renderGraph(nodesRef.current);
  }

  return (
    <div
      className="wrapper"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
