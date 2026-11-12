import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { KabirCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/kabir/KabirCharacter';
import visemesData from './visemes.json';

export const ShopIntroVideo: React.FC = () => {
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

  // Scene timing configuration across 1708 frames (~56.9 seconds)
  let sceneIndex = 1;
  let sceneBadge = '🇮🇳 LOCAL SHOPS • DIGITAL POWER';
  let eyebrow: EyebrowState = 'neutral';
  let subtitleText = '';
  let highlightWord = '';
  let bgGradient = 'radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 80%)';
  let accentColor = '#FBBF24';

  if (frame < 320) {
    // Scene 1: The Core Mission & Local Trust (0 - 10.6s)
    sceneIndex = 1;
    sceneBadge = '🇮🇳 LOCAL BHAROSA • DIGITAL POWER';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 80%)';
    subtitleText = 'Hamare mohalle ki dukan sirf dukan nahi... hum sab ka bharosa hoti hai! shop.lifesolvenow.com';
    highlightWord = 'shop.lifesolvenow.com';
  } else if (frame < 640) {
    // Scene 2: Kirana & Retail WhatsApp Storefront (10.6 - 21.3s)
    sceneIndex = 2;
    sceneBadge = '🛒 KIRANA & RETAIL STOREFRONT';
    eyebrow = 'curious';
    accentColor = '#10B981';
    bgGradient = 'radial-gradient(circle at 50% 30%, #064E3B 0%, #030712 75%)';
    subtitleText = 'Kirana & Retail: Counter QR scan karo aur direct WhatsApp par ready cart order pao!';
    highlightWord = '1-Click WhatsApp Order & QR';
  } else if (frame < 980) {
    // Scene 3: Repair & Electronics Digital Job Sheet (21.3 - 32.6s)
    sceneIndex = 3;
    sceneBadge = '📱 REPAIR & SERVICE JOB CARDS';
    eyebrow = 'neutral';
    accentColor = '#38BDF8';
    bgGradient = 'radial-gradient(circle at 50% 30%, #0f172a 0%, #030712 80%)';
    subtitleText = 'Repair Shops: Purana register band! Digital job sheets aur WhatsApp warranty shuru!';
    highlightWord = 'Digital Job Sheet & Warranty';
  } else if (frame < 1320) {
    // Scene 4: Restaurant & Cafe Table QR & Kitchen (32.6 - 44s)
    sceneIndex = 4;
    sceneBadge = '🍽️ TABLE QR & KITCHEN ORDERS';
    eyebrow = 'raised';
    accentColor = '#F97316';
    bgGradient = 'radial-gradient(circle at 50% 30%, #431407 0%, #030712 80%)';
    subtitleText = 'Restaurants & Cafes: Har table par Smart QR se live kitchen orders, no costly POS!';
    highlightWord = 'Smart Table QR & Kitchen Screen';
  } else {
    // Scene 5: 0% Commission & Free Trial CTA (44 - 56.9s)
    sceneIndex = 5;
    sceneBadge = '🚀 0% COMMISSION • CLAIM FREE TRIAL';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #312E81 0%, #030712 80%)';
    subtitleText = 'Zero Percent Sales Commission! Aapki kamai poori aapki. Claim karein Free Trial!';
    highlightWord = 'shop.lifesolvenow.com';
  }

  // Floating Pulse Animation
  const pulse = Math.sin(frame * 0.1) * 5;

  return (
    <div
      style={{
        flex: 1,
        width: 1080,
        height: 1920,
        background: bgGradient,
        color: '#FFFFFF',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '70px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Animated Subtle Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          backgroundPosition: '0 0, 24px 24px',
          opacity: 0.35,
          pointerEvents: 'none',
        }}
      />

      {/* TOP HEADER: Mission & Feature Pill */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          zIndex: 10,
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            padding: '10px 28px',
            borderRadius: 999,
            border: `1px solid ${accentColor}55`,
            boxShadow: `0 4px 20px ${accentColor}33`,
          }}
        >
          <span style={{ fontSize: 24 }}>✨</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: accentColor,
            }}
          >
            {sceneBadge}
          </span>
        </div>

        <div style={{ fontSize: 16, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.05em' }}>
          SHOP.LIFESOLVENOW.COM • INDIA'S LOCAL MULTI-STORE PLATFORM
        </div>
      </div>

      {/* CENTER STAGE: CHARACTER & DYNAMIC FEATURE MOCKUPS */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5,
        }}
      >
        {/* CHARACTER PUPPET: Kabir */}
        <div
          style={{
            position: 'relative',
            transform: `translateY(${pulse}px)`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
          }}
        >
          <KabirCharacter
            mouth={mouth}
            eyes={eyes}
            eyebrows={eyebrow}
            headY={headY}
            headRot={headRot}
            width={480}
            height={480}
          />
        </div>

        {/* SCENE 1: Master Introduction Card */}
        {sceneIndex === 1 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              width: 620,
              background: 'rgba(15, 23, 42, 0.94)',
              border: '2px solid #FBBF24',
              borderRadius: 26,
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 20px 50px rgba(251, 191, 36, 0.25)',
            }}
          >
            <div style={{ fontSize: 36, textAlign: 'center' }}>🇮🇳 🛍️ ✨</div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#FCD34D', textAlign: 'center' }}>
              shop LifeSolveNow
            </div>
            <div style={{ fontSize: 18, color: '#E2E8F0', textAlign: 'center', fontWeight: 600 }}>
              Connecting Local Verified Sellers with Nearby Customers Across India
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <span style={{ background: '#1E293B', color: '#94A3B8', padding: '4px 12px', borderRadius: 99, fontSize: 14, fontWeight: 700 }}>
                🏬 Kirana
              </span>
              <span style={{ background: '#1E293B', color: '#94A3B8', padding: '4px 12px', borderRadius: 99, fontSize: 14, fontWeight: 700 }}>
                🔧 Repair
              </span>
              <span style={{ background: '#1E293B', color: '#94A3B8', padding: '4px 12px', borderRadius: 99, fontSize: 14, fontWeight: 700 }}>
                🍽️ Cafe / Food
              </span>
            </div>
          </div>
        )}

        {/* SCENE 2: Kirana & WhatsApp Cart Mockup */}
        {sceneIndex === 2 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: 630,
              background: 'rgba(6, 78, 59, 0.95)',
              border: '2px solid #10B981',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 20px 48px rgba(16, 185, 129, 0.35)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#A7F3D0' }}>
                🏬 Counter QR + 1-Click WhatsApp
              </span>
              <span style={{ background: '#047857', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                0% Cut
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 32 }}>📲</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
                  Customer Scanned Counter QR
                </div>
                <div style={{ fontSize: 15, color: '#D1FAE5', marginTop: 2 }}>
                  Direct WhatsApp Order: 5kg Basmati Rice, 2L Oil (Ready to pack)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 3: Repair Digital Job Sheet Mockup */}
        {sceneIndex === 3 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: 630,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #38BDF8',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 20px 48px rgba(56, 189, 248, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#7DD3FC' }}>
                📱 Digital Job Sheet #1042
              </span>
              <span style={{ background: '#0369A1', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                Live Status
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 700, color: '#BAE6FD' }}>
              <span>✅ Received</span>
              <span>➔</span>
              <span>⚙️ Diagnosing</span>
              <span>➔</span>
              <span style={{ color: '#FDE047' }}>🎉 Ready!</span>
            </div>
            <div style={{ background: '#075985', padding: '10px 14px', borderRadius: 12, textAlign: 'center', fontSize: 16, fontWeight: 800, color: '#FFFFFF' }}>
              💬 1-Click WhatsApp Pickup Alert & 6-Mo Warranty
            </div>
          </div>
        )}

        {/* SCENE 4: Restaurant Table QR Mockup */}
        {sceneIndex === 4 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: 630,
              background: 'rgba(67, 20, 7, 0.95)',
              border: '2px solid #F97316',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 20px 48px rgba(249, 115, 22, 0.35)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#FED7AA' }}>
                🍽️ Table QR & Live Kitchen KOT
              </span>
              <span style={{ background: '#C2410C', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                Zero POS Cost
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 32 }}>🍳</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
                  Table 4 Placed Dine-In Order!
                </div>
                <div style={{ fontSize: 15, color: '#FFEDD5', marginTop: 2 }}>
                  Live Kitchen Screen: 1x Paneer Tikka, 2x Cold Coffee
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 5: Grand Call to Action & 0% Commission */}
        {sceneIndex === 5 && (
          <div
            style={{
              position: 'absolute',
              top: '48%',
              width: 650,
              background: 'rgba(30, 27, 75, 0.95)',
              border: '2px solid #FBBF24',
              borderRadius: 26,
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 20px 50px rgba(251, 191, 36, 0.35)',
            }}
          >
            <div
              style={{
                background: '#F59E0B',
                color: '#000000',
                padding: '6px 20px',
                borderRadius: 99,
                fontSize: 18,
                fontWeight: 900,
              }}
            >
              FREE TRIAL ACTIVATION READY
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, color: '#FCD34D', textAlign: 'center' }}>
              shop.lifesolvenow.com
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ 0% Sales Commission
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ Free Starter Plan
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ Instant Setup
              </span>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: SUBTITLES & TRUST FOOTER */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          zIndex: 10,
        }}
      >
        {/* Highlight Word Pill */}
        <div
          style={{
            background: `${accentColor}22`,
            border: `1.5px solid ${accentColor}`,
            padding: '8px 24px',
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 800,
            color: accentColor,
            textAlign: 'center',
            boxShadow: `0 4px 16px ${accentColor}33`,
          }}
        >
          {highlightWord}
        </div>

        {/* Dynamic Subtitle Box */}
        <div
          style={{
            width: '100%',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 24,
            padding: '24px 32px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#FFFFFF',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
          }}
        >
          {subtitleText}
        </div>

        {/* Persistent Trust Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            fontSize: 16,
            fontWeight: 700,
            color: '#94A3B8',
          }}
        >
          <span>⭐ 0% Commission</span>
          <span>•</span>
          <span>🇮🇳 Built for Local India</span>
          <span>•</span>
          <span>⚡ Free Trial Ready</span>
        </div>
      </div>
    </div>
  );
};
