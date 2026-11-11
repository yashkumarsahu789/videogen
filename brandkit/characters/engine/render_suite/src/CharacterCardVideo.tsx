import React from 'react';
import { useCurrentFrame } from 'remotion';
import { PuppetMaster, CharacterId, VisemesData } from '../../PuppetMaster';

interface CharacterCardProps {
  character: CharacterId;
  visemes: VisemesData;
  name: string;
  role: string;
  voiceName: string;
  subtitle: string;
  themeColor: string;
}

export const CharacterCardVideo: React.FC<CharacterCardProps> = ({
  character,
  visemes,
  name,
  role,
  voiceName,
  subtitle,
  themeColor,
}) => {
  const frame = useCurrentFrame();
  const totalFrames = visemes.frames.length;

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
          top: '38%',
          left: '50%',
          width: 750,
          height: 750,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeColor}33 0%, rgba(7, 9, 14, 0) 70%)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(75px)',
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
            background: `${themeColor}22`,
            border: `1.5px solid ${themeColor}66`,
            padding: '10px 24px',
            borderRadius: 30,
            fontSize: 22,
            fontWeight: 800,
            color: themeColor,
            letterSpacing: 2,
          }}
        >
          ● 100% CODE-DRIVEN PUPPET
        </div>
        <div style={{ fontSize: 50, fontWeight: 900, color: '#FFFFFF', letterSpacing: 1 }}>
          {name.toUpperCase()}
        </div>
        <div style={{ fontSize: 24, color: '#94A3B8' }}>
          {role} · Voice: <strong style={{ color: themeColor }}>{voiceName}</strong>
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
          marginTop: -30,
        }}
      >
        <PuppetMaster
          character={character}
          visemes={visemes}
          width={760}
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
          border: `2px solid ${themeColor}55`,
          borderRadius: 24,
          padding: '28px 36px',
          textAlign: 'center',
          zIndex: 10,
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: themeColor,
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: 1.5,
          }}
        >
          VOICE: {voiceName.toUpperCase()} · FRAME {frame} / {totalFrames}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.35,
          }}
        >
          "{subtitle}"
        </div>
      </div>
    </div>
  );
};

