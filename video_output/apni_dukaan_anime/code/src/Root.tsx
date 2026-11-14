import React from 'react';
import { Composition } from 'remotion';
import { ApniDukaanAnime } from './ApniDukaanAnime';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="ApniDukaanAnime"
      component={ApniDukaanAnime}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
