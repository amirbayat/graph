import { TNode } from "../types/node.type";
import { getVisibleNodes } from "./getVisibleNodes";

type TRenderGraphHelper = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  zoom: number;
  nodes: TNode[];
  translateX: number;
  translateY: number;
};
export function renderGraphHelper(args: TRenderGraphHelper) {
  const { canvasRef, zoom, nodes, translateX, translateY } = args;
  const TEXT_MOVE = 10;
  const canvas = canvasRef.current;
  if (canvas == null) return;
  const ctx = canvas.getContext("2d");
  if (ctx == null) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ddd";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  const visibleNodes = getVisibleNodes({
    nodes,
    translateX,
    translateY,
    canvasWidth,
    canvasHeight,
    zoom,
  });

  visibleNodes.forEach(({ x, y, id, edges, inEdges }) => {
    ctx.beginPath();
    const xP = x * zoom + translateX;
    const yP = y * zoom + translateY;
    ctx.arc(xP, yP, 5 + zoom, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(id.toString(), xP - 5, yP - 10);

    edges.forEach((edge) => {
      const endXP = edge.x * zoom + translateX;
      const endYP = edge.y * zoom + translateY;
      ctx.beginPath();
      ctx.moveTo(xP, yP);
      ctx.lineTo(endXP, endYP);
      ctx.strokeStyle = "red";
      ctx.stroke();
      const angle = Math.atan2(endYP - yP, endXP - xP);
      ctx.font = `${10 + zoom}px Arial`;
      ctx.textAlign = "left";
      ctx.fillStyle = "black";
      const text = `${id} : ${edge.id}`;

      ctx.save();
      ctx.translate(
        xP + TEXT_MOVE * zoom,
        yP + TEXT_MOVE * zoom * Math.tan(angle)
      );
      ctx.rotate(angle);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    });

    inEdges.forEach((edge) => {
      const endXP = edge.x * zoom + translateX;
      const endYP = edge.y * zoom + translateY;
      ctx.beginPath();
      ctx.moveTo(xP, yP);
      ctx.lineTo(endXP, endYP);
      ctx.strokeStyle = "green";
      ctx.stroke();

      const angle = Math.atan2(endYP - yP, endXP - xP);
      ctx.font = `${10 + zoom}px Arial`;
      ctx.textAlign = "left";
      ctx.fillStyle = "black";
      const text = `${edge.id} : ${id}`;

      ctx.save();
      ctx.translate(
        xP + TEXT_MOVE * zoom,
        yP + TEXT_MOVE * zoom * Math.tan(angle)
      );
      ctx.rotate(angle);
      ctx.fillText(text, 0, 0);
      ctx.restore();
    });
  });
}
