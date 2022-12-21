import React, { FormEvent, ReactElement, useEffect, useRef, useState } from "react";

import "../../slider.css";

// * types
interface Props {
  defaultValue: number;
  handleChange: (e: FormEvent<HTMLInputElement>) => void;
  id: string;
  value: number;
  max?: string;
  className?: string;
}

enum BackgroundColor {
  white = '#ffffff',
  green = "#1ED760"
}

export default function BaseSlider({
  handleChange,
  id,
  className = '',
  max = '100',
  value = 0
}: Props): ReactElement {
  const [background, setBackground] = useState<BackgroundColor>(BackgroundColor.white);
  // * reference to input, avoids needing to select by id
  const inputRef = useRef<HTMLInputElement | null>(null); 

  useEffect(() => {
    // * calcs percentage of either BackgroundColor options to display
    const percent = (value / Number(max)) * 100 || 0;  

    if (inputRef.current) {
      // * update input background to display BackgroundColor option x percent
      inputRef.current.style.background = `linear-gradient(to right, ${background} 0%, ${background} ${percent}%, #A7A7A7 ${percent}%, #A7A7A7 100%)`;
    }
  }, [value, background])

  return (
    <input
      ref={inputRef}
      id={id}
      className={`slider ${className}`}
      type="range"
      min="0"
      max={max}
      value={value}
      onInput={(e: FormEvent<HTMLInputElement>) => handleChange(e)}
      onClick={(e: FormEvent<HTMLInputElement>) => handleChange(e)}
      onMouseOver={() => setBackground(BackgroundColor.green)}
      onMouseLeave={() => setBackground(BackgroundColor.white)}
    />
  );
}
