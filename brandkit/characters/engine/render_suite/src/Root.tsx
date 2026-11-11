import React from 'react';
import { Composition } from 'remotion';
import { CharacterCardVideo } from './CharacterCardVideo';

import alexVisemes from './alex_visemes.json';
import mayaVisemes from './maya_visemes.json';
import kabirVisemes from './kabir_visemes.json';
import riyaVisemes from './riya_visemes.json';
import devVisemes from './dev_visemes.json';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AlexSample"
        component={CharacterCardVideo}
        durationInFrames={alexVisemes.frames.length}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          character: 'alex' as const,
          visemes: alexVisemes as any,
          name: 'Alex',
          role: 'Vibe Coder & Tech Creator',
          voiceName: 'Aarav (Hinglish/Hindi)',
          subtitle: 'Namaste dosto! Main hu Alex, aapka vibe coding aur tech creator partner.',
          themeColor: '#38BDF8',
        }}
      />
      <Composition
        id="MayaSample"
        component={CharacterCardVideo}
        durationInFrames={mayaVisemes.frames.length}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          character: 'maya' as const,
          visemes: mayaVisemes as any,
          name: 'Maya',
          role: 'AI Creative Director',
          voiceName: 'Ananya (Hinglish/Hindi)',
          subtitle: 'Hey creators! Main hu Maya, aur main direct karungi aapke AI videos.',
          themeColor: '#EC4899',
        }}
      />
      <Composition
        id="KabirSample"
        component={CharacterCardVideo}
        durationInFrames={kabirVisemes.frames.length}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          character: 'kabir' as const,
          visemes: kabirVisemes as any,
          name: 'Kabir',
          role: 'Deep Explainer & Documentary Lead',
          voiceName: 'Kabir (Hindi/English)',
          subtitle: 'Greetings. Main Kabir hu, deep explainers aur complex topics ko simple banane ke liye.',
          themeColor: '#F59E0B',
        }}
      />
      <Composition
        id="RiyaSample"
        component={CharacterCardVideo}
        durationInFrames={riyaVisemes.frames.length}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          character: 'riya' as const,
          visemes: riyaVisemes as any,
          name: 'Riya',
          role: 'Lifestyle & Community Creator',
          voiceName: 'Riya (Hindi/English)',
          subtitle: 'Hello friends! Main hu Riya, lifestyle aur creative video ideas share karne.',
          themeColor: '#10B981',
        }}
      />
      <Composition
        id="DevSample"
        component={CharacterCardVideo}
        durationInFrames={devVisemes.frames.length}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          character: 'dev' as const,
          visemes: devVisemes as any,
          name: 'Dev',
          role: '30-Second Speed Coder & Hacker',
          voiceName: 'Dev (Hinglish/English)',
          subtitle: 'Yo coders! Main Dev hu, 30-second speed code aur rapid tech hacks ke liye.',
          themeColor: '#34D399',
        }}
      />
    </>
  );
};

