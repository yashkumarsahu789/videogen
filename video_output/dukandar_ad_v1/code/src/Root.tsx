import React from 'react';
import { Composition } from 'remotion';
import { DukandarAd } from './DukandarAd';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DukandarAdV1"
      component={DukandarAd}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
