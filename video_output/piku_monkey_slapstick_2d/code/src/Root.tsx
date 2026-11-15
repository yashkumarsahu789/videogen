import React from "react";
import { Composition } from "remotion";
import { PikuSlapstickVideo } from "./PikuSlapstickVideo";

export const Root: React.FC = () => {
  return (
    <Composition
      id="PikuSlapstickVideo"
      component={PikuSlapstickVideo}
      durationInFrames={1388}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
