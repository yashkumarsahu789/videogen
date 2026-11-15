import React from "react";
import { Composition } from "remotion";
import { ToonTussleBattle } from "./ToonTussleBattle";

export const Root: React.FC = () => {
  return (
    <Composition
      id="ToonTussleBattle"
      component={ToonTussleBattle}
      durationInFrames={1740}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
