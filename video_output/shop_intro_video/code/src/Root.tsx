import React from 'react';
import { Composition } from 'remotion';
import { ShopIntroVideo } from './ShopIntroVideo';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ShopIntroVideo"
      component={ShopIntroVideo}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
