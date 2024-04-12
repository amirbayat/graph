import { render, fireEvent, screen } from "@testing-library/react";
import Canvas from "../components/Canvas";

describe("Canvas component", () => {
  it("should render canvas element", () => {
    const { getByTestId } = render(<Canvas />);
    const canvas = getByTestId("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should render graph on generate button click", () => {
    const nodes = [{ x: 10, y: 10, id: 1, edges: [], inEdges: [] }];
    const { getByTestId, getByText } = render(<Canvas nodes={nodes} />);
    const generateButton = getByText("Generate");
    fireEvent.click(generateButton);
    const canvas = getByTestId("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");
    if (ctx == null) throw new Error("Canvas context is not available");
    const imageData = ctx.getImageData(10, 10, 1, 1);
    const [red, green, blue] = imageData.data;
    expect(red).toBe(0); // For example, expecting red channel to be 255
    expect(green).toBe(0);
    expect(blue).toBe(255);
  });
});
