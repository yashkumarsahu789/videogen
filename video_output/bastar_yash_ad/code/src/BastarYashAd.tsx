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

  // Scene timing configuration across 2296 frames (~76.5 seconds)
  let sceneIndex = 1;
  let sceneBadge = '🌟 NAMASTE BASTAR • DUKANDAAR SPECIAL';
  let eyebrow: EyebrowState = 'neutral';
  let subtitleText = '';
  let highlightWord = '';
  let accentColor = '#FBBF24';
  let bgImageKey = 'bastar_market.jpg';
  let sceneStartFrame = 0;
  let sceneEndFrame = 320;
  let topicPill = '📍 BASTAR LOCAL MARKET';

  if (frame < 320) {
    // Scene 1: Personal Intro & Bastar Hook (0 - 10.6s)
    sceneIndex = 1;
    sceneBadge = '🌟 NAMASTE BASTAR • YASH';
    topicPill = '📍 BASTAR LOCAL MARKET';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgImageKey = 'bastar_market.jpg';
    sceneStartFrame = 0;
    sceneEndFrame = 320;
    subtitleText = 'नमस्ते बस्तर! मेरा नाम यश है... और मैं लेकर आ गया हूँ बस्तर के दुकानदारों के लिए एक ज़बरदस्त वेबसाइट!';
    highlightWord = 'नमस्ते बस्तर • Yash';
  } else if (frame < 640) {
    // Scene 2: Follow & The 30% Commission Problem (10.6 - 21.3s)
    sceneIndex = 2;
    sceneBadge = '🚫 30% COMMISSION TRAP BAND';
    topicPill = '💸 30% COMMISSION KA JHANJHAT';
    eyebrow = 'curious';
    accentColor = '#EF4444';
    bgImageKey = 'commission_trap.jpg';
    sceneStartFrame = 320;
    sceneEndFrame = 640;
    subtitleText = 'तो सबसे पहले मुझे फ़ॉलो कर लो! क्योंकि अब दुकान ऑनलाइन ले जाने के लिए 30% कमीशन देने की बिल्कुल ज़रूरत नहीं है।';
    highlightWord = 'Follow Karo • 0% Commission';
  } else if (frame < 1100) {
    // Scene 3: Kirana Counter QR & WhatsApp Cart (21.3 - 36.6s)
    sceneIndex = 3;
    sceneBadge = '🛒 COUNTER QR + WHATSAPP CART';
    topicPill = '🏬 KIRANA DUKAN COUNTER QR';
    eyebrow = 'neutral';
    accentColor = '#10B981';
    bgImageKey = 'kirana_store.jpg';
    sceneStartFrame = 640;
    sceneEndFrame = 1100;
    subtitleText = 'वेबसाइट है shop.lifesolvenow.com! किराना दुकान पर QR लगाओ और डायरेक्ट WhatsApp पर आर्डर पाओ!';
    highlightWord = '1-Click WhatsApp Order & QR';
  } else if (frame < 1550) {
    // Scene 4: Repair Shops Digital Job Sheet (36.6 - 51.6s)
    sceneIndex = 4;
    sceneBadge = '📱 DIGITAL JOB SHEET & WARRANTY';
    topicPill = '🔧 MOBILE & APPLIANCE REPAIR';
    eyebrow = 'neutral';
    accentColor = '#38BDF8';
    bgImageKey = 'repair_shop.jpg';
    sceneStartFrame = 1100;
    sceneEndFrame = 1550;
    subtitleText = 'रिपेयर वाले पुराना रजिस्टर छोड़ो! ग्राहक को दो डिजिटल जॉब शीट, लाइव स्टेटस और WhatsApp वारंटी!';
    highlightWord = 'Digital Job Sheet #1042';
  } else if (frame < 1920) {
    // Scene 5: Restaurant Table QR & Live Kitchen KOT (51.6 - 64s)
    sceneIndex = 5;
    sceneBadge = '🍽️ TABLE QR & KITCHEN ORDERS';
    topicPill = '☕ CAFE & RESTAURANT TABLE QR';
    eyebrow = 'raised';
    accentColor = '#F97316';
    bgImageKey = 'restaurant_cafe.jpg';
    sceneStartFrame = 1550;
    sceneEndFrame = 1920;
    subtitleText = 'रेस्टोरेंट के लिए टेबल पर स्मार्ट QR और लाइव किचन स्क्रीन! और सबसे बड़ी बात — Zero Percent Commission!';
    highlightWord = 'Table QR & Live Kitchen';
  } else {
    // Scene 6: Bastar Call to Action (64 - 76.5s)
    sceneIndex = 6;
    sceneBadge = '🚀 BASTAR DIGITAL BANAO • FREE TRIAL';
    topicPill = '✨ SHOP.LIFESOLVENOW.COM';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgImageKey = 'digital_growth.jpg';
    sceneStartFrame = 1920;
    sceneEndFrame = 2296;
    subtitleText = 'अभी जाओ shop.lifesolvenow.com पर, Free Trial क्लेम करो, और अपने बस्तर के बिज़नेस को डिजिटल बनाओ!';
    highlightWord = 'shop.lifesolvenow.com';
  }

  // Floating Pulse Animation
  const pulse = Math.sin(frame * 0.12) * 5;

  // Cinematic Ken Burns Zoom for Background Image
  const sceneProgress = interpolate(
    frame,
    [sceneStartFrame, sceneEndFrame],
    [1, 1.08],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const bgImageUri = (assets as Record<string, string>)[bgImageKey] || '';

  return (
    <div
      style={{
        flex: 1,
        width: 1080,
        height: 1920,
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 🖼️ BACKGROUND IMAGE LAYER WITH CINEMATIC ZOOM */}
      {bgImageUri && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <img
            src={bgImageUri}
            alt="Scene background"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${sceneProgress})`,
              transition: 'transform 0.1s ease-out',
              filter: 'brightness(0.42) saturate(1.25) contrast(1.1)',
            }}
          />
          {/* Cinematic Vignette Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.45) 45%, rgba(15, 23, 42, 0.94) 100%)',
            }}
          />
        </div>
      )}

      {/* Background Animated Subtle Tech Grid */}
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
          zIndex: 2,
        }}
      />

      {/* TOP HEADER: Badge & Current Discussion Topic */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          zIndex: 10,
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            padding: '10px 28px',
            borderRadius: 999,
            border: `1.5px solid ${accentColor}88`,
            boxShadow: `0 4px 24px ${accentColor}44`,
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

        {/* Current Topic Pill in Background */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            padding: '6px 20px',
            borderRadius: 999,
            fontSize: 16,
            color: '#E2E8F0',
            fontWeight: 700,
            letterSpacing: '0.06em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>{topicPill}</span>
          <span>•</span>
          <span style={{ color: '#38BDF8' }}>LIVE TOPIC</span>
        </div>
      </div>

      {/* CENTER STAGE: CHARACTER (Yash / Alex) & CONTEXTUAL VISUAL CARDS */}
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
        {/* CHARACTER PUPPET: Yash (Alex Character) */}
        <div
          style={{
            position: 'relative',
            transform: `translateY(${pulse}px)`,
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
          }}
        >
          <AlexCharacter
            mouthState={mouth}
            eyeState={eyes}
            eyebrowState={eyebrow}
            headY={headY}
            headRot={headRot}
            width={600}
            height={600}
          />
        </div>

        {/* SCENE 1: Namaste Bastar & Follow Card */}
        {sceneIndex === 1 && (
          <div
            style={{
              position: 'absolute',
              top: '55%',
              width: 640,
              background: 'rgba(15, 23, 42, 0.92)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #FBBF24',
              borderRadius: 26,
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 24px 60px rgba(251, 191, 36, 0.35)',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 900, color: '#FCD34D', textAlign: 'center' }}>
              🙏 नमस्ते बस्तर!
            </div>
            <div style={{ fontSize: 20, color: '#FFFFFF', textAlign: 'center', fontWeight: 700 }}>
              बस्तर के सभी दुकानदार भाइयों के लिए बड़ी खुशखबरी!
            </div>
            <div
              style={{
                background: '#F59E0B',
                color: '#000000',
                padding: '8px 24px',
                borderRadius: 99,
                fontSize: 17,
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.4)',
              }}
            >
              <span>🔔</span> Follow @Yash for Business Growth
            </div>
          </div>
        )}

        {/* SCENE 2: Follow Me & 30% Commission Trap Band */}
        {sceneIndex === 2 && (
          <div
            style={{
              position: 'absolute',
              top: '54%',
              width: 640,
              background: 'rgba(69, 10, 10, 0.94)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #EF4444',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 24px 60px rgba(239, 68, 68, 0.4)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 36 }}>❌</span>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FCA5A5' }}>
                Apps Ko 25-30% Commission Dena Band!
              </div>
            </div>
            <div
              style={{
                background: 'rgba(0,0,0,0.5)',
                padding: '12px 18px',
                borderRadius: 14,
                fontSize: 17,
                fontWeight: 700,
                color: '#FCD34D',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              🔔 Follow kar lo — Saari digital suvidhayein ab free aur aasan!
            </div>
          </div>
        )}

        {/* SCENE 3: Kirana Counter QR & 1-Click WhatsApp Order */}
        {sceneIndex === 3 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              width: 650,
              background: 'rgba(6, 78, 59, 0.94)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #10B981',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 24px 60px rgba(16, 185, 129, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#A7F3D0' }}>
                🏬 Kirana Counter QR Standee
              </span>
              <span style={{ background: '#047857', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                0% Cut
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 32 }}>📲</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
                  Grahak Ne QR Scan Kiya
                </div>
                <div style={{ fontSize: 15, color: '#D1FAE5', marginTop: 2 }}>
                  Direct WhatsApp Order: 5kg Chawal, 2L Tel (Bina app install kiye)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 4: Repair Digital Job Sheet & Warranty */}
        {sceneIndex === 4 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              width: 650,
              background: 'rgba(15, 23, 42, 0.94)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #38BDF8',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 24px 60px rgba(56, 189, 248, 0.35)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#7DD3FC' }}>
                📱 Mobile / TV Repair Job #1042
              </span>
              <span style={{ background: '#0369A1', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                No Register!
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
              💬 WhatsApp Pickup Msg & 6 Months Digital Warranty
            </div>
          </div>
        )}

        {/* SCENE 5: Restaurant Table QR & 0% Commission */}
        {sceneIndex === 5 && (
          <div
            style={{
              position: 'absolute',
              top: '52%',
              width: 650,
              background: 'rgba(67, 20, 7, 0.94)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #F97316',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 24px 60px rgba(249, 115, 22, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 20, fontWeight: 900, color: '#FED7AA' }}>
                🍽️ Table QR & Live Kitchen Orders
              </span>
              <span style={{ background: '#C2410C', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                Zero Commission
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ fontSize: 32 }}>🍳</span>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#FFFFFF' }}>
                  Dine-In Customer Scanned Table 3
                </div>
                <div style={{ fontSize: 15, color: '#FFEDD5', marginTop: 2 }}>
                  Kitchen Screen Par Live Order: Chai, Samosa, Chowmein!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 6: Grand Bastar Call to Action */}
        {sceneIndex === 6 && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              width: 660,
              background: 'rgba(30, 27, 75, 0.94)',
              backdropFilter: 'blur(20px)',
              border: '2px solid #FBBF24',
              borderRadius: 26,
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 24px 60px rgba(251, 191, 36, 0.4)',
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
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ 0% Sales Commission
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ Made for Bastar
              </span>
              <span style={{ background: 'rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
                ✓ Free Starter Plan
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
            background: `${accentColor}25`,
            backdropFilter: 'blur(12px)',
            border: `1.5px solid ${accentColor}`,
            padding: '8px 24px',
            borderRadius: 999,
            fontSize: 22,
            fontWeight: 800,
            color: accentColor,
            textAlign: 'center',
            boxShadow: `0 4px 20px ${accentColor}44`,
          }}
        >
          {highlightWord}
        </div>

        {/* Dynamic Subtitle Box */}
        <div
          style={{
            width: '100%',
            background: 'rgba(15, 23, 42, 0.88)',
            backdropFilter: 'blur(20px)',
            borderRadius: 24,
            padding: '24px 32px',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            textAlign: 'center',
            fontSize: 26,
            fontWeight: 700,
            lineHeight: 1.4,
            color: '#FFFFFF',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.6)',
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
            color: '#CBD5E1',
            textShadow: '0 2px 4px rgba(0,0,0,0.6)',
          }}
        >
          <span>⭐ 0% Commission</span>
          <span>•</span>
          <span>📍 Proudly in Bastar</span>
          <span>•</span>
          <span>⚡ Free Trial Ready</span>
        </div>
      </div>
    </div>
  );
};
