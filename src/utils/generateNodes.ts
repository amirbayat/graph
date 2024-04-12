import { TNode } from "../types/node.type";

const DEFAULT_NODES_COUNT = 10;
const DEFAULT_EDGES_COUNT = 30;
const DEFAULT_MAX_WIDTH = 100;
const DEFAULT_MAX_HEIGHT = 100;

export function generateNodes(
  nodesCount: number = DEFAULT_NODES_COUNT,
  edgesCount: number = DEFAULT_EDGES_COUNT,
  maxWidth: number = DEFAULT_MAX_WIDTH,
  maxHeight: number = DEFAULT_MAX_HEIGHT
): Array<TNode> {
  const nodes: TNode[] = [];
  for (let i = 0; i < nodesCount; i++) {
    const x = Number((Math.random() * maxWidth).toFixed());
    const y = Number((Math.random() * maxHeight).toFixed());
    nodes.push({ x, y, id: i, edges: [], inEdges: [] });
  }

  for (let i = 0; i < edgesCount; i++) {
    const source = Math.floor(Math.random() * nodesCount);
    const target = Math.floor(Math.random() * nodesCount);
    let hasEdgeSource = nodes?.[source]?.edges?.find(
      (sourceEdge) => sourceEdge.id == target
    );
    if (!hasEdgeSource) nodes?.[source]?.edges.push(nodes?.[target]);

    let hasEdgeTarget = nodes?.[target]?.inEdges?.find(
      (targetEdge) => targetEdge.id == source
    );
    if (!hasEdgeTarget) nodes?.[target]?.inEdges.push(nodes?.[source]);
  }
  return nodes;
}
