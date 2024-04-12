import { render, fireEvent } from "@testing-library/react";
import { wait } from "@testing-library/user-event/dist/utils";
import Canvas from "../components/Canvas";

describe("Canvas component", () => {
  it("should render canvas element", () => {
    const { getByTestId } = render(<Canvas />);
    const canvas = getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should render graph on generate button click", () => {
    const nodes = [{ x: 10.5, y: 10.5, id: 1, edges: [], inEdges: [] }];
    const { getByTestId, getByText } = render(<Canvas nodes={nodes} />);
    const generateButton = getByText("Generate");
    fireEvent.click(generateButton);
    const canvas = getByTestId("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) throw new Error("Canvas context is not available");
    const imageData = ctx.getImageData(10.5, 10.5, 1, 1);
    const [red, green, blue] = imageData.data;
    expect(red).toBe(0);
    expect(green).toBe(0);
    expect(blue).toBe(255);
  });

  it("should move graph on mouse move", () => {
    const nodes = [{ x: 50.5, y: 50.5, id: -1, edges: [], inEdges: [] }];
    const { getByTestId, getByText } = render(<Canvas nodes={nodes} />);
    const generateButton = getByText("Generate");
    fireEvent.click(generateButton);
    const canvas = getByTestId("canvas") as HTMLCanvasElement;
    const canvasWrapper = getByTestId("canvas-wrapper");
    expect(canvasWrapper).toBeInTheDocument();
    const ctx = canvas.getContext("2d");
    if (ctx == null) throw new Error("Canvas context is not available");
    fireEvent.mouseDown(canvasWrapper);
    fireEvent.mouseMove(canvasWrapper, { clientX: -10, clientY: -10 });
    fireEvent.mouseUp(canvasWrapper);
    const imageData = ctx.getImageData(50.5, 50.5, 1, 1);
    const [red, green, blue] = imageData.data;
    expect(red).toBe(0);
    expect(green).toBe(0);
    expect(blue).toBe(255);
  });
});
