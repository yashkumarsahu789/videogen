import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, Audio } from 'remotion';
import visemesData from './visemes.json';
import assets from './assets_b64.json';

interface SceneConfig {
  startFrame: number;
  endFrame: number;
  imageKey: string;
  text: string;
}

const SCENES: SceneConfig[] = [
  {
    startFrame: 0,
    endFrame: 90, // Scene 1 (0-3s)
    imageKey: 'ramesh_bhaiya_counter.jpg',
    text: 'DUKAAN AAPKI. KAMAI BHI AAPKI.',
  },
  {
    startFrame: 90,
    endFrame: 240, // Scene 2 (3-8s)
    imageKey: 'commission_trap.jpg',
    text: '20-30% COMMISSION ❌',
  },
  {
    startFrame: 240,
    endFrame: 360, // Scene 3 (8-12s)
    imageKey: 'digital_growth.jpg',
    text: '0% SALES COMMISSION ⚡',
  },
  {
    startFrame: 360,
    endFrame: 450, // Scene 4 (12-15s)
    imageKey: 'spice_store.jpg',
    text: 'ONLINE STORE KUCH MINUTE MEIN',
  },
  {
    startFrame: 450,
    endFrame: 540, // Scene 5 (15-18s)
    imageKey: 'shop_customer_interaction.jpg',
    text: '📲 DIRECT WHATSAPP ORDER',
  },
  {
    startFrame: 540,
    endFrame: 660, // Scene 6 (18-22s)
    imageKey: 'repair_technician.jpg',
    text: '🔍 GOOGLE SHOPPING SYNC • 🔧 LIVE REPAIR TRACKING',
  },
  {
    startFrame: 660,
    endFrame: 750, // Scene 7 (22-25s)
    imageKey: 'digital_store.jpg',
    text: 'FREE TRIAL • PRO ₹99/MONTH',
  },
  {
    startFrame: 750,
    endFrame: 892, // Scene 8 (25-30s)
    imageKey: 'market_crowd.jpg',
    text: 'shop.lifesolvenow.com 🚀 Claim Free Trial',
  },
];

