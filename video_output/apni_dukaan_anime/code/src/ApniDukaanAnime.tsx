import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Audio } from 'remotion';
import { AlexCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/alex/AlexCharacter';
import visemesData from './visemes.json';
import assets from './assets_b64.json';

interface Scene {
  startFrame: number;
  endFrame: number;
  imageKey: string;
  badge: string;
  badgeColor: string;
  caption: string;
  eyebrow: EyebrowState;
}

const SCENES: Scene[] = [
  {
    startFrame: 0,
    endFrame: 405, // 0 - 13.5s
    imageKey: 'scene1_anime_struggle.jpg',
    badge: '📍 AAPKI MEHNAT • AAPKI DUKAAN',
    badgeColor: '#F59E0B',
    caption: 'आपकी मेहनत। आपकी दुकान।',
    eyebrow: 'neutral',
  },
  {
    startFrame: 405,
    endFrame: 545, // 13.5 - 18.2s
    imageKey: 'scene2_anime_digital_change.jpg',
    badge: '📱 CUSTOMERS ARE GOING DIGITAL',
    badgeColor: '#EF4444',
    caption: 'Customers are going digital.',
    eyebrow: 'curious',
  },
  {
    startFrame: 545,
    endFrame: 740, // 18.2 - 24.7s
    imageKey: 'scene3_anime_opportunity.jpg',
    badge: '⚡ MEET SHOP LIFESOLVENOW',
    badgeColor: '#10B981',
    caption: 'Meet LifeSolveNow ⚡ 0% Commission',
    eyebrow: 'raised',
  },
  {
    startFrame: 740,
    endFrame: 970, // 24.7 - 32.3s
    imageKey: 'scene4_anime_catalog.jpg',
    badge: '📸 YOUR DIGITAL CATALOG',
    badgeColor: '#38BDF8',
    caption: 'Your Shop. Your Digital Catalog.',
    eyebrow: 'neutral',
  },
  {
    startFrame: 970,
    endFrame: 1170, // 32.3 - 39.0s
    imageKey: 'scene5_anime_direct_order.jpg',
    badge: '💬 DIRECT WHATSAPP CONNECTION',
    badgeColor: '#22C55E',
    caption: 'Direct WhatsApp Connection 📲',
    eyebrow: 'raised',
  },
  {
    startFrame: 1170,
    endFrame: 1370, // 39.0 - 45.7s
    imageKey: 'scene6_anime_control.jpg',
    badge: '🛡️ YOUR CUSTOMERS • YOUR BUSINESS',
    badgeColor: '#818CF8',
    caption: 'Your Customers. Your Business.',
    eyebrow: 'neutral',
  },
  {
    startFrame: 1370,
    endFrame: 1500, // 45.7 - 50.0s
    imageKey: 'scene7_anime_confidence.jpg',
    badge: '🚀 TAKE YOUR SHOP DIGITAL',
    badgeColor: '#F59E0B',
    caption: 'Take Your Shop Digital 🚀',
    eyebrow: 'raised',
  },
  {
    startFrame: 1500,
    endFrame: 1794, // 50.0 - 59.8s
    imageKey: 'scene8_anime_hero_cta.jpg',
    badge: '🌟 APNI DUKAAN. APNI PEHCHAAN.',
    badgeColor: '#10B981',
    caption: 'START YOUR DIGITAL SHOP 🛍️ shop.lifesolvenow.com',
    eyebrow: 'raised',
  },
];

export const ApniDukaanAnime: React.FC = () => {
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

  // Active scene
  const activeSceneIndex = SCENES.findIndex(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );
  const currentScene = SCENES[activeSceneIndex !== -1 ? activeSceneIndex : SCENES.length - 1];

  // Ken-Burns motion
  const sceneLen = currentScene.endFrame - currentScene.startFrame;
  const sceneProgress = Math.min(1, Math.max(0, (frame - currentScene.startFrame) / Math.max(1, sceneLen)));
  const bgScale = interpolate(sceneProgress, [0, 1], [1.02, 1.09]);
  const bgPanY = interpolate(sceneProgress, [0, 1], [0, -22]);

  // Subtitle pop-in
  const localFrame = frame - currentScene.startFrame;
  const textPopSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const textScale = interpolate(textPopSpring, [0, 1], [0.92, 1.0]);
  const textOpacity = interpolate(localFrame, [0, 4], [0, 1]);

  // Card pop-in spring
  const cardSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const cardScale = interpolate(cardSpring, [0, 1], [0.85, 1.0]);
  const cardOpacity = interpolate(localFrame, [0, 5], [0, 1]);

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#07090E',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans Devanagari', Roboto, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 1. Synchronized Voiceover Audio */}
      {assets['voiceover.mp3'] && <Audio src={assets['voiceover.mp3']} />}

      {/* 2. BACKGROUND ANIME SCENE IMAGES (Behind Avatar) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <img
          src={assets[currentScene.imageKey as keyof typeof assets]}
          alt="Scene Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${bgScale}) translateY(${bgPanY}px)`,
            filter: 'brightness(0.62) contrast(1.1) blur(4px)',
          }}
        />

        {/* Cinematic Vignettes */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: 480,
            background: 'linear-gradient(180deg, rgba(7,9,14,0.92) 0%, rgba(7,9,14,0.4) 60%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 700,
            background: 'linear-gradient(0deg, rgba(7,9,14,0.95) 0%, rgba(7,9,14,0.7) 50%, transparent 100%)',
          }}
        />
      </div>

      {/* 3. TOP CONTEXT BADGE */}
      <div
        style={{
          position: 'absolute',
          top: 70,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 45,
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            border: `2px solid ${currentScene.badgeColor}`,
            padding: '12px 28px',
            borderRadius: 30,
            fontSize: 22,
            fontWeight: 900,
            color: currentScene.badgeColor,
            letterSpacing: '0.04em',
            boxShadow: `0 8px 30px ${currentScene.badgeColor}44`,
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>{currentScene.badge}</span>
        </div>
      </div>

      {/* 4. DYNAMIC FLOATING UI CARDS (Behind or Beside Avatar, zIndex: 25) */}

      {/* Scene 3: Meet LifeSolveNow Card */}
      {frame >= 545 && frame < 740 && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: '50%',
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: cardOpacity,
            zIndex: 25,
            width: 780,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.94)',
              border: '2.5px solid #10B981',
              borderRadius: 24,
              padding: '18px 24px',
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.4)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 26 }}>⚡</span>
              <div>
                <div style={{ color: '#34D399', fontWeight: 900, fontSize: 22 }}>shop.lifesolvenow.com</div>
                <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 26, marginTop: 2 }}>0% SALES COMMISSION</div>
              </div>
            </div>
            <div style={{ background: '#10B981', color: '#FFF', padding: '6px 14px', borderRadius: 999, fontWeight: 900, fontSize: 16 }}>
              100% PROFIT
            </div>
          </div>
        </div>
      )}

      {/* Scene 4: Digital Catalog Showcase */}
      {frame >= 740 && frame < 970 && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: '50%',
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: cardOpacity,
            zIndex: 25,
            width: 780,
            display: 'flex',
            gap: 14,
          }}
        >
          <div
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.94)',
              border: '2px solid #38BDF8',
              borderRadius: 20,
              padding: '14px 18px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ fontSize: 20 }}>🌾 Basmati Rice (5kg)</div>
            <div style={{ color: '#34D399', fontSize: 24, fontWeight: 900, marginTop: 4 }}>₹450</div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.94)',
              border: '2px solid #38BDF8',
              borderRadius: 20,
              padding: '14px 18px',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ fontSize: 20 }}>🫘 Toor Dal (1kg)</div>
            <div style={{ color: '#34D399', fontSize: 24, fontWeight: 900, marginTop: 4 }}>₹160</div>
          </div>
        </div>
      )}

      {/* Scene 5: WhatsApp Direct Connection Pill */}
      {frame >= 970 && frame < 1170 && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: '50%',
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: cardOpacity,
            zIndex: 25,
            width: 800,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 45, 30, 0.94)',
              border: '2px solid #22C55E',
              borderRadius: 22,
              padding: '16px 22px',
              boxShadow: '0 16px 40px rgba(34, 197, 94, 0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ color: '#86EFAC', fontWeight: 900, fontSize: 18, marginBottom: 4 }}>💬 DIRECT WHATSAPP INQUIRY</div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 21 }}>
              &ldquo;Namaste Ramesh Bhaiya, 2 packet Dal aur 5kg Rice bhej dijiye.&rdquo;
            </div>
            <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 18, marginTop: 6 }}>
              ✓ Direct Customer Connection • Rishta Bhi Aapka, Grahak Bhi Aapka!
            </div>
          </div>
        </div>
      )}

      {/* 5. LIVE CODE-DRIVEN TALKING CHARACTER PUPPET (Foreground Avatar, zIndex: 35) */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%) scale(1.22)',
          zIndex: 35,
          pointerEvents: 'none',
        }}
      >
        <AlexCharacter
          mouthState={mouth}
          eyeState={eyes}
          eyebrowState={currentScene.eyebrow}
          headY={headY}
          headRot={headRot}
          width={600}
          height={800}
        />
      </div>

      {/* 6. EXACT ON-SCREEN CAPTION PILL (Center-Lower Reels Safe Zone, zIndex: 50) */}
      <div
        style={{
          position: 'absolute',
          bottom: 340,
          left: 50,
          right: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 50,
          pointerEvents: 'none',
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.85), 0 0 24px rgba(0, 0, 0, 0.5)',
            borderRadius: 30,
            padding: '18px 38px',
            maxWidth: 960,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans Devanagari', Roboto, sans-serif",
              fontSize: currentScene.caption.length > 35 ? 30 : 38,
              fontWeight: 900,
              lineHeight: 1.35,
              letterSpacing: '0.02em',
              textShadow:
                '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 16px rgba(0,0,0,0.95)',
              display: 'inline-block',
            }}
          >
            {currentScene.caption}
          </span>
        </div>
      </div>

      {/* 7. BOTTOM ACTION BANNER (zIndex: 45) */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 50,
          right: 50,
          zIndex: 45,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(20px)',
          padding: '16px 32px',
          borderRadius: 28,
          border: '2px solid rgba(16, 185, 129, 0.6)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.25)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 22,
            }}
          >
            🛍️
          </div>
          <div>
            <div style={{ color: '#A7F3D0', fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>DIGITAL DUKAAN PLATFORM:</div>
            <div style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 900, letterSpacing: 0.5 }}>shop.lifesolvenow.com</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '10px 24px',
            borderRadius: 22,
            fontWeight: 900,
            fontSize: 20,
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.45)',
          }}
        >
          Shuru Karein 🚀
        </div>
      </div>
    </div>
  );
};
