import React from 'react';
import { Composition } from 'remotion';
import { BastarYashAd } from './BastarYashAd';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BastarYashAd"
      component={BastarYashAd}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
