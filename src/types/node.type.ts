export type TNode = {
  x: number;
  y: number;
  id: number;
  edges: Array<TNode>;
  inEdges: Array<TNode>;
};
