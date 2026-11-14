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
  captionHighlight?: string;
  highlightColor?: string;
  eyebrow: EyebrowState;
}

const SCENES: Scene[] = [
  {
    startFrame: 0,
    endFrame: 180, // 0 - 6.0s
    imageKey: 'kirana_authentic.jpg',
    badge: '📍 DUKAAN AAPKI • MEHNAT AAPKI',
    badgeColor: '#F59E0B',
    caption: 'DUKAAN AAPKI. KAMAI BHI AAPKI.',
    captionHighlight: 'KAMAI BHI AAPKI',
    highlightColor: '#FDE047',
    eyebrow: 'neutral',
  },
  {
    startFrame: 180,
    endFrame: 410, // 6.0 - 13.6s
    imageKey: 'commission_trap.jpg',
    badge: '❌ 20% - 30% COMMISSION CUT',
    badgeColor: '#EF4444',
    caption: '20-30% COMMISSION TRAP ❌',
    captionHighlight: 'COMMISSION TRAP ❌',
    highlightColor: '#EF4444',
    eyebrow: 'curious',
  },
  {
    startFrame: 410,
    endFrame: 705, // 13.6 - 23.5s
    imageKey: 'digital_growth.jpg',
    badge: '⚡ 0% SALES COMMISSION REVOLUTION',
    badgeColor: '#10B981',
    caption: '0% SALES COMMISSION ⚡',
    captionHighlight: '0% SALES COMMISSION',
    highlightColor: '#34D399',
    eyebrow: 'raised',
  },
  {
    startFrame: 705,
    endFrame: 900, // 23.5 - 30.0s
    imageKey: 'spice_store.jpg',
    badge: '📸 2 MINUTE MEIN ONLINE STORE',
    badgeColor: '#38BDF8',
    caption: 'ONLINE STORE KUCH MINUTE MEIN',
    captionHighlight: 'ONLINE STORE',
    highlightColor: '#38BDF8',
    eyebrow: 'neutral',
  },
  {
    startFrame: 900,
    endFrame: 1105, // 30.0 - 36.8s
    imageKey: 'shop_customer_interaction.jpg',
    badge: '📲 DIRECT WHATSAPP ORDER & UPI',
    badgeColor: '#22C55E',
    caption: '📲 DIRECT WHATSAPP ORDER',
    captionHighlight: 'WHATSAPP ORDER',
    highlightColor: '#86EFAC',
    eyebrow: 'raised',
  },
  {
    startFrame: 1105,
    endFrame: 1290, // 36.8 - 43.0s
    imageKey: 'repair_shop.jpg',
    badge: '🔍 GOOGLE BOOST & REPAIR TRACKING',
    badgeColor: '#818CF8',
    caption: '🔍 GOOGLE SYNC • 🔧 LIVE REPAIR TRACKING',
    captionHighlight: 'LIVE REPAIR TRACKING',
    highlightColor: '#FDE047',
    eyebrow: 'curious',
  },
  {
    startFrame: 1290,
    endFrame: 1410, // 43.0 - 47.0s
    imageKey: 'digital_store.jpg',
    badge: '💰 FREE TRIAL • PRO ₹99/MONTH',
    badgeColor: '#F59E0B',
    caption: 'FREE TRIAL • PRO ₹99/MONTH',
    captionHighlight: 'PRO ₹99/MONTH',
    highlightColor: '#FDE047',
    eyebrow: 'neutral',
  },
  {
    startFrame: 1410,
    endFrame: 1658, // 47.0 - 55.3s
    imageKey: 'night_bazaar.jpg',
    badge: '🚀 shop.lifesolvenow.com',
    badgeColor: '#10B981',
    caption: 'shop.lifesolvenow.com 🚀 Claim Free Trial',
    captionHighlight: 'Claim Free Trial',
    highlightColor: '#34D399',
    eyebrow: 'raised',
  },
];

