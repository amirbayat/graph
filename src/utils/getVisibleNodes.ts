import { TNode } from "../types/node.type";

const N_WINDOW = -0.1;
const P_WINDOW = 1.1;

type TGetVisibleNodes = {
  nodes: TNode[];
  translateX: number;
  translateY: number;
  canvasWidth: number;
  canvasHeight: number;
};

export function getVisibleNodes(args: TGetVisibleNodes) {
  const { nodes, translateX, translateY, canvasWidth, canvasHeight } = args;
  return nodes.filter((node) => {
    const x = node.x + translateX;
    const y = node.y + translateY;
    const nWindowH = N_WINDOW * canvasWidth;
    const pWindowH = P_WINDOW * canvasWidth;
    const nWindowV = N_WINDOW * canvasHeight;
    const pWindowV = P_WINDOW * canvasHeight;
    return x >= nWindowH && x < pWindowH && y >= nWindowV && y < pWindowV;
  });
}
