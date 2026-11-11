import React from 'react';
import { useCurrentFrame } from 'remotion';
import { AlexCharacter, MouthState, EyeState, EyebrowState } from '../alex/AlexCharacter';
import { MayaCharacter } from '../maya/MayaCharacter';
import { KabirCharacter } from '../kabir/KabirCharacter';
import { RiyaCharacter } from '../riya/RiyaCharacter';
import { DevCharacter } from '../dev/DevCharacter';

export type CharacterId = 'alex' | 'maya' | 'kabir' | 'riya' | 'dev';

export interface FrameData {
  frame: number;
  mouth: MouthState;
  eyes: EyeState;
  headY?: number;
  headRot?: number;
  volume?: number;
}

export interface VisemesData {
  fps: number;
  total_frames: number;
  duration_seconds: number;
  frames: FrameData[];
}

export interface PuppetMasterProps {
  character?: CharacterId;
  visemes?: VisemesData | null;
  manualMouth?: MouthState;
  manualEyes?: EyeState;
  manualEyebrows?: EyebrowState;
  width?: number;
  height?: number;
}

export const PuppetMaster: React.FC<PuppetMasterProps> = ({
  character = 'alex',
  visemes = null,
  manualMouth,
  manualEyes,
  manualEyebrows = 'neutral',
  width = 600,
  height = 800,
}) => {
  let frame = 0;
  try {
    frame = useCurrentFrame();
  } catch (e) {
    frame = 0;
  }

  let mouth: MouthState = manualMouth || 'rest';
  let eyes: EyeState = manualEyes || 'open';
  let headY = 0;
  let headRot = 0;

  if (visemes && visemes.frames && visemes.frames.length > 0) {
    const currentFrameData = visemes.frames[Math.min(frame, visemes.frames.length - 1)];
    if (currentFrameData) {
      mouth = manualMouth || currentFrameData.mouth || 'rest';
      eyes = manualEyes || currentFrameData.eyes || 'open';
      headY = currentFrameData.headY || 0;
      headRot = currentFrameData.headRot || 0;
    }
  }

  const commonProps = {
    mouthState: mouth,
    eyeState: eyes,
    eyebrowState: manualEyebrows,
    headY,
    headRot,
    width,
    height,
  };

  switch (character) {
    case 'maya':
      return <MayaCharacter {...commonProps} />;
    case 'kabir':
      return <KabirCharacter {...commonProps} />;
    case 'riya':
      return <RiyaCharacter {...commonProps} />;
    case 'dev':
      return <DevCharacter {...commonProps} />;
    case 'alex':
    default:
      return <AlexCharacter {...commonProps} />;
  }
};