export const Shop30sAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Active scene resolution
  const activeSceneIndex = SCENES.findIndex(
    (s) => frame >= s.startFrame && frame < s.endFrame
  );
  const currentScene = SCENES[activeSceneIndex !== -1 ? activeSceneIndex : SCENES.length - 1];

  // Subtle Ken-Burns pan/zoom per scene
  const sceneLen = currentScene.endFrame - currentScene.startFrame;
  const sceneProgress = Math.min(1, Math.max(0, (frame - currentScene.startFrame) / Math.max(1, sceneLen)));
  const bgScale = interpolate(sceneProgress, [0, 1], [1.0, 1.05], { extrapolateRight: 'clamp' });
  const bgPanY = interpolate(sceneProgress, [0, 1], [0, -12], { extrapolateRight: 'clamp' });

  // Pop and fade animation for lower-third caption text
  const localFrame = frame - currentScene.startFrame;
  const textPopSpring = spring({
    frame: localFrame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const textScale = interpolate(textPopSpring, [0, 1], [0.9, 1.0], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(localFrame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });

  // Floating UI Pop-in animation for scenes 2, 3, 5, 6, 7
  const uiLocalFrame = Math.max(0, localFrame - 4);
  const uiSpring = spring({
    frame: uiLocalFrame,
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const uiScale = interpolate(uiSpring, [0, 1], [0.88, 1.0], { extrapolateRight: 'clamp' });
  const uiOpacity = interpolate(uiLocalFrame, [0, 5], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#0F172A',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif",
      }}
    >
      {/* 1. Synchronized Voiceover Audio */}
      {assets['voiceover.mp3'] && <Audio src={assets['voiceover.mp3']} />}

      {/* 2. Photorealistic Clean Background Image with Ken-Burns */}
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
            filter: 'brightness(0.92) contrast(1.05)',
          }}
        />

        {/* Cinematic Vignette for Depth & High Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(15,23,42,0.4) 0%, rgba(15,23,42,0.05) 25%, rgba(15,23,42,0.2) 65%, rgba(15,23,42,0.85) 100%)',
          }}
        />
      </div>

      {/* 3. CODE-DRIVEN FLOATING UI OVERLAYS (Scenes 2, 3, 5, 6, 7) */}

      {/* === SCENE 2 UI: Delivery App Commission Cut (Placed over hand/phone area) === */}
      {currentScene.startFrame === 90 && (
        <div
          style={{
            position: 'absolute',
            top: 840,
            left: '50%',
            transform: `translateX(-50%) scale(${uiScale})`,
            opacity: uiOpacity,
            zIndex: 85,
            width: 620,
          }}
        >
          <div
            style={{
              background: 'rgba(20, 10, 15, 0.96)',
              border: '3px solid #EF4444',
              borderRadius: 32,
              padding: '24px 28px',
              boxShadow: '0 24px 60px rgba(239, 68, 68, 0.5), 0 0 30px rgba(239, 68, 68, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1.5px solid rgba(239, 68, 68, 0.3)',
                paddingBottom: 12,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>📦</span>
                <span style={{ color: '#F87171', fontWeight: 900, fontSize: 20, letterSpacing: '0.04em' }}>
                  DELIVERY APP ORDER SUMMARY
                </span>
              </div>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.25)',
                  border: '1px solid #EF4444',
                  color: '#EF4444',
                  padding: '4px 12px',
                  borderRadius: 999,
                  fontWeight: 900,
                  fontSize: 16,
                }}
              >
                -25% CUT
              </div>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#CBD5E1', fontSize: 24, fontWeight: 700 }}>Order</span>
                <span style={{ color: '#FFFFFF', fontSize: 28, fontWeight: 900 }}>₹1,000</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(239, 68, 68, 0.2)',
                  padding: '10px 16px',
                  borderRadius: 14,
                  border: '1px dashed #EF4444',
                }}
              >
                <span style={{ color: '#FCA5A5', fontSize: 24, fontWeight: 900 }}>Commission -25%</span>
                <span style={{ color: '#EF4444', fontSize: 28, fontWeight: 900 }}>(-₹250)</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1.5px solid rgba(255, 255, 255, 0.15)',
                  paddingTop: 12,
                }}
              >
                <span style={{ color: '#94A3B8', fontSize: 24, fontWeight: 800 }}>You get</span>
                <span style={{ color: '#F87171', fontSize: 38, fontWeight: 900 }}>₹750</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCENE 3 UI: shop.lifesolvenow.com Store Page (Placed over hand/phone area) === */}
      {currentScene.startFrame === 240 && (
        <div
          style={{
            position: 'absolute',
            top: 1040,
            left: '50%',
            transform: `translateX(-50%) scale(${uiScale})`,
            opacity: uiOpacity,
            zIndex: 85,
            width: 660,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.96)',
              border: '3px solid #10B981',
              borderRadius: 32,
              padding: '22px 26px',
              boxShadow: '0 24px 60px rgba(16, 185, 129, 0.45), 0 0 30px rgba(16, 185, 129, 0.25)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Browser URL Bar */}
            <div
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: 999,
                padding: '8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 18 }}>🔒</span>
              <span style={{ color: '#34D399', fontSize: 20, fontWeight: 800, letterSpacing: '0.02em' }}>
                shop.lifesolvenow.com
              </span>
            </div>

            {/* Badges: "0% SALES COMMISSION" + "Verified Merchant" */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  padding: '8px 16px',
                  borderRadius: 999,
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: 17,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>⚡</span>
                <span>0% SALES COMMISSION</span>
              </div>
              <div
                style={{
                  background: 'rgba(56, 189, 248, 0.18)',
                  border: '1.5px solid #38BDF8',
                  padding: '8px 14px',
                  borderRadius: 999,
                  color: '#38BDF8',
                  fontWeight: 800,
                  fontSize: 17,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>✓</span>
                <span>Verified Merchant</span>
              </div>
            </div>

            {/* Product Cards with ₹ Prices */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div
                style={{
                  background: 'rgba(30, 41, 59, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 2 }}>🌾</div>
                <div style={{ color: '#E2E8F0', fontWeight: 800, fontSize: 17 }}>Basmati Rice (5kg)</div>
                <div style={{ color: '#34D399', fontWeight: 900, fontSize: 22, marginTop: 2 }}>₹450</div>
              </div>

              <div
                style={{
                  background: 'rgba(30, 41, 59, 0.85)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: '10px 14px',
                }}
              >
                <div style={{ fontSize: 22, marginBottom: 2 }}>🫘</div>
                <div style={{ color: '#E2E8F0', fontWeight: 800, fontSize: 17 }}>Toor Dal (1kg)</div>
                <div style={{ color: '#34D399', fontWeight: 900, fontSize: 22, marginTop: 2 }}>₹160</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCENE 5 UI: Green Chat-Style Order + "UPI payment received" === */}
      {currentScene.startFrame === 450 && (
        <div
          style={{
            position: 'absolute',
            top: 740,
            left: '50%',
            transform: `translateX(-50%) scale(${uiScale})`,
            opacity: uiOpacity,
            zIndex: 85,
            width: 660,
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          {/* Green Chat-Style Order Message */}
          <div
            style={{
              background: 'rgba(15, 60, 40, 0.96)',
              border: '2px solid #22C55E',
              borderRadius: '24px 24px 24px 6px',
              padding: '18px 22px',
              boxShadow: '0 16px 40px rgba(34, 197, 94, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <span style={{ color: '#86EFAC', fontWeight: 900, fontSize: 18, letterSpacing: '0.03em' }}>
                DIRECT ORDER MESSAGE
              </span>
            </div>
            <div style={{ color: '#FFFFFF', fontWeight: 700, fontSize: 21, lineHeight: 1.4 }}>
              &ldquo;Namaste Ramesh Bhaiya, 2 packet Toor Dal aur 5kg Rice bhej dijiye.&rdquo;
            </div>
          </div>

          {/* "UPI payment received" Notification */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.96)',
              border: '2px solid #38BDF8',
              borderRadius: 22,
              padding: '16px 22px',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              boxShadow: '0 20px 50px rgba(56, 189, 248, 0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 999,
                background: 'linear-gradient(135deg, #10B981 0%, #38BDF8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 22,
                color: '#FFFFFF',
                fontWeight: 900,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div>
              <div style={{ color: '#38BDF8', fontWeight: 900, fontSize: 19, letterSpacing: '0.02em' }}>
                UPI PAYMENT RECEIVED
              </div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 26, marginTop: 2 }}>
                ₹770.00
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCENE 6 UI: "kirana store near me" Search List + Repair Tracker === */}
      {currentScene.startFrame === 540 && (
        <div
          style={{
            position: 'absolute',
            top: 200,
            left: '50%',
            transform: `translateX(-50%) scale(${uiScale})`,
            opacity: uiOpacity,
            zIndex: 85,
            width: 820,
          }}
        >
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.96)',
              border: '2.5px solid #818CF8',
              borderRadius: 30,
              padding: '22px 26px',
              boxShadow: '0 24px 60px rgba(129, 140, 248, 0.35)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {/* Search Bar */}
            <div
              style={{
                background: 'rgba(30, 41, 59, 0.9)',
                borderRadius: 999,
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                border: '1.5px solid rgba(255, 255, 255, 0.15)',
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 20 }}>🔍</span>
              <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700 }}>
                kirana store near me
              </span>
            </div>

            {/* Shop On Top */}
            <div
              style={{
                background: 'rgba(49, 46, 129, 0.45)',
                border: '1.5px solid #818CF8',
                borderRadius: 16,
                padding: '12px 18px',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#A5B4FC', fontWeight: 900, fontSize: 20 }}>
                  #1 Ramesh Kirana & Repair
                </span>
                <span style={{ color: '#FBBF24', fontWeight: 900, fontSize: 17 }}>★ 4.9 (180+)</span>
              </div>
              <div style={{ color: '#CBD5E1', fontSize: 16, fontWeight: 600, marginTop: 4 }}>
                Verified Store • Live Online
              </div>
            </div>

            {/* Repair Tracker: Received > Diagnosing > Ready */}
            <div
              style={{
                borderTop: '1.5px solid rgba(255, 255, 255, 0.15)',
                paddingTop: 12,
              }}
            >
              <div
                style={{
                  color: '#C7D2FE',
                  fontWeight: 900,
                  fontSize: 18,
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <span>🔧</span>
                <span>LIVE REPAIR TRACKER</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(30, 41, 59, 0.85)',
                  borderRadius: 14,
                  padding: '12px 16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#10B981', fontWeight: 900, fontSize: 18 }}>✓</span>
                  <span style={{ color: '#E2E8F0', fontWeight: 800, fontSize: 18 }}>Received</span>
                </div>
                <span style={{ color: '#818CF8', fontWeight: 900, fontSize: 18 }}>&gt;</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#FBBF24', fontWeight: 900, fontSize: 18 }}>⚡</span>
                  <span style={{ color: '#FDE047', fontWeight: 900, fontSize: 18 }}>Diagnosing</span>
                </div>
                <span style={{ color: '#818CF8', fontWeight: 900, fontSize: 18 }}>&gt;</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#94A3B8', fontWeight: 900, fontSize: 18 }}>○</span>
                  <span style={{ color: '#94A3B8', fontWeight: 800, fontSize: 18 }}>Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* === SCENE 7 UI: Two Plan Cards: Starter ₹0 and Pro ₹99/month === */}
      {currentScene.startFrame === 660 && (
        <div
          style={{
            position: 'absolute',
            top: 1040,
            left: '50%',
            transform: `translateX(-50%) scale(${uiScale})`,
            opacity: uiOpacity,
            zIndex: 85,
            width: 780,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {/* Plan 1: Starter ₹0 (Free) */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.96)',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: 24,
              padding: '22px 20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ color: '#94A3B8', fontWeight: 900, fontSize: 20, letterSpacing: '0.05em' }}>
              STARTER
            </div>
            <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 34, marginTop: 4, marginBottom: 8 }}>
              ₹0 <span style={{ fontSize: 18, color: '#34D399' }}>(Free)</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#CBD5E1', fontSize: 17, fontWeight: 700 }}>
              <div>• Up to 40 Products</div>
              <div>• Direct WhatsApp</div>
              <div>• 0% Commission</div>
            </div>
          </div>

          {/* Plan 2: Pro ₹99/month */}
          <div
            style={{
              background: 'rgba(15, 23, 42, 0.98)',
              border: '2.5px solid #F59E0B',
              borderRadius: 24,
              padding: '22px 20px',
              boxShadow: '0 24px 50px rgba(245, 158, 11, 0.35)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -12,
                right: 16,
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: 13,
                padding: '3px 12px',
                borderRadius: 999,
                letterSpacing: '0.06em',
              }}
            >
              POPULAR
            </div>
            <div style={{ color: '#FBBF24', fontWeight: 900, fontSize: 20, letterSpacing: '0.05em' }}>
              PRO
            </div>
            <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 34, marginTop: 4, marginBottom: 8 }}>
              ₹99<span style={{ fontSize: 18, color: '#FDE047' }}>/month</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, color: '#FDE047', fontSize: 17, fontWeight: 700 }}>
              <div>• Unlimited Products</div>
              <div>• Google Sync Boost</div>
              <div>• Live Job Tracking</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. EXACT ON-SCREEN TEXT OVERLAY LAYER (Center-Lower Safe Area for Reels) */}
      <div
        style={{
          position: 'absolute',
          bottom: 340, // 340px above bottom edge = safe above bottom 15% (288px) Reels UI
          left: 50,
          right: 50,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          pointerEvents: 'none',
          transform: `scale(${textScale})`,
          opacity: textOpacity,
        }}
      >
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '2px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 16px 48px rgba(0, 0, 0, 0.8), 0 0 24px rgba(0, 0, 0, 0.5)',
            borderRadius: 30,
            padding: '20px 42px',
            maxWidth: 960,
            textAlign: 'center',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Segoe UI Emoji', 'Noto Color Emoji', 'Apple Color Emoji', Roboto, sans-serif",
              fontSize: currentScene.text.length > 35 ? 33 : 40,
              fontWeight: 900,
              lineHeight: 1.35,
              letterSpacing: '0.02em',
              textShadow:
                '-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000, 0 4px 16px rgba(0,0,0,0.95)',
              display: 'inline-block',
            }}
          >
            {currentScene.text}
          </span>
        </div>
      </div>
    </div>
  );
};
