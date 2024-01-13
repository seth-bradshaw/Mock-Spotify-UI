import React, { useEffect } from "react";
import "./layoutResize.css";
type Props = {
  expanded: boolean
  toggleMenu: () => void
};

export default function Resize({ expanded, toggleMenu }: Props) {
  const calcColumns = (xCoord: number) => {
    const deviceWidth = window.innerWidth;
    const max = 500;
    const min = 90;

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
    let xCoord = e.clientX;
    
    if (expanded && xCoord <= 150) {
      toggleMenu()
      return
    }

    if (!expanded && xCoord >= 200) {
      toggleMenu()
      return
    }

    if (expanded && (xCoord < 300 && xCoord > 120)) {
      xCoord = 300
    }

    if (!expanded && xCoord <= 300) {
      xCoord = 100
    }


    (pageElement as HTMLDivElement).style.gridTemplateColumns =
      calcColumns(xCoord);
  };

  useEffect(() => {
    if (expanded) {
      resize({clientX: 350}, )
    } else {
      console.log('resizing to 100')
      resize({clientX: 100}, )
    }
  }, [expanded])

  return (
    <div
      id="layout-resizer"
      onMouseDown={startDragging}
      className="block -right-1 z-20 absolute h-full w-2.5 hover:cursor-col-resize select-none"
    ></div>
  );
}
