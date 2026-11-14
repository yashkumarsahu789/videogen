import React from 'react';
import { Composition } from 'remotion';
import { ShopAvatarAd } from './ShopAvatarAd';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ShopAvatarAd"
      component={ShopAvatarAd}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
