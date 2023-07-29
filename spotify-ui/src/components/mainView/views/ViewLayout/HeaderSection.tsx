import React from "react";

type Props = {
  header: string;
  subheader: any;
  imgSrc: string;
  label?: string;
  backgroundColor?: string; // either hex or rgb
};
// TODO this needs the label logic added
export default function HeaderSection({
  header,
  subheader,
  label,
  backgroundColor,
  imgSrc,
}: Props) {
  return (
    <div className="mt-10 h-80 flex flex-col items-end" style={{ backgroundColor }}>
      <div className="w-full bg-transparent text-white flex items-center h-full p-6 gap-10">
        <img
          id="artist-img"
          className="object-cover bg-center bg-no-repeat h-64 w-64"
          src={imgSrc}
          crossOrigin="anonymous"
          alt="Image of artist, album cover, or song."
        ></img>
        <div className="flex flex-col justify-left">
          {label && <p className="text-md">{label}</p>}
          <h1 className="text-[72px] font-bold mb-6">{header}</h1>
          <h3 className="text-lg">{subheader}</h3>
        </div>
      </div>
    </div>
  );
}
