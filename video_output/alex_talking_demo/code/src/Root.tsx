import React from 'react';
import { Composition } from 'remotion';
import { AlexDemo } from './AlexDemo';
import visemesData from './visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AlexTalkingDemo"
      component={AlexDemo}
      durationInFrames={visemesData.frames.length}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};

