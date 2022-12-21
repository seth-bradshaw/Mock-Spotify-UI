import React from "react";
import "./layoutResize.css";
type Props = {};

export default function Resize({}: Props) {
  const calcColumns = (xCoord: number) => {
    const deviceWidth = window.innerWidth;
    const max = 300;
    const min = 130;

    if (max < xCoord) {
      stopDragging();
      return `${max}px 1fr`;
    }

    if (min > xCoord) {
      stopDragging();
      return `${min}px 1fr`;
    }

    // * times and subtract by 2 to account for 2 cols
    const percent = (xCoord / deviceWidth) * 2;

    return percent + "fr " + (2 - Number(percent)).toString() + "fr";
  };

  const startDragging = () => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", stopDragging)
  };

  const stopDragging = () => {
    document.removeEventListener("mousemove", resize);
    document.removeEventListener("mouseup", stopDragging);
  }

  const resize = (e: any) => {
    const pageElement = document.querySelector("#home-page");

    (pageElement as HTMLDivElement).style.gridTemplateColumns =
      calcColumns(e.clientX);
  };

  return (
    <div
      id="layout-resizer"
      onMouseDown={startDragging}
      className="block -right-1 z-20 absolute h-full w-2.5 hover:cursor-col-resize"
    ></div>
  );
}
