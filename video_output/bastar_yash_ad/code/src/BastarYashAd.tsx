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

  // ==========================================
  // SCENE PROGRESSION (Exact Audio Timing)
  // Scene 1: 0 - 312 (~0s - 10.4s) -> Ramesh Bhaiya Jagdalpur Market
  // Scene 2: 312 - 530 (~10.4s - 17.7s) -> Grahak Kahan Gaye? Mobile Ordering
  // Scene 3: 530 - 705 (~17.7s - 23.5s) -> Badi Apps 20-30% Commission Trap
  // Scene 4: 705 - 1048 (~23.5s - 34.9s) -> shop.lifesolvenow.com 0% Commission & WhatsApp
  // Scene 5: 1048 - 1369 (~34.9s - 45.6s) -> Dukan Housefull & 100% Munafa
  // Scene 6: 1369 - 1792 (~45.6s - 59.7s) -> Yash Persona Intro & Follow CTA
  // ==========================================

  let topBadgeText = 'BASTAR MARKET • JAGDALPUR';
  let topBadgeColor = '#F59E0B';
  let topBadgeBg = 'rgba(15, 23, 42, 0.9)';
  let activeImageKey = 'ramesh_bhaiya_counter.jpg';
  let sceneProgress = 0;
  let showYashAvatar = false;
  let eyebrow: EyebrowState = 'neutral';

  // Subtitle pieces
  let subPrefix = '';
  let subHighlight = '';
  let subHighlightColor = '#FDE047';
  let subSuffix = '';

  if (frame < 160) {
    // 0 - 5.34s
    topBadgeText = '📍 BASTAR MARKET • JAGDALPUR';
    topBadgeColor = '#F59E0B';
    activeImageKey = 'ramesh_bhaiya_counter.jpg';
    sceneProgress = frame / 160;
    subPrefix = 'Bastar ke ';
    subHighlight = 'JAGDALPUR MARKET';
    subHighlightColor = '#FDE047';
    subSuffix = ' mein Ramesh bhaiya raat ko hisaab jod rahe the...';
  } else if (frame < 312) {
    // 5.34s - 10.39s
    topBadgeText = '⚠️ ROZ 10 GRAHAK GAYAB';
    topBadgeColor = '#EF4444';
    activeImageKey = 'ramesh_bhaiya_counter.jpg';
    sceneProgress = (frame - 160) / 152;
    subPrefix = 'Par pichle 2 mahine mein, ';
    subHighlight = 'ROZ 10 GRAHAK';
    subHighlightColor = '#EF4444';
    subSuffix = ' achanak gayab ho rahe the!';
  } else if (frame < 415) {
    // 10.39s - 13.77s
    topBadgeText = '🤔 GRAHAK KAHAN GAYE?';
    topBadgeColor = '#38BDF8';
    activeImageKey = 'kirana_authentic.jpg';
    sceneProgress = (frame - 312) / 103;
    subPrefix = 'Grahak ';
    subHighlight = 'DUKAN AANA';
    subHighlightColor = '#FDE047';
    subSuffix = ' chhod nahi rahe the...';
  } else if (frame < 530) {
    // 13.77s - 17.66s
    topBadgeText = '📱 MOBILE SE ORDER KA CRAZE';
    topBadgeColor = '#38BDF8';
    activeImageKey = 'kirana_authentic.jpg';
    sceneProgress = (frame - 415) / 115;
    subPrefix = 'Wo bas ';
    subHighlight = 'MOBILE SE AASAN ORDER';
    subHighlightColor = '#38BDF8';
    subSuffix = ' dhoondh rahe the!';
  } else if (frame < 705) {
    // 17.66s - 23.50s
    topBadgeText = '❌ 20% - 30% COMMISSION TRAP';
    topBadgeColor = '#EF4444';
    activeImageKey = 'commission_trap.jpg';
    sceneProgress = (frame - 530) / 175;
    subPrefix = 'Badi apps par dukan daalna matlab ';
    subHighlight = '20% SE 30% COMMISSION';
    subHighlightColor = '#EF4444';
    subSuffix = ' ka nuksaan!';
  } else if (frame < 870) {
    // 23.50s - 29.0s
    topBadgeText = '💡 THE SMART DISCOVERY';
    topBadgeColor = '#10B981';
    activeImageKey = 'digital_growth.jpg';
    sceneProgress = (frame - 705) / 165;
    subPrefix = 'Tab unhe pata chala ';
    subHighlight = 'shop.lifesolvenow.com';
    subHighlightColor = '#34D399';
    subSuffix = ' ke baare mein!';
  } else if (frame < 1048) {
    // 29.0s - 34.94s
    topBadgeText = '✅ 0% COMMISSION REVOLUTION';
    topBadgeColor = '#10B981';
    activeImageKey = 'digital_growth.jpg';
    sceneProgress = (frame - 870) / 178;
    subPrefix = 'ZERO COMMISSION, 2 minute mein ';
    subHighlight = 'DUKAN ONLINE';
    subHighlightColor = '#FDE047';
    subSuffix = ' aur order WhatsApp par!';
  } else if (frame < 1200) {
    // 34.94s - 40.0s
    topBadgeText = '🎉 NATIJA? GRAHAK WAPAS!';
    topBadgeColor = '#F59E0B';
    activeImageKey = 'shop_customer_interaction.jpg';
    sceneProgress = (frame - 1048) / 152;
    subPrefix = 'Natija? ';
    subHighlight = 'WAHI PURANE GRAHAK WAPAS!';
    subHighlightColor = '#FDE047';
    subSuffix = ' Dukan par fir se bheed!';
  } else if (frame < 1369) {
    // 40.0s - 45.64s
    topBadgeText = '💰 100% MUNAFA AAPKA';
    topBadgeColor = '#10B981';
    activeImageKey = 'shop_customer_interaction.jpg';
    sceneProgress = (frame - 1200) / 169;
    subPrefix = 'Order mobile se, payment counter par, aur ';
    subHighlight = '100% MUNAFA';
    subHighlightColor = '#34D399';
    subSuffix = ' Ramesh bhaiya ki jeb mein!';
  } else {
    // 45.64s - 59.71s (Yash Persona Outro & CTA)
    showYashAvatar = true;
    eyebrow = 'raised';
    topBadgeText = '👑 YASH • BASTAR DIGITAL MISSION';
    topBadgeColor = '#38BDF8';
    activeImageKey = 'bastar_market.jpg';
    sceneProgress = (frame - 1369) / 423;

    if (frame < 1448) {
      subPrefix = 'Namaste Bastar, ';
      subHighlight = 'MAIN HU YASH!';
      subHighlightColor = '#FDE047';
      subSuffix = ' Main leke aaya hu aisi suvidha...';
    } else if (frame < 1570) {
      subPrefix = 'Apni dukan ko ';
      subHighlight = 'DIGITAL BANAO';
      subHighlightColor = '#38BDF8';
      subSuffix = ' bina kisi commission ke!';
    } else {
      subPrefix = 'Aaj hi visit karo ';
      subHighlight = 'shop.lifesolvenow.com';
      subHighlightColor = '#34D399';
      subSuffix = ' aur nayi suvidhaon ke liye follow kar lo!';
    }
  }

  // Smooth Ken-Burns Zoom/Pan per scene
  const zoomScale = interpolate(sceneProgress, [0, 1], [1.02, 1.12]);
  const panY = interpolate(sceneProgress, [0, 1], [0, -30]);

  // Image source resolution
  const imageSource = (assets as Record<string, string>)[activeImageKey] || (assets as Record<string, string>)['bastar_market.jpg'];

  // Avatar pop-in animation
  const avatarScale = showYashAvatar ? spring({ frame: frame - 1369, fps, config: { damping: 14, stiffness: 100 } }) : 0;

  // WhatsApp chat bubble pop-in (active during Scene 4: 705 - 1048)
  const isScene4 = frame >= 705 && frame < 1048;
  const waBubbleProgress = isScene4 ? spring({ frame: frame - 720, fps, config: { damping: 12, stiffness: 120 } }) : 0;

  // Commission warning card pop-in (active during Scene 3: 530 - 705)
  const isScene3 = frame >= 530 && frame < 705;
  const commCardProgress = isScene3 ? spring({ frame: frame - 540, fps, config: { damping: 12, stiffness: 120 } }) : 0;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: 'relative',
        backgroundColor: '#0F172A',
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* 1. BACKGROUND SCENE (Ken-Burns Animated) */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 1160,
          height: 2000,
          transform: `scale(${zoomScale}) translateY(${panY}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {imageSource && (
          <img
            src={imageSource}
            alt="Scene Background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: showYashAvatar ? 'brightness(0.55) blur(12px)' : 'brightness(0.92)',
            }}
          />
        )}
      </div>

      {/* 2. GRADIENT VIGNETTES (For Crisp Readability of Badges & Subtitles) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 380,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 600,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* 3. CONTENT KAHUNA STYLE: TOP DYNAMIC PILL BADGE & LOGO */}
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
        {/* Brand Logo Pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(0,0,0,0.75)',
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

        {/* Dynamic Context Pill Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            backgroundColor: topBadgeBg,
            backdropFilter: 'blur(16px)',
            border: `2px solid ${topBadgeColor}`,
            padding: '10px 26px',
            borderRadius: 26,
            boxShadow: `0 6px 24px rgba(0,0,0,0.6), 0 0 16px ${topBadgeColor}44`,
          }}
        >
          <span
            style={{
              color: topBadgeColor,
              fontSize: 22,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
            }}
          >
            {topBadgeText}
          </span>
        </div>
      </div>

      {/* 4. DYNAMIC SCENE OVERLAYS (Floating High-Engagement UI Cards) */}

      {/* Scene 3: Commission Trap Warning Card */}
      {isScene3 && (
        <div
          style={{
            position: 'absolute',
            top: 420,
            left: '50%',
            transform: `translateX(-50%) scale(${commCardProgress})`,
            width: 920,
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            border: '3px solid #EF4444',
            padding: '36px 44px',
            boxShadow: '0 20px 60px rgba(239, 68, 68, 0.35)',
            zIndex: 30,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ color: '#EF4444', fontWeight: 900, fontSize: 32, letterSpacing: 1 }}>❌ BADI DELIVERY APPS</span>
            <span style={{ backgroundColor: '#EF4444', color: '#FFFFFF', padding: '6px 16px', borderRadius: 12, fontWeight: 900, fontSize: 20 }}>-25% CUT</span>
          </div>
          <div style={{ color: '#F87171', fontSize: 26, lineHeight: 1.6, marginBottom: 24 }}>
            • 20% se 30% Har Order Par Commission<br />
            • Mahine Ki Kamai Mein Se <strong style={{ color: '#FFFFFF', textDecoration: 'underline' }}>₹15,000 Kat Gaya</strong><br />
            • Customer Data Unka, Dukandar Khali Haath!
          </div>
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', padding: '16px 24px', borderRadius: 18, borderLeft: '6px solid #EF4444' }}>
            <span style={{ color: '#FCA5A5', fontSize: 24, fontWeight: 700 }}>⚠️ SALANA NUKSAAN: ₹1,80,000 SE ZYADA!</span>
          </div>
        </div>
      )}

      {/* Scene 4: WhatsApp Direct Order Solution Card */}
      {isScene4 && (
        <div
          style={{
            position: 'absolute',
            top: 360,
            left: '50%',
            transform: `translateX(-50%) scale(${waBubbleProgress})`,
            width: 920,
            backgroundColor: 'rgba(7, 94, 84, 0.94)',
            backdropFilter: 'blur(20px)',
            borderRadius: 36,
            border: '3px solid #25D366',
            padding: '32px 38px',
            boxShadow: '0 20px 60px rgba(37, 211, 102, 0.35)',
            zIndex: 30,
          }}
        >
          {/* WhatsApp Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: 16 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, color: '#fff', fontWeight: 900 }}>💬</div>
            <div>
              <div style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 28 }}>Bastar Direct WhatsApp Order</div>
              <div style={{ color: '#A7F3D0', fontSize: 20 }}>Powered by shop.lifesolvenow.com</div>
            </div>
          </div>

          {/* Incoming Customer Message */}
          <div style={{ backgroundColor: '#FFFFFF', color: '#111827', padding: '18px 24px', borderRadius: '18px 18px 18px 4px', marginBottom: 18, maxWidth: '85%' }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: '#075E54', marginBottom: 6 }}>Grahak (Jagdalpur):</div>
            <div style={{ fontSize: 22, lineHeight: 1.4 }}>Bhaiya 5kg Aashirvaad Aata aur 1L Tel ready rakhna, mai 10 min mein aa raha hu! 🙏</div>
          </div>

          {/* Outgoing Shopkeeper Message */}
          <div style={{ backgroundColor: '#DCF8C6', color: '#111827', padding: '18px 24px', borderRadius: '18px 18px 4px 18px', marginLeft: 'auto', maxWidth: '85%', marginBottom: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 24, color: '#059669', marginBottom: 6 }}>Ramesh Bhaiya:</div>
            <div style={{ fontSize: 22, lineHeight: 1.4 }}>Pack kar diya hai! Total: ₹680. <strong>0% Extra Commission Fee! ✅</strong></div>
          </div>

          {/* 0% Commission Badge */}
          <div style={{ backgroundColor: '#10B981', padding: '14px 20px', borderRadius: 20, textAlign: 'center', boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)' }}>
            <span style={{ color: '#FFFFFF', fontSize: 26, fontWeight: 900, letterSpacing: 1 }}>⚡ 0% SALES COMMISSION • 100% PROFIT AAPKA</span>
          </div>
        </div>
      )}

      {/* 5. SCENE 6: YASH (ALEX CHARACTER) TALKING AVATAR */}
      {showYashAvatar && (
        <div
          style={{
            position: 'absolute',
            bottom: 250,
            left: '50%',
            transform: `translateX(-50%) scale(${avatarScale * 1.45})`,
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

      {/* 6. CONTENT KAHUNA STYLE KINETIC SUBTITLES */}
      <div
        style={{
          position: 'absolute',
          bottom: showYashAvatar ? 160 : 180,
          left: 50,
          right: 50,
          zIndex: 45,
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(12px)',
            padding: '16px 36px',
            borderRadius: 24,
            border: '2px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.9)',
          }}
        >
          <span
            style={{
              fontSize: 42,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.35,
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            {subPrefix}
            <span
              style={{
                color: subHighlightColor,
                fontWeight: 900,
                fontSize: 46,
                textTransform: 'uppercase',
                textShadow: `0 0 25px ${subHighlightColor}88`,
                padding: '0 6px',
              }}
            >
              {subHighlight}
            </span>
            {subSuffix}
          </span>
        </div>
      </div>

      {/* 7. BOTTOM ACTION BANNER: WEBSITE URL & CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 50,
          right: 50,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(20px)',
          padding: '18px 36px',
          borderRadius: 30,
          border: '2px solid rgba(16, 185, 129, 0.6)',
          boxShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(16, 185, 129, 0.3)',
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
            <div style={{ color: '#A7F3D0', fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>VISIT FREE MARKETPLACE:</div>
            <div style={{ color: '#FFFFFF', fontSize: 32, fontWeight: 900, letterSpacing: 0.5 }}>shop.lifesolvenow.com</div>
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
