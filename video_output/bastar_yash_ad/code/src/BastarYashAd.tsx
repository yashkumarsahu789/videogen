import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { AlexCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/alex/AlexCharacter';
import visemesData from './visemes.json';
import assets from './assets_b64.json';

export const BastarYashAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  // Scene timing configuration across 1709 frames (~56.95 seconds)
  // Scene 1: Namaste Bastar Market (0 - 280)
  // Scene 2: Online Shop with Mobile (280 - 540)
  // Scene 3: Kirana Counter QR & WhatsApp (540 - 900)
  // Scene 4: Mobile & Electronics Repair (900 - 1280)
  // Scene 5: Restaurant & Cafe Table QR (1280 - 1520)
  // Scene 6: Digital Store Success & CTA (1520 - 1709)
  let activeImageKey = 'bastar_market.jpg';
  let eyebrow: EyebrowState = 'neutral';
  let sceneStart = 0;
  let sceneEnd = 280;

  if (frame < 280) {
    activeImageKey = 'bastar_market.jpg';
    eyebrow = 'neutral';
    sceneStart = 0;
    sceneEnd = 280;
  } else if (frame < 540) {
    activeImageKey = 'shopkeeper_mobile.jpg';
    eyebrow = 'curious';
    sceneStart = 280;
    sceneEnd = 540;
  } else if (frame < 900) {
    activeImageKey = 'kirana_counter.jpg';
    eyebrow = 'neutral';
    sceneStart = 540;
    sceneEnd = 900;
  } else if (frame < 1280) {
    activeImageKey = 'repair_technician.jpg';
    eyebrow = 'neutral';
    sceneStart = 900;
    sceneEnd = 1280;
  } else if (frame < 1520) {
    activeImageKey = 'cafe_dining.jpg';
    eyebrow = 'raised';
    sceneStart = 1280;
    sceneEnd = 1520;
  } else {
    activeImageKey = 'digital_store.jpg';
    eyebrow = 'neutral';
    sceneStart = 1520;
    sceneEnd = 1709;
  }

  // Floating Pulse Animation for character
  const pulse = Math.sin(frame * 0.12) * 4;

  // Smooth Photo Card Entrance & Subtle Ken Burns Zoom
  const photoScale = interpolate(
    frame,
    [sceneStart, sceneEnd],
    [1.0, 1.05],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const activeImageUri = (assets as Record<string, string>)[activeImageKey] || '';

  return (
    <div
      style={{
        flex: 1,
        width: 1080,
        height: 1920,
        // ☀️ LIGHT / DAY COLOR THEME
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 40%, #EFF6FF 100%)',
        color: '#0F172A',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft Daytime Ambient Sun Rays / Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.18) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* TOP: LOGO ONLY (Clean LifeSolveNow Marketplace Branding) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          zIndex: 10,
          background: '#FFFFFF',
          padding: '14px 36px',
          borderRadius: 999,
          boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
          border: '1.5px solid #E2E8F0',
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          }}
        >
          🛍️
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '-0.02em',
              color: '#0F172A',
              lineHeight: 1.1,
            }}
          >
            shop <span style={{ color: '#2563EB' }}>LifeSolveNow</span>
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#64748B',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Local Multi-Store Marketplace
          </span>
        </div>
      </div>

      {/* 📸 UPPER/CENTER STAGE: VIVID PHOTO SHOWCASE FRAME */}
      {/* Character points to and presents this real-life photo */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 960,
          height: 880,
          borderRadius: 36,
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(15, 23, 42, 0.16)',
          border: '6px solid #FFFFFF',
          background: '#F1F5F9',
          zIndex: 5,
          marginTop: 20,
        }}
      >
        {activeImageUri && (
          <img
            src={activeImageUri}
            alt="Showcase Visual"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${photoScale})`,
              transition: 'transform 0.1s ease-out',
            }}
          />
        )}
        {/* Soft daylight frame border glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 30,
            boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.08)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 🎭 LOWER STAGE: CHARACTER (Yash / Alex) PRESENTING */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 10,
          marginTop: -160,
        }}
      >
        <div
          style={{
            transform: `translateY(${pulse}px)`,
            filter: 'drop-shadow(0 20px 40px rgba(15, 23, 42, 0.18))',
          }}
        >
          <AlexCharacter
            mouthState={mouth}
            eyeState={eyes}
            eyebrowState={eyebrow}
            headY={headY}
            headRot={headRot}
            width={620}
            height={620}
          />
        </div>
      </div>

      {/* 🔗 BOTTOM: WEBSITE LINK ONLY (Clean & Prominent) */}
      <div
        style={{
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            color: '#FFFFFF',
            padding: '16px 48px',
            borderRadius: 999,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            boxShadow: '0 12px 36px rgba(15, 23, 42, 0.25)',
            border: '2px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <span style={{ fontSize: 24 }}>🌐</span>
          <span
            style={{
              fontSize: 32,
              fontWeight: 900,
              letterSpacing: '0.02em',
              color: '#38BDF8',
            }}
          >
            shop.lifesolvenow.com
          </span>
        </div>
      </div>
    </div>
  );
};
