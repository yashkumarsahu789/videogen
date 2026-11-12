import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { KabirCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/kabir/KabirCharacter';
import visemesData from './visemes.json';

export const ShopRepairAd: React.FC = () => {
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

  // Scene timing configuration (Total 1293 frames)
  let sceneIndex = 1;
  let sceneBadge = '🔧 REPAIR DUKAN KI PARESHANI';
  let eyebrow: EyebrowState = 'curious';
  let subtitleText = '';
  let highlightWord = '';
  let bgGradient = 'radial-gradient(circle at 50% 30%, #1c1917 0%, #0c0a09 80%)';
  let accentColor = '#F59E0B';

  if (frame < 240) {
    // Scene 1: The Daily Repair Chaos (0 - 8s)
    sceneIndex = 1;
    sceneBadge = '🔧 REPAIR DUKAN KA SAWAAL';
    eyebrow = 'curious';
    accentColor = '#F59E0B';
    bgGradient = 'radial-gradient(circle at 50% 30%, #292524 0%, #0c0a09 80%)';
    subtitleText = 'Dukan me 20 phone khule pade hain... aur grahak ka har 10 minute me call — "Bhaiya, phone bana kya?"';
    highlightWord = '"Bhaiya, mera phone kab banega?"';
  } else if (frame < 470) {
    // Scene 2: Paper Slip Lost & Warranty Dispute (8 - 15.6s)
    sceneIndex = 2;
    sceneBadge = '⚠️ PARCHI KHONE KA JHANJHAT';
    eyebrow = 'raised';
    accentColor = '#EF4444';
    bgGradient = 'radial-gradient(circle at 50% 30%, #450A0A 0%, #030712 80%)';
    subtitleText = 'Paper ki raseed ghum jaati hai... aur delivery ke waqt warranty par faltu ki behes!';
    highlightWord = 'Parchi Gum & Warranty Disputes';
  } else if (frame < 740) {
    // Scene 3: Solution - Digital Job Sheet (15.6 - 24.6s)
    sceneIndex = 3;
    sceneBadge = '✨ THE DIGITAL SOLUTION';
    eyebrow = 'neutral';
    accentColor = '#3B82F6';
    bgGradient = 'radial-gradient(circle at 50% 30%, #172554 0%, #030712 75%)';
    subtitleText = 'Ab register chhodo! shop.lifesolvenow.com par banao apni dukan ka Digital Job Sheet.';
    highlightWord = 'Digital Job-Sheet Token';
  } else if (frame < 1050) {
    // Scene 4: Live Tracking & 1-Click WhatsApp Pickup (24.6 - 35s)
    sceneIndex = 4;
    sceneBadge = '📲 1-CLICK WHATSAPP & WARRANTY';
    eyebrow = 'neutral';
    accentColor = '#10B981';
    bgGradient = 'radial-gradient(circle at 50% 30%, #064E3B 0%, #030712 75%)';
    subtitleText = 'Phone aate hi customer ko live tracking link! Aur ready hote hi 1-click WhatsApp pickup alert!';
    highlightWord = 'WhatsApp Ready Msg & 6-Mo Warranty';
  } else {
    // Scene 5: Free Trial Activation CTA (35 - 43.08s)
    sceneIndex = 5;
    sceneBadge = '🚀 CLAIM FREE TRIAL TODAY';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #312E81 0%, #030712 80%)';
    subtitleText = 'Call ka tension khatam, grahak khush! Aaj hi shuru karein Free Trial — shop.lifesolvenow.com';
    highlightWord = 'shop.lifesolvenow.com';
  }

  // Floating Pulse Animation
  const pulse = Math.sin(frame * 0.12) * 5;

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
      {/* Background Tech Mesh Grid */}
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

      {/* TOP BAR: Brand & Feature Badge */}
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
          <span style={{ fontSize: 24 }}>🛡️</span>
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
          SHOP.LIFESOLVENOW.COM • SMART BUSINESS OS
        </div>
      </div>

      {/* CENTER VISUAL STAGE */}
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

        {/* SCENE-SPECIFIC DYNAMIC FEATURE GRAPHICS */}
        {sceneIndex === 1 && (
          <div
            style={{
              position: 'absolute',
              top: '55%',
              width: 580,
              background: 'rgba(15, 23, 42, 0.92)',
              border: '2px solid #F59E0B',
              borderRadius: 24,
              padding: '24px 30px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              boxShadow: '0 16px 40px rgba(245, 158, 11, 0.25)',
              animation: 'bounce 1s infinite alternate',
            }}
          >
            <div style={{ fontSize: 48, background: '#78350F', borderRadius: 16, padding: 12 }}>
              📞
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FCD34D' }}>
                Incoming Call · 10:42 AM
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF', marginTop: 4 }}>
                "Bhaiya display kab lagega?"
              </div>
              <div style={{ fontSize: 16, color: '#94A3B8', marginTop: 4 }}>
                18th repetitive call today ⏳
              </div>
            </div>
          </div>
        )}

        {sceneIndex === 2 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              width: 600,
              background: 'rgba(69, 10, 10, 0.95)',
              border: '2px solid #EF4444',
              borderRadius: 24,
              padding: '24px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 16px 40px rgba(239, 68, 68, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 36 }}>❌</span>
              <div style={{ fontSize: 24, fontWeight: 900, color: '#FCA5A5' }}>
                Purana Paper Register Band Karo!
              </div>
            </div>
            <div
              style={{
                background: 'rgba(0,0,0,0.4)',
                padding: '12px 18px',
                borderRadius: 14,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 18,
                fontWeight: 700,
              }}
            >
              <span style={{ color: '#F87171' }}>📄 Parchi Gum Jaana</span>
              <span style={{ color: '#FCD34D' }}>⚠️ Warranty Par Behes</span>
            </div>
          </div>
        )}

        {sceneIndex === 3 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: 620,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #3B82F6',
              borderRadius: 24,
              padding: '22px 26px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 20px 48px rgba(59, 130, 246, 0.3)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 28 }}>📱</span>
                <span style={{ fontSize: 22, fontWeight: 900, color: '#60A5FA' }}>
                  Job Card #1042
                </span>
              </div>
              <span
                style={{
                  background: '#1E3A8A',
                  color: '#93C5FD',
                  padding: '4px 12px',
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                In Progress ⚙️
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
              Smartphone · Screen & Battery Replacement
            </div>
            <div style={{ display: 'flex', gap: 12, fontSize: 15, color: '#94A3B8' }}>
              <span>👤 Ramesh K.</span>
              <span>•</span>
              <span>📍 Dantewada</span>
              <span>•</span>
              <span>🛡️ 6 Mo Warranty</span>
            </div>
          </div>
        )}

        {sceneIndex === 4 && (
          <div
            style={{
              position: 'absolute',
              top: '48%',
              width: 640,
              background: 'rgba(6, 78, 59, 0.95)',
              border: '2px solid #10B981',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.35)',
            }}
          >
            {/* Live Progress Tracker */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 800, color: '#A7F3D0' }}>
                <span>✅ Received</span>
                <span>➔</span>
                <span>✅ Diagnosed</span>
                <span>➔</span>
                <span style={{ color: '#FBBF24' }}>🎉 Ready!</span>
              </div>
            </div>

            {/* 1-Click WhatsApp Button */}
            <div
              style={{
                background: '#047857',
                border: '1px solid #34D399',
                borderRadius: 14,
                padding: '12px 18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 26 }}>💬</span>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#FFFFFF' }}>
                Send "Ready for Pickup" on WhatsApp
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 16, fontWeight: 700, color: '#D1FAE5' }}>
              <span>🛡️ Digital Warranty Token</span>
              <span>•</span>
              <span>⏱️ Zero Follow-Up Calls</span>
            </div>
          </div>
        )}

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
                ✓ 0% Commission
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ Digital Job Sheets
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ WhatsApp Alerts
              </span>
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM SECTION: SUBTITLES & VALUE PROPOSITION */}
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
        {/* Highlight Focus Pill */}
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

        {/* Dynamic Subtitle Card */}
        <div
          style={{
            width: '100%',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            borderRadius: 24,
            padding: '24px 32px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            textAlign: 'center',
            fontSize: 27,
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
          <span>⚡ Instant Setup</span>
          <span>•</span>
          <span>🇮🇳 For Indian Local Businesses</span>
        </div>
      </div>
    </div>
  );
};
