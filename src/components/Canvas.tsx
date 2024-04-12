import { useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { TNode } from "../types/node.type";
import { generateNodes } from "../utils/generateNodes";
import Actions from "./Actions";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const [zoom, setZoom] = useState<number>(1);
  function generate() {
    const nodes = generateNodes();
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
