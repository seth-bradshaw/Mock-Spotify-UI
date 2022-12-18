import React, { FormEvent, ReactElement } from "react";

import "../../slider.css";

export const updateBackground = (e: FormEvent, bgColor: string = "#1ED760") => {
  const target = e.target as HTMLInputElement;
  var value =
    ((Number(target.value) - Number(target.min)) /
      (Number(target.max) - Number(target.min))) *
    100;
  target.style.background = `linear-gradient(to right, ${bgColor} 0%, ${bgColor} ${value}%, #A7A7A7 ${value}%, #A7A7A7 100%)`;
};

interface Props {
  defaultValue: number;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  id: string;
}

export default function BaseSlider({
  defaultValue = 0,
  handleChange,
  id,
}: Props): ReactElement {
  const handleClick = (e: FormEvent<HTMLInputElement>) => {
    handleChange(e);
  };

  return (
    <input
      id={id}
      className="slider"
      type="range"
      min="0"
      max="100"
      defaultValue={defaultValue}
      onInput={(e: FormEvent<HTMLInputElement>) => {
        updateBackground(e);
        handleClick(e);
      }}
      onClick={(e: FormEvent<HTMLInputElement>) => {
        updateBackground(e);
        handleClick(e);
      }}
      onMouseOver={updateBackground}
      onMouseLeave={(e: FormEvent<HTMLInputElement>) =>
        updateBackground(e, "#ffffff")
      }
    />
  );
}
