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

  // ========================================================
  // 12 REALISTIC SCENE CUTS (Rapid Pacing strictly matching script)
  // Cut 1:   0 -  90  (0.0s - 3.0s) -> Jagdalpur Night Market Street
  // Cut 2:  90 - 180  (3.0s - 6.0s) -> Ramesh Bhaiya at Counter
  // Cut 3: 180 - 312  (6.0s - 10.4s) -> Kirana Store Inside Sacks
  // Cut 4: 312 - 430  (10.4s - 14.3s) -> Spice Store & Local Neighborhood
  // Cut 5: 430 - 530  (14.3s - 17.7s) -> Mobile Screen Order Trend
  // Cut 6: 530 - 705  (17.7s - 23.5s) -> Commission Trap Alert Card
  // Cut 7: 705 - 870  (23.5s - 29.0s) -> shop.lifesolvenow.com Discovery
  // Cut 8: 870 - 1048 (29.0s - 34.9s) -> WhatsApp Direct Order Bubble
  // Cut 9: 1048 - 1200 (34.9s - 40.0s) -> Sunlit Crowded Market Bazaar
  // Cut 10: 1200 - 1369 (40.0s - 45.6s) -> Ramesh Bhaiya Smiling with Customers
  // Cut 11: 1369 - 1570 (45.6s - 52.3s) -> Yash Talking Avatar Intro
  // Cut 12: 1570 - 1792 (52.3s - 59.7s) -> Yash CTA & Follow
  // ========================================================

  let topHeading = 'BASTAR • JAGDALPUR MARKET';
  let topHeadingColor = '#F59E0B';
  let tagline = 'RAAT KO HISAAB-KITAAB';
  let tagColor = '#FDE047';
  let activeImage = 'night_bazaar.jpg';
  let cutProgress = 0;
  let showYashAvatar = false;
  let eyebrow: EyebrowState = 'neutral';

  if (frame < 90) {
    // Cut 1: 0 - 3.0s
    topHeading = '📍 BASTAR • JAGDALPUR MARKET';
    topHeadingColor = '#F59E0B';
    tagline = 'RAAT KO HISAAB-KITAAB';
    tagColor = '#FDE047';
    activeImage = 'night_bazaar.jpg';
    cutProgress = frame / 90;
  } else if (frame < 180) {
    // Cut 2: 3.0s - 6.0s
    topHeading = '🏪 RAMESH BHAIYA KI DUKAN';
    topHeadingColor = '#F59E0B';
    tagline = 'KAMAI KA HISAAB';
    tagColor = '#FDE047';
    activeImage = 'ramesh_bhaiya_counter.jpg';
    cutProgress = (frame - 90) / 90;
  } else if (frame < 312) {
    // Cut 3: 6.0s - 10.4s
    topHeading = '⚠️ CHINTA KI BAAT';
    topHeadingColor = '#EF4444';
    tagline = 'ROZ 10 GRAHAK GAYAB!';
    tagColor = '#EF4444';
    activeImage = 'kirana_authentic.jpg';
    cutProgress = (frame - 180) / 132;
  } else if (frame < 430) {
    // Cut 4: 10.4s - 14.3s
    topHeading = '🤔 GRAHAK KAHAN GAYE?';
    topHeadingColor = '#38BDF8';
    tagline = 'DUKAN AANA CHHOD DIYA?';
    tagColor = '#38BDF8';
    activeImage = 'spice_store.jpg';
    cutProgress = (frame - 312) / 118;
  } else if (frame < 530) {
    // Cut 5: 14.3s - 17.7s
    topHeading = '📱 MOBILE SE ORDER KA TREND';
    topHeadingColor = '#38BDF8';
    tagline = 'GHAR BAITHE AASAN ORDER';
    tagColor = '#FDE047';
    activeImage = 'commission_trap.jpg';
    cutProgress = (frame - 430) / 100;
  } else if (frame < 705) {
    // Cut 6: 17.7s - 23.5s
    topHeading = '❌ 20% - 30% COMMISSION CUT';
    topHeadingColor = '#EF4444';
    tagline = '₹15,000 / MAHINA KA NUKSAAN!';
    tagColor = '#EF4444';
    activeImage = 'commission_trap.jpg';
    cutProgress = (frame - 530) / 175;
  } else if (frame < 870) {
    // Cut 7: 23.5s - 29.0s
    topHeading = '💡 THE SMART DISCOVERY';
    topHeadingColor = '#10B981';
    tagline = 'shop.lifesolvenow.com';
    tagColor = '#34D399';
    activeImage = 'digital_growth.jpg';
    cutProgress = (frame - 705) / 165;
  } else if (frame < 1048) {
    // Cut 8: 29.0s - 34.9s
    topHeading = '⚡ 0% COMMISSION REVOLUTION';
    topHeadingColor = '#10B981';
    tagline = 'WHATSAPP DIRECT ORDER';
    tagColor = '#FDE047';
    activeImage = 'digital_growth.jpg';
    cutProgress = (frame - 870) / 178;
  } else if (frame < 1200) {
    // Cut 9: 34.9s - 40.0s
    topHeading = '🎉 NATIJA: BHEED WAPAS!';
    topHeadingColor = '#F59E0B';
    tagline = 'DUKAN PHIR SE HOUSEFULL!';
    tagColor = '#FDE047';
    activeImage = 'market_crowd.jpg';
    cutProgress = (frame - 1048) / 152;
  } else if (frame < 1369) {
    // Cut 10: 40.0s - 45.6s
    topHeading = '💰 100% PROFIT AAPKI JEB MEIN';
    topHeadingColor = '#10B981';
    tagline = 'NO MIDDLEMAN • DIRECT PAYMENT';
    tagColor = '#34D399';
    activeImage = 'shop_customer_interaction.jpg';
    cutProgress = (frame - 1200) / 169;
  } else if (frame < 1570) {
    // Cut 11: 45.6s - 52.3s
    showYashAvatar = true;
    eyebrow = 'raised';
    topHeading = '👑 NAMASTE BASTAR';
    topHeadingColor = '#38BDF8';
    tagline = 'MAIN HU YASH';
    tagColor = '#FDE047';
    activeImage = 'night_bazaar.jpg';
    cutProgress = (frame - 1369) / 201;
  } else {
    // Cut 12: 52.3s - 59.7s
    showYashAvatar = true;
    eyebrow = 'raised';
    topHeading = '🚀 APNI DUKAN DIGITAL BANAO';
    topHeadingColor = '#10B981';
    tagline = 'VISIT shop.lifesolvenow.com';
    tagColor = '#34D399';
    activeImage = 'bastar_market.jpg';
    cutProgress = (frame - 1570) / 222;
  }

  // Smooth cinematic Ken-Burns motion per cut
  const zoomScale = interpolate(cutProgress, [0, 1], [1.02, 1.14]);
  const panY = interpolate(cutProgress, [0, 1], [0, -28]);

  const imageSource = (assets as Record<string, string>)[activeImage] || (assets as Record<string, string>)['ramesh_bhaiya_counter.jpg'];

  const avatarSpring = showYashAvatar ? spring({ frame: frame - 1369, fps, config: { damping: 14, stiffness: 100 } }) : 0;

  // Pop-in for interactive UI cards
  const isScene6 = frame >= 530 && frame < 705;
  const commCardSpring = isScene6 ? spring({ frame: frame - 540, fps, config: { damping: 12, stiffness: 120 } }) : 0;

  const isScene8 = frame >= 870 && frame < 1048;
  const waBubbleSpring = isScene8 ? spring({ frame: frame - 880, fps, config: { damping: 12, stiffness: 120 } }) : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#0A0F1D',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 1. REALISTIC FULL-SCREEN VISUAL (With Smooth Cinematic Ken-Burns) */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          left: -30,
          width: 1140,
          height: 1980,
          transform: `scale(${zoomScale}) translateY(${panY}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {imageSource && (
          <img
            src={imageSource}
            alt="Authentic Scene"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: showYashAvatar ? 'brightness(0.5) blur(10px)' : 'brightness(0.95)',
            }}
          />
        )}
      </div>

      {/* 2. SUBTLE CINEMATIC GRADIENTS (Protects Text Readability) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 320,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 440,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. TOP BRAND & DYNAMIC CONTEXT PILL (Content Kahuna Broadcast Style) */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: 50,
          right: 50,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Top Brand Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(12px)',
            padding: '10px 22px',
            borderRadius: 24,
            border: '1.5px solid rgba(255,255,255,0.2)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ color: '#FACC15', fontWeight: 900, fontSize: 22, letterSpacing: 0.5 }}>shop</span>
          <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 22 }}>LifeSolveNow</span>
        </div>

        {/* Dynamic Context Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(16px)',
            border: `2.5px solid ${topHeadingColor}`,
            padding: '10px 28px',
            borderRadius: 28,
            boxShadow: `0 6px 24px rgba(0,0,0,0.7), 0 0 18px ${topHeadingColor}44`,
          }}
        >
          <span
            style={{
              color: topHeadingColor,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {topHeading}
          </span>
        </div>
      </div>

      {/* 4. HIGH-IMPACT SCENE CARDS (Only on relevant scenes) */}

      {/* Scene 6: Commission Trap Alert Card */}
      {isScene6 && (
        <div
          style={{
            position: 'absolute',
            top: 480,
            left: '50%',
            transform: `translateX(-50%) scale(${commCardSpring})`,
            width: 920,
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            border: '3px solid #EF4444',
            padding: '38px 46px',
            boxShadow: '0 24px 60px rgba(239, 68, 68, 0.4)',
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ color: '#EF4444', fontWeight: 900, fontSize: 34, letterSpacing: 1 }}>❌ BADI DELIVERY APPS</span>
            <span style={{ backgroundColor: '#EF4444', color: '#FFFFFF', padding: '6px 16px', borderRadius: 12, fontWeight: 900, fontSize: 20 }}>-25% CUT</span>
          </div>
          <div style={{ color: '#F87171', fontSize: 28, lineHeight: 1.6, marginBottom: 24, fontWeight: 600 }}>
            • 20% se 30% Har Order Par Commission<br />
            • Mahine Ki Kamai Mein Se <strong style={{ color: '#FFFFFF', textDecoration: 'underline' }}>₹15,000 Kat Gaya</strong><br />
            • Customer Data Unka, Dukandar Khali Haath!
          </div>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '16px 24px', borderRadius: 18, borderLeft: '6px solid #EF4444' }}>
            <span style={{ color: '#FCA5A5', fontSize: 24, fontWeight: 800 }}>⚠️ SALANA NUKSAAN: ₹1,80,000 SE ZYADA!</span>
          </div>
        </div>
      )}

      {/* Scene 8: WhatsApp Direct Order Card */}
      {isScene8 && (
        <div
          style={{
            position: 'absolute',
            top: 420,
            left: '50%',
            transform: `translateX(-50%) scale(${waBubbleSpring})`,
            width: 920,
            backgroundColor: 'rgba(7, 94, 84, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            border: '3px solid #25D366',
            padding: '34px 40px',
            boxShadow: '0 24px 60px rgba(37, 211, 102, 0.4)',
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff', fontWeight: 900 }}>💬</div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 28 }}>Bastar Direct WhatsApp Order</div>
              <div style={{ color: '#A7F3D0', fontSize: 20 }}>shop.lifesolvenow.com</div>
            </div>
          </div>
          <div style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '18px 24px', borderRadius: '18px 18px 18px 4px', marginBottom: 18, maxWidth: '85%' }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: '#075E54', marginBottom: 6 }}>Grahak (Jagdalpur):</div>
            <div style={{ fontSize: 22, lineHeight: 1.4 }}>Bhaiya 5kg Aashirvaad Aata aur 1L Tel ready rakhna, mai 10 min mein aa raha hu! 🙏</div>
          </div>
          <div style={{ backgroundColor: '#DCF8C6', color: '#111827', padding: '18px 24px', borderRadius: '18px 18px 4px 18px', marginLeft: 'auto', maxWidth: '85%', marginBottom: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: '#059669', marginBottom: 6 }}>Ramesh Bhaiya:</div>
            <div style={{ fontSize: 22, lineHeight: 1.4 }}>Pack kar diya hai! Total: ₹680. <strong>0% Extra Commission Fee! ✅</strong></div>
          </div>
          <div style={{ backgroundColor: '#10B981', padding: '14px 20px', borderRadius: 20, textAlign: 'center', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)' }}>
            <span style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>⚡ 0% SALES COMMISSION • 100% PROFIT AAPKA</span>
          </div>
        </div>
      )}

      {/* 5. YASH (ALEX CHARACTER) TALKING AVATAR (Final 14 seconds) */}
      {showYashAvatar && (
        <div
          style={{
            position: 'absolute',
            bottom: 250,
            left: '50%',
            transform: `translateX(-50%) scale(${avatarSpring * 1.45})`,
            zIndex: 35,
            pointerEvents: 'none',
          }}
        >
          <AlexCharacter
            mouth={mouth}
            eyes={eyes}
            eyebrows={eyebrow}
            headY={headY}
            headRot={headRot}
            scale={1.45}
          />
        </div>
      )}

      {/* 6. MINIMAL, ULTRA-PUNCHY TAGLINE PILL (NO LONG SUBTITLE BOXES) */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 45,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(16px)',
            padding: '16px 42px',
            borderRadius: 36,
            border: `2.5px solid ${tagColor}`,
            boxShadow: `0 12px 40px rgba(0, 0, 0, 0.9), 0 0 25px ${tagColor}44`,
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              color: tagColor,
              fontSize: 38,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: 'uppercase',
              textShadow: `0 0 20px ${tagColor}66`,
            }}
          >
            {tagline}
          </span>
        </div>
      </div>

      {/* 7. BOTTOM ACTION BANNER: WEBSITE URL & CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 35,
          left: 50,
          right: 50,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(15, 23, 42, 0.96)',
          backdropFilter: 'blur(20px)',
          padding: '16px 36px',
          borderRadius: 30,
          border: '2px solid rgba(16, 185, 129, 0.6)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 24px rgba(16, 185, 129, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            🛍️
          </div>
          <div>
            <div style={{ color: '#A7F3D0', fontSize: 16, fontWeight: 700, letterSpacing: 1 }}>FREE MARKETPLACE:</div>
            <div style={{ color: '#FFFFFF', fontSize: 30, fontWeight: 900, letterSpacing: 0.5 }}>shop.lifesolvenow.com</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#10B981',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: 24,
            fontWeight: 900,
            fontSize: 22,
            boxShadow: '0 4px 15px rgba(16, 185, 129, 0.5)',
            letterSpacing: 0.5,
          }}
        >
          Follow @Yash 🚀
        </div>
      </div>
    </div>
  );
};
