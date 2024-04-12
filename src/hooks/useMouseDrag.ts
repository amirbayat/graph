import { MouseEventHandler, useState } from "react";
type TUseMouseDrag = {
  renderGraphOnMouseMove: () => void;
};
export const useMouseDrag = (args: TUseMouseDrag) => {
  const { renderGraphOnMouseMove } = args;
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - translateX);
    setStartY(event.clientY - translateY);
  };

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDragging) {
      const newTranslateX = event.clientX - startX;
      const newTranslateY = event.clientY - startY;
      if (newTranslateX <= 0) setTranslateX(newTranslateX);
      if (newTranslateY <= 0) setTranslateY(newTranslateY);
      renderGraphOnMouseMove();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    translateX,
    translateY,
  };
};
