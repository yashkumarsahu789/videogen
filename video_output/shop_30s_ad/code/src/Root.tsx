import React from 'react';
import { Composition } from 'remotion';
import { Shop30sAd } from './Shop30sAd';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Shop30sAd"
      component={Shop30sAd}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