export const ShopAvatarAd: React.FC = () => {
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

  // Active scene resolution
  const activeSceneIndex = SCENES.findIndex(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );
  const currentScene = SCENES[activeSceneIndex !== -1 ? activeSceneIndex : SCENES.length - 1];

  // Ken-Burns motion for background
  const sceneLen = currentScene.endFrame - currentScene.startFrame;
  const sceneProgress = Math.min(1, Math.max(0, (frame - currentScene.startFrame) / Math.max(1, sceneLen)));
  const bgScale = interpolate(sceneProgress, [0, 1], [1.02, 1.08]);
  const bgPanY = interpolate(sceneProgress, [0, 1], [0, -18]);

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
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 1. Synchronized Voiceover Audio */}
      {assets['voiceover.mp3'] && <Audio src={assets['voiceover.mp3']} />}

      {/* 2. BACKGROUND SCENE IMAGES (Ken-Burns Animated Behind Avatar) */}
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
            filter: 'brightness(0.55) blur(5px) contrast(1.08)',
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

      {/* Scene 2 Commission Cut Warning Card */}
      {frame >= 180 && frame < 410 && (
        <div
          style={{
            position: 'absolute',
            top: 240,
            left: '50%',
            transform: `translateX(-50%) scale(${cardScale})`,
            opacity: cardOpacity,
            zIndex: 25,
            width: 760,
          }}
        >
          <div
            style={{
              background: 'rgba(20, 10, 15, 0.94)',
              border: '2.5px solid #EF4444',
              borderRadius: 24,
              padding: '20px 24px',
              boxShadow: '0 20px 50px rgba(239, 68, 68, 0.45)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{ color: '#F87171', fontWeight: 900, fontSize: 20 }}>📦 DELIVERY APPS CUT</span>
              <span style={{ background: '#EF4444', color: '#FFF', padding: '3px 10px', borderRadius: 999, fontWeight: 900, fontSize: 16 }}>-25% LOSS</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, color: '#E2E8F0', fontWeight: 700 }}>
              <span>Customer Order: ₹1,000</span>
              <span style={{ color: '#EF4444', fontWeight: 900 }}>You Get: ₹750</span>
            </div>
          </div>
        </div>
      )}

      {/* Scene 3: 0% Sales Commission Highlight */}
      {frame >= 410 && frame < 705 && (
        <div
          style={{
            position: 'absolute',
            top: 240,
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

      {/* Scene 5: WhatsApp Direct Order Pill */}
      {frame >= 900 && frame < 1105 && (
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
            <div style={{ color: '#86EFAC', fontWeight: 900, fontSize: 18, marginBottom: 4 }}>💬 DIRECT WHATSAPP ORDER</div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 21 }}>
              &ldquo;Namaste Bhaiya, 2 packet Dal aur 5kg Rice bhej dijiye.&rdquo;
            </div>
            <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 19, marginTop: 8 }}>
              ✓ UPI Direct Settlement: ₹770 Received
            </div>
          </div>
        </div>
      )}

      {/* Scene 6: Repair Tracker Pill */}
      {frame >= 1105 && frame < 1290 && (
        <div
          style={{
            position: 'absolute',
            top: 240,
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
              border: '2px solid #818CF8',
              borderRadius: 22,
              padding: '16px 22px',
              boxShadow: '0 16px 40px rgba(129, 140, 248, 0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ color: '#A5B4FC', fontWeight: 900, fontSize: 18, marginBottom: 6 }}>
              🔍 GOOGLE #1 STORE • 🔧 LIVE REPAIR TRACKER
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFFFFF', fontWeight: 800, fontSize: 18 }}>
              <span style={{ color: '#10B981' }}>✓ Received</span>
              <span>&gt;</span>
              <span style={{ color: '#FDE047' }}>⚡ Diagnosing</span>
              <span>&gt;</span>
              <span style={{ color: '#94A3B8' }}>○ Ready</span>
            </div>
          </div>
        </div>
      )}

      {/* Scene 7: Free Trial & ₹99 Pro Badges */}
      {frame >= 1290 && frame < 1410 && (
        <div
          style={{
            position: 'absolute',
            top: 240,
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
              border: '2px solid rgba(255,255,255,0.25)',
              borderRadius: 20,
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#94A3B8', fontWeight: 900, fontSize: 18 }}>STARTER</div>
            <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 30, marginTop: 2 }}>₹0 Free</div>
          </div>
          <div
            style={{
              flex: 1,
              background: 'rgba(15, 23, 42, 0.94)',
              border: '2.5px solid #F59E0B',
              borderRadius: 20,
              padding: '16px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#FBBF24', fontWeight: 900, fontSize: 18 }}>PRO GOOGLE BOOST</div>
            <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 30, marginTop: 2 }}>₹99/mo</div>
          </div>
        </div>
      )}

      {/* 5. LIVE CODE-DRIVEN TALKING CHARACTER PUPPET (In Foreground, zIndex: 35) */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%) scale(1.25)',
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
                "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Noto Color Emoji', Roboto, sans-serif",
              fontSize: currentScene.caption.length > 35 ? 32 : 38,
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
            <div style={{ color: '#A7F3D0', fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>VISIT ONLINE STORE:</div>
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
          Claim Free Trial 🚀
        </div>
      </div>
    </div>
  );
};
