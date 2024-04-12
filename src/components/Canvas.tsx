import React, { useRef, useEffect } from "react";

type Props = {
  zoom?: number;
};
const Canvas = (props: Props) => {
  const { zoom = 1 } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas == null) return;
    const ctx = canvas.getContext("2d");
    if (ctx == null) return;
    canvas.width = window.innerWidth;
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);
  return <canvas height={600} width={600} ref={canvasRef}></canvas>;
};

export default Canvas;
