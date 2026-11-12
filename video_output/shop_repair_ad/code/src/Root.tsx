import React from 'react';
import { Composition } from 'remotion';
import { ShopRepairAd } from './ShopRepairAd';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ShopRepairAd"
      component={ShopRepairAd}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

