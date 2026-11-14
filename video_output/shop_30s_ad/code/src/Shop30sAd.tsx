import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Audio } from 'remotion';
import { AlexCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/alex/AlexCharacter';
import visemesData from './visemes.json';
import assets from './assets_b64.json';

export const Shop30sAd: React.FC = () => {
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

  // ==========================================
  // 8 SCENE PROGRESSION (Exact Audio Timing)
  // Scene 1: 0 - 120   (0.0s - 4.0s)  -> Dukaan aapki, mehnat aapki... to kamai kiski?
  // Scene 2: 120 - 298 (4.0s - 9.9s)  -> 20-30% Commission trap
  // Scene 3: 298 - 428 (9.9s - 14.3s) -> shop.lifesolvenow.com 0% Commission
  // Scene 4: 428 - 555 (14.3s - 18.5s)-> Photo kheencho, online store ready
  // Scene 5: 555 - 689 (18.5s - 23.0s)-> WhatsApp order & direct UPI payment
  // Scene 6: 689 - 824 (23.0s - 27.5s)-> Google sync & live repair tracking
  // Scene 7: 824 - 935 (27.5s - 31.2s)-> Free starter vs Pro ₹99/month
  // Scene 8: 935 - 1093(31.2s - 36.4s)-> Yash CTA & visit shop.lifesolvenow.com
  // ==========================================

  let topBadgeText = '🏪 APNI DUKAN, APNI MEHNAT';
  let topBadgeColor = '#F59E0B';
  let activeImageKey = 'ramesh_bhaiya_counter.jpg';
  let sceneProgress = 0;
  let captionText = 'DUKAAN AAPKI. KAMAI BHI AAPKI.';
  let captionColor = '#FDE047';
  let eyebrow: EyebrowState = 'neutral';
  let showCommissionCard = false;
  let showZeroCommCard = false;
  let showWhatsAppCard = false;
  let showGoogleCard = false;
  let showPlansCard = false;
  let showCtaButton = false;
  let isCenterPresenter = false;
  let avatarScale = 1.12;
  let avatarBottom = 130;
  let avatarRight = 35;

  if (frame < 120) {
    // Scene 1: 0 - 4.0s
    topBadgeText = '🏪 APNI DUKAN, APNI MEHNAT';
    topBadgeColor = '#F59E0B';
    activeImageKey = 'ramesh_bhaiya_counter.jpg';
    sceneProgress = frame / 120;
    captionText = 'DUKAAN AAPKI. KAMAI BHI AAPKI.';
    captionColor = '#FDE047';
    eyebrow = 'curious';
  } else if (frame < 298) {
    // Scene 2: 4.0s - 9.9s
    topBadgeText = '❌ 20% - 30% COMMISSION CUT';
    topBadgeColor = '#EF4444';
    activeImageKey = 'commission_trap.jpg';
    sceneProgress = (frame - 120) / 178;
    captionText = '20% SE 30% COMMISSION KAAT LIYA?';
    captionColor = '#EF4444';
    eyebrow = 'raised';
    showCommissionCard = true;
  } else if (frame < 428) {
    // Scene 3: 9.9s - 14.3s
    topBadgeText = '⚡ 0% SALES COMMISSION';
    topBadgeColor = '#10B981';
    activeImageKey = 'digital_growth.jpg';
    sceneProgress = (frame - 298) / 130;
    captionText = 'ZERO PERCENT COMMISSION REVOLUTION!';
    captionColor = '#34D399';
    eyebrow = 'neutral';
    showZeroCommCard = true;
  } else if (frame < 555) {
    // Scene 4: 14.3s - 18.5s
    topBadgeText = '📸 INSTANT DIGITAL STORE';
    topBadgeColor = '#38BDF8';
    activeImageKey = 'spice_store.jpg';
    sceneProgress = (frame - 428) / 127;
    captionText = 'PHOTO KHEENCHO • STORE READY';
    captionColor = '#38BDF8';
    eyebrow = 'raised';
  } else if (frame < 689) {
    // Scene 5: 18.5s - 23.0s
    topBadgeText = '📲 SEEDHA WHATSAPP ORDER';
    topBadgeColor = '#22C55E';
    activeImageKey = 'shop_customer_interaction.jpg';
    sceneProgress = (frame - 555) / 134;
    captionText = 'ORDER WHATSAPP PAR • PAISA UPI MEIN';
    captionColor = '#4ADE80';
    eyebrow = 'neutral';
    showWhatsAppCard = true;
  } else if (frame < 824) {
    // Scene 6: 23.0s - 27.5s
    topBadgeText = '🔍 GOOGLE SYNC • 🔧 LIVE REPAIR';
    topBadgeColor = '#818CF8';
    activeImageKey = 'repair_technician.jpg';
    sceneProgress = (frame - 689) / 135;
    captionText = 'GOOGLE SHOPPING & LIVE REPAIR TRACKING';
    captionColor = '#A5B4FC';
    eyebrow = 'curious';
    showGoogleCard = true;
  } else if (frame < 935) {
    // Scene 7: 27.5s - 31.2s
    topBadgeText = '💎 TRANSPARENT PRICING';
    topBadgeColor = '#FBBF24';
    activeImageKey = 'digital_store.jpg';
    sceneProgress = (frame - 824) / 111;
    captionText = 'FREE TRIAL • PRO SIRF ₹99/MAHINA';
    captionColor = '#FDE047';
    eyebrow = 'neutral';
    showPlansCard = true;
  } else {
    // Scene 8: 31.2s - 36.4s (Outro / CTA)
    topBadgeText = '🚀 APNI DUKAN KO DIGITAL BANAO';
    topBadgeColor = '#10B981';
    activeImageKey = 'market_crowd.jpg';
    sceneProgress = (frame - 935) / 158;
    captionText = 'AAJ HI VISIT KAREIN: shop.lifesolvenow.com';
    captionColor = '#34D399';
    eyebrow = 'neutral';
    showCtaButton = true;
    isCenterPresenter = true;
    avatarScale = 1.45;
    avatarBottom = 220;
  }

  // Smooth Ken-Burns scale and pan
  const bgScale = interpolate(sceneProgress, [0, 1], [1.0, 1.08], { extrapolateRight: 'clamp' });
  const bgPanY = interpolate(sceneProgress, [0, 1], [0, -25], { extrapolateRight: 'clamp' });

  // Floating card pop-in animation
  const cardSpring = spring({
    frame: frame % 150,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* 1. Synchronized Voiceover Audio */}
      {assets['voiceover.mp3'] && <Audio src={assets['voiceover.mp3']} />}

      {/* 2. Dynamic Realistic Background Image with Ken-Burns */}
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
          src={assets[activeImageKey as keyof typeof assets]}
          alt="Scene Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${bgScale}) translateY(${bgPanY}px)`,
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        />

        {/* Cinematic Vignette Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15,23,42,0.65) 0%, rgba(15,23,42,0.15) 35%, rgba(15,23,42,0.3) 65%, rgba(15,23,42,0.92) 100%)',
          }}
        />
      </div>

      {/* 3. Top Header Bar: Logo (Left) + Website Link (Right) */}
      <div
        style={{
          position: 'absolute',
          top: 54,
          left: 44,
          right: 44,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 40,
        }}
      >
        {/* Brand Logo Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1.5px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(16px)',
            padding: '10px 22px',
            borderRadius: 999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: 22 }}>🛍️</span>
          <span style={{ fontSize: 20, fontWeight: 800, color: '#F8FAFC', letterSpacing: '0.02em' }}>
            shop <span style={{ color: '#FBBF24' }}>LifeSolveNow</span>
          </span>
        </div>

        {/* Website Link Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1.5px solid #10B981',
            backdropFilter: 'blur(16px)',
            padding: '10px 22px',
            borderRadius: 999,
            boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
          }}
        >
          <span style={{ fontSize: 18 }}>🌐</span>
          <span style={{ fontSize: 19, fontWeight: 800, color: '#34D399', letterSpacing: '0.03em' }}>
            shop.lifesolvenow.com
          </span>
        </div>
      </div>

      {/* Top Scene Context Pill (Centered below Top Bar) */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 40,
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.88)',
            border: `1.5px solid ${topBadgeColor}`,
            padding: '8px 28px',
            borderRadius: 999,
            color: topBadgeColor,
            fontWeight: 800,
            fontSize: 20,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            boxShadow: `0 6px 20px rgba(0,0,0,0.5)`,
          }}
        >
          {topBadgeText}
        </div>
      </div>

      {/* 4. Middle Floating Highlight Cards (Feature Highlights) */}
      {/* Commission Warning Card (Scene 2) */}
      {showCommissionCard && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: 60,
            right: 60,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #EF4444',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 16px 40px rgba(239, 68, 68, 0.25)',
            backdropFilter: 'blur(20px)',
            zIndex: 35,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#F87171' }}>❌ BADI DELIVERY APPS</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                background: '#EF4444',
                color: '#FFFFFF',
                padding: '4px 14px',
                borderRadius: 8,
              }}
            >
              -25% CUT
            </span>
          </div>
          <div style={{ fontSize: 20, color: '#E2E8F0', lineHeight: 1.5, fontWeight: 600 }}>
            • 20% se 30% Har Order Par Commission
            <br />
            • Mahine Ki Kamai Mein Se <strong style={{ color: '#FDE047' }}>₹15,000 Kat Gaya</strong>
            <br />• Customer Data Unka, Dukandar Khali Haath!
          </div>
        </div>
      )}

      {/* 0% Commission Revolution Card (Scene 3) */}
      {showZeroCommCard && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: 60,
            right: 60,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #10B981',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 16px 40px rgba(16, 185, 129, 0.25)',
            backdropFilter: 'blur(20px)',
            zIndex: 35,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#34D399' }}>⚡ shop LifeSolveNow</span>
            <span
              style={{
                fontSize: 18,
                fontWeight: 800,
                background: '#10B981',
                color: '#FFFFFF',
                padding: '4px 14px',
                borderRadius: 8,
              }}
            >
              0% COMMISSION
            </span>
          </div>
          <div style={{ fontSize: 20, color: '#E2E8F0', lineHeight: 1.5, fontWeight: 600 }}>
            • Har Order Par Zero Sales Commission
            <br />
            • Shopkeeper Rakhein <strong style={{ color: '#34D399' }}>100% Munafa</strong>
            <br />• Direct Buyer-Seller Settlement via UPI & Cash!
          </div>
        </div>
      )}

      {/* WhatsApp Direct Order Card (Scene 5) */}
      {showWhatsAppCard && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: 60,
            right: 60,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #22C55E',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 16px 40px rgba(34, 197, 94, 0.25)',
            backdropFilter: 'blur(20px)',
            zIndex: 35,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <span style={{ fontSize: 28 }}>💬</span>
            <span style={{ fontSize: 24, fontWeight: 900, color: '#4ADE80' }}>1-Click WhatsApp Ordering</span>
          </div>
          <div style={{ fontSize: 20, color: '#E2E8F0', lineHeight: 1.5, fontWeight: 600 }}>
            • Customer Cart Seedha WhatsApp Chat Me Aata Hai
            <br />
            • Paisa Seedha Dukan Ke <strong style={{ color: '#FDE047' }}>UPI Soundbox / QR / Cash</strong> Me
            <br />• Grahak Hamesha Ke Liye Aapka!
          </div>
        </div>
      )}

      {/* Google Sync & Live Repair Card (Scene 6) */}
      {showGoogleCard && (
        <div
          style={{
            position: 'absolute',
            top: 230,
            left: 60,
            right: 60,
            background: 'rgba(15, 23, 42, 0.88)',
            border: '2px solid #818CF8',
            borderRadius: 24,
            padding: '24px 28px',
            boxShadow: '0 16px 40px rgba(129, 140, 248, 0.25)',
            backdropFilter: 'blur(20px)',
            zIndex: 35,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 23, fontWeight: 900, color: '#A5B4FC' }}>🔍 GOOGLE LOCAL BOOST</span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 800,
                background: '#6366F1',
                color: '#FFFFFF',
                padding: '4px 12px',
                borderRadius: 8,
              }}
            >
              SEO READY
            </span>
          </div>
          <div style={{ fontSize: 19, color: '#E2E8F0', lineHeight: 1.5, fontWeight: 600 }}>
            • "Kirana Near Me" Par Dukan Google Top Par!
            <br />• <strong style={{ color: '#38BDF8' }}>Repair Shop Tokens:</strong> Received ➔ Diagnosing ➔ Ready
          </div>
        </div>
      )}

      {/* Plans Comparison Card (Scene 7) */}
      {showPlansCard && (
        <div
          style={{
            position: 'absolute',
            top: 220,
            left: 50,
            right: 50,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 20,
            zIndex: 35,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid #94A3B8',
              borderRadius: 20,
              padding: 22,
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#CBD5E1' }}>STARTER PLAN</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#FFFFFF', margin: '8px 0' }}>₹0</div>
            <div style={{ fontSize: 16, color: '#94A3B8' }}>40 Products Free · Weekly Google Sync</div>
          </div>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.9)',
              border: '2px solid #F59E0B',
              borderRadius: 20,
              padding: 22,
              textAlign: 'center',
              boxShadow: '0 8px 30px rgba(245, 158, 11, 0.25)',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, color: '#FBBF24' }}>PRO PLAN ⚡</div>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#FBBF24', margin: '8px 0' }}>₹99<span style={{ fontSize: 18 }}>/mo</span></div>
            <div style={{ fontSize: 16, color: '#E2E8F0' }}>Unlimited Products · Daily Google Boost</div>
          </div>
        </div>
      )}

      {/* Big CTA Button (Scene 8) */}
      {showCtaButton && (
        <div
          style={{
            position: 'absolute',
            top: 240,
            left: 60,
            right: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            zIndex: 45,
            transform: `scale(${cardSpring})`,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              padding: '20px 48px',
              borderRadius: 999,
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 28,
              boxShadow: '0 16px 40px rgba(16, 185, 129, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              border: '2px solid rgba(255,255,255,0.4)',
            }}
          >
            <span>🚀</span>
            <span>CLAIM FREE TRIAL NOW</span>
          </div>
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              padding: '8px 24px',
              borderRadius: 999,
              color: '#FDE047',
              fontWeight: 800,
              fontSize: 22,
              border: '1.5px solid #FDE047',
            }}
          >
            visit: shop.lifesolvenow.com
          </div>
        </div>
      )}

      {/* 5. Alex Character (Yash) Presenter with Frame-Accurate Lip-Sync */}
      <div
        style={{
          position: 'absolute',
          bottom: avatarBottom,
          left: isCenterPresenter ? '50%' : undefined,
          right: isCenterPresenter ? undefined : avatarRight,
          transform: isCenterPresenter ? `translateX(-50%) scale(${avatarScale})` : `scale(${avatarScale})`,
          transformOrigin: isCenterPresenter ? 'bottom center' : 'bottom right',
          zIndex: 38,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 16px 28px rgba(0,0,0,0.75))',
        }}
      >
        <AlexCharacter
          mouthState={mouth}
          eyeState={eyes}
          eyebrowState={eyebrow}
          headY={headY}
          headRot={headRot}
          width={600}
          height={800}
        />
      </div>

      {/* 6. Clean Glowing Lower-Third Caption Pill (Zero Clutter, 100% Punchy) */}
      <div
        style={{
          position: 'absolute',
          bottom: 125,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 40px',
          zIndex: 50,
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.92)',
            border: `2px solid ${captionColor}`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 20px ${captionColor}33`,
            backdropFilter: 'blur(20px)',
            borderRadius: 999,
            padding: '14px 34px',
            textAlign: 'center',
            maxWidth: 960,
          }}
        >
          <span
            style={{
              fontSize: 25,
              fontWeight: 900,
              color: captionColor,
              letterSpacing: '0.03em',
              textTransform: 'uppercase',
            }}
          >
            {captionText}
          </span>
        </div>
      </div>

      {/* 7. Bottom Action Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: 44,
          right: 44,
          height: 72,
          background: 'rgba(15, 23, 42, 0.95)',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          zIndex: 50,
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
            }}
          >
            🏪
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 11,
                color: '#94A3B8',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              FREE MARKETPLACE:
            </span>
            <span style={{ fontSize: 19, color: '#FFFFFF', fontWeight: 800, letterSpacing: '0.01em' }}>
              shop.lifesolvenow.com
            </span>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: '#FFFFFF',
            padding: '10px 24px',
            borderRadius: 999,
            fontWeight: 800,
            fontSize: 17,
            letterSpacing: '0.02em',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
          }}
        >
          Claim Free Trial 🚀
        </div>
      </div>
    </div>
  );
};
