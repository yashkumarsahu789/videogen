import React from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { KabirCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/kabir/KabirCharacter';
import visemesData from './visemes.json';

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

  // 30-Second Dynamic Scenes (Total 980 frames @ 30 FPS)
  let sceneIndex = 1;
  let sceneBadge = '🏬 DUKAN KA SAWAAL';
  let eyebrow: EyebrowState = 'curious';
  let subtitleText = '';
  let highlightWord = '';
  let bgGradient = 'radial-gradient(circle at 50% 30%, #1E293B 0%, #030712 75%)';
  let accentColor = '#F59E0B';

  if (frame < 195) {
    // Scene 1: The Hook (0 - 6.5s)
    sceneIndex = 1;
    sceneBadge = '🏬 DUKAN KA SAWAAL';
    eyebrow = 'curious';
    accentColor = '#F59E0B';
    bgGradient = 'radial-gradient(circle at 50% 30%, #1E293B 0%, #030712 75%)';
    subtitleText = 'Dukan par grahak kam... aur orders online apps par ja rahe hain?';
    highlightWord = 'ORDERS ONLINE KYU GAYE?';
  } else if (frame < 400) {
    // Scene 2: 30% Commission Trap (6.5s - 13.3s)
    sceneIndex = 2;
    sceneBadge = '⚠️ 30% COMMISSION KA TRAP';
    eyebrow = 'raised';
    accentColor = '#EF4444';
    bgGradient = 'radial-gradient(circle at 50% 30%, #450A0A 0%, #030712 80%)';
    subtitleText = 'Bade apps 30% commission kaat lete hain... Lekin ab aur nahi!';
    highlightWord = '30% COMMISSION LOOT? AB AUR NAHI!';
  } else if (frame < 640) {
    // Scene 3: The Solution (13.3s - 21.3s)
    sceneIndex = 3;
    sceneBadge = '✨ THE REAL SOLUTION';
    eyebrow = 'neutral';
    accentColor = '#10B981';
    bgGradient = 'radial-gradient(circle at 50% 30%, #064E3B 0%, #030712 75%)';
    subtitleText = 'Apni dukan direct online lao: 0% Commission & Direct WhatsApp Orders!';
    highlightWord = '0% COMMISSION & WHATSAPP ORDERS';
  } else if (frame < 820) {
    // Scene 4: ₹99/mo Pricing (21.3s - 27.3s)
    sceneIndex = 4;
    sceneBadge = '💰 UNBEATABLE PRICING';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #312E81 0%, #030712 75%)';
    subtitleText = 'Starter plan bilkul FREE hai! Aur Pro plan sirf ₹99/mahina!';
    highlightWord = 'FREE STARTER & ₹99 PRO PLAN';
  } else {
    // Scene 5: Action CTA (27.3s - 32.6s)
    sceneIndex = 5;
    sceneBadge = '🚀 APNI DUKAN DIGITAL BANAO';
    eyebrow = 'neutral';
    accentColor = '#38BDF8';
    bgGradient = 'radial-gradient(circle at 50% 30%, #1E1B4B 0%, #030712 80%)';
    subtitleText = 'Aaj hi visit karein: shop.lifesolvenow.com aur Google par chhao!';
    highlightWord = 'shop.lifesolvenow.com';
  }

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
      {/* Background Pulsing Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: accentColor,
          opacity: 0.22,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.08) * 0.1})`,
          filter: 'blur(95px)',
          pointerEvents: 'none',
        }}
      />

      {/* TOP HEADER SECTION */}
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
            background: 'rgba(255, 255, 255, 0.08)',
            border: `1.5px solid ${accentColor}`,
            padding: '10px 28px',
            borderRadius: 40,
            fontSize: 22,
            fontWeight: 800,
            color: accentColor,
            letterSpacing: 2,
            boxShadow: `0 0 25px ${accentColor}33`,
          }}
        >
          ● {sceneBadge}
        </div>

        <div style={{ fontSize: 26, fontWeight: 900, color: '#94A3B8', letterSpacing: 1 }}>
          shop.lifesolvenow.com
        </div>
      </div>

      {/* FLOATING FEATURE CARDS OVERLAYS (Per Scene) */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 15,
        }}
      >
        {sceneIndex === 1 && (
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.88)',
              border: '2px solid rgba(245, 158, 11, 0.6)',
              borderRadius: 20,
              padding: '16px 34px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            <span style={{ fontSize: 42 }}>🛵</span>
            <div>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#F59E0B' }}>
                CUSTOMERS SHOPPING ON QUICK APPS?
              </div>
              <div style={{ fontSize: 20, color: '#CBD5E1' }}>
                Bring your neighborhood customers back to your shop
              </div>
            </div>
          </div>
        )}

        {sceneIndex === 2 && (
          <div
            style={{
              background: 'rgba(69, 10, 10, 0.92)',
              border: '2.5px solid #EF4444',
              borderRadius: 20,
              padding: '18px 36px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 0 45px rgba(239, 68, 68, 0.45)',
              transform: `scale(${1 + Math.sin(frame * 0.18) * 0.03})`,
            }}
          >
            <span style={{ fontSize: 44 }}>🚫</span>
            <div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>
                30% APP COMMISSION LOOT!
              </div>
              <div style={{ fontSize: 20, color: '#FCA5A5' }}>
                Stop losing your hard-earned profit to delivery giants
              </div>
            </div>
          </div>
        )}

        {sceneIndex === 3 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(6, 78, 59, 0.95)',
                border: '2px solid #10B981',
                borderRadius: 20,
                padding: '14px 32px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                boxShadow: '0 0 40px rgba(16, 185, 129, 0.4)',
              }}
            >
              <span style={{ fontSize: 36 }}>🟢</span>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#A7F3D0' }}>
                0% SALES COMMISSION · LIFETIME
              </span>
            </div>
            <div
              style={{
                background: 'rgba(15, 23, 42, 0.92)',
                border: '1.5px solid #25D366',
                borderRadius: 16,
                padding: '10px 26px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <span style={{ fontSize: 28 }}>💬</span>
              <span style={{ fontSize: 22, fontWeight: 800, color: '#25D366' }}>
                Direct Customer WhatsApp Orders
              </span>
            </div>
          </div>
        )}

        {sceneIndex === 4 && (
          <div
            style={{
              display: 'flex',
              gap: 20,
              width: '90%',
              maxWidth: 960,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                flex: 1,
                background: 'rgba(30, 41, 59, 0.92)',
                border: '2px solid #94A3B8',
                borderRadius: 20,
                padding: '20px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 20, color: '#94A3B8', fontWeight: 800 }}>STARTER PLAN</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: '#FFFFFF', margin: '6px 0' }}>₹0 FREE</div>
              <div style={{ fontSize: 18, color: '#CBD5E1' }}>Up to 40 Products Listed</div>
            </div>
            <div
              style={{
                flex: 1.1,
                background: 'rgba(49, 46, 129, 0.95)',
                border: '2.5px solid #F59E0B',
                borderRadius: 20,
                padding: '20px 24px',
                textAlign: 'center',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.35)',
                transform: 'scale(1.04)',
              }}
            >
              <div style={{ fontSize: 20, color: '#FDE68A', fontWeight: 800 }}>★ PRO PLAN</div>
              <div style={{ fontSize: 44, fontWeight: 900, color: '#FBBF24', margin: '6px 0' }}>₹99 / MO</div>
              <div style={{ fontSize: 18, color: '#FFFFFF' }}>Unlimited Products + Google Boost</div>
            </div>
          </div>
        )}

        {sceneIndex === 5 && (
          <div
            style={{
              background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(88, 28, 135, 0.95) 100%)',
              border: '2.5px solid #38BDF8',
              borderRadius: 24,
              padding: '22px 42px',
              textAlign: 'center',
              boxShadow: '0 0 50px rgba(56, 189, 248, 0.45)',
              transform: `scale(${1 + Math.sin(frame * 0.15) * 0.03})`,
            }}
          >
            <div style={{ fontSize: 22, color: '#BAE6FD', fontWeight: 800, letterSpacing: 1.5 }}>
              JOIN INDIA'S LOCAL MARKETPLACE
            </div>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#FFFFFF', marginTop: 4 }}>
              shop.lifesolvenow.com
            </div>
          </div>
        )}
      </div>

      {/* CHARACTER STAGE (KABIR - TRUSTED MENTOR) */}
      <div
        style={{
          zIndex: 10,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: 180,
          transform: `translateY(${headY}px) rotate(${headRot}deg)`,
        }}
      >
        <KabirCharacter
          mouthState={mouth}
          eyeState={eyes}
          eyebrowState={eyebrow}
          headY={headY}
          headRot={headRot}
          width={760}
          height={980}
        />
      </div>

      {/* BOTTOM CAPTION & SUBTITLE CARD */}
      <div
        style={{
          width: '100%',
          maxWidth: 980,
          background: 'rgba(11, 15, 25, 0.94)',
          backdropFilter: 'blur(24px)',
          border: `2px solid ${accentColor}88`,
          borderRadius: 28,
          padding: '28px 36px',
          textAlign: 'center',
          zIndex: 20,
          boxShadow: `0 15px 45px rgba(0, 0, 0, 0.7), 0 0 30px ${accentColor}22`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            color: accentColor,
            fontWeight: 800,
            marginBottom: 10,
            letterSpacing: 1.5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span>🎙️ HOST: KABIR</span>
          <span>•</span>
          <span>TIME: {(frame / fps).toFixed(1)}s / {(totalFrames / fps).toFixed(1)}s</span>
        </div>

        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.4,
          }}
        >
          "{subtitleText}"
        </div>

        <div
          style={{
            marginTop: 12,
            display: 'inline-block',
            background: `${accentColor}22`,
            border: `1px solid ${accentColor}`,
            padding: '6px 20px',
            borderRadius: 20,
            fontSize: 22,
            fontWeight: 800,
            color: accentColor,
          }}
        >
          ★ {highlightWord}
        </div>
      </div>
    </div>
  );
};
