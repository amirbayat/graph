import { useCanvas } from "../hooks/useCanvas";
import { TNode } from "../types/node.type";
import { generateNodes } from "../utils/generateNodes";

const Canvas = () => {
  const { canvasRef } = useCanvas();
  const nodes = generateNodes();
  return <canvas height={600} width={600} ref={canvasRef}></canvas>;
};

export default Canvas;
