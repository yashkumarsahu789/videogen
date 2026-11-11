import React from 'react';
import { useCurrentFrame } from 'remotion';
import { AlexCharacter, MouthState, EyeState } from '../../../../brandkit/characters/alex/AlexCharacter';
import visemesData from './visemes.json';

export const AlexDemo: React.FC = () => {
  const frame = useCurrentFrame();

  const totalFrames = visemesData.frames.length;
  const currentFrameInfo = visemesData.frames[Math.min(frame, totalFrames - 1)] || {
    mouth: 'rest',
    eyes: 'open',
    headY: 0,
    headRot: 0,
    volume: 0,
  };

  const mouth = currentFrameInfo.mouth as MouthState;
  const eyes = currentFrameInfo.eyes as EyeState;
  const headY = currentFrameInfo.headY || 0;
  const headRot = currentFrameInfo.headRot || 0;

  return (
    <div
      style={{
        flex: 1,
        width: 1080,
        height: 1920,
        backgroundColor: '#07090E',
        color: '#FFFFFF',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '80px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(7, 9, 14, 0) 70%)',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
        }}
      />

      {/* Top Header Badge */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
        }}
      >
        <div
          style={{
            background: 'rgba(56, 189, 248, 0.15)',
            border: '1.5px solid rgba(56, 189, 248, 0.4)',
            padding: '10px 24px',
            borderRadius: 30,
            fontSize: 22,
            fontWeight: 800,
            color: '#38BDF8',
            letterSpacing: 2,
          }}
        >
          ● LIVE CODE-DRIVEN PUPPET
        </div>
        <div style={{ fontSize: 44, fontWeight: 900, color: '#FFFFFF' }}>
          MEET ALEX · VIBE CODER
        </div>
        <div style={{ fontSize: 24, color: '#94A3B8' }}>
          Parametric Lip-Sync · Procedural Blink & Head Bob
        </div>
      </div>

      {/* Character Center Stage */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: -40,
        }}
      >
        <AlexCharacter
          mouthState={mouth}
          eyeState={eyes}
          eyebrowState="neutral"
          headY={headY}
          headRot={headRot}
          width={750}
          height={980}
        />
      </div>

      {/* Bottom Subtitle Card */}
      <div
        style={{
          width: '100%',
          maxWidth: 960,
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(255, 221, 0, 0.4)',
          borderRadius: 24,
          padding: '28px 36px',
          textAlign: 'center',
          zIndex: 10,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ fontSize: 20, color: '#FFDD00', fontWeight: 800, marginBottom: 8, letterSpacing: 1 }}>
          VOICE: AARAV (NEURAL HINGLISH) · FRAME {frame} / {totalFrames}
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: '#FFFFFF', lineHeight: 1.35 }}>
          "Namaste dosto! Mera naam <span style={{ color: '#38BDF8' }}>Alex</span> hai aur me <span style={{ color: '#FFDD00' }}>100% code</span> se bana puppet hu."
        </div>
      </div>
    </div>
  );
};

