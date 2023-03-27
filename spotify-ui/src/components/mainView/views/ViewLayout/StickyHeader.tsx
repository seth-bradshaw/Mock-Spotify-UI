import React from "react";
import { useNavigate } from "react-router";
import BaseControl from "../../../playback/controls/BaseControl";
import AccountPill from "../../../profile/AccountPill";

type Props = {
  bgColor?: string;
  title?: string;
};

export default function StickyHeader({
  bgColor = "transparent",
  title,
}: Props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };
  return (
    <div
      className="w-full h-14 flex justify-between fixed p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div className="flex gap-2">
        <BaseControl className="rounded-full bg-spotify-gray-800 text-white font-bold text-lg text-center" clickHandler={goBack}>&lt;</BaseControl>
        <BaseControl className="rounded-full bg-spotify-gray-800 text-white font-bold text-lg text-center" clickHandler={goForward}>&gt;</BaseControl>
        {title ? (
          <h3 className="text-white text-lg font-bold">{title}</h3>
        ) : null}
      </div>
      <div>
        <AccountPill />
      </div>
    </div>
  );
}
