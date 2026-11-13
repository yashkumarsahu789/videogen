import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { AlexCharacter, MouthState, EyeState, EyebrowState } from '../../../../brandkit/characters/alex/AlexCharacter';
import visemesData from './visemes.json';

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
  let bgGradient = 'radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 80%)';
  let accentColor = '#FBBF24';

  if (frame < 320) {
    // Scene 1: Personal Intro & Bastar Hook (0 - 10.6s)
    sceneIndex = 1;
    sceneBadge = '🌟 NAMASTE BASTAR • YASH';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 80%)';
    subtitleText = 'नमस्ते बस्तर! मेरा नाम यश है... और मैं लेकर आ गया हूँ बस्तर के दुकानदारों के लिए एक ज़बरदस्त वेबसाइट!';
    highlightWord = 'नमस्ते बस्तर • Yash';
  } else if (frame < 640) {
    // Scene 2: Follow & The 30% Commission Problem (10.6 - 21.3s)
    sceneIndex = 2;
    sceneBadge = '🚫 30% COMMISSION TRAP BAND';
    eyebrow = 'curious';
    accentColor = '#EF4444';
    bgGradient = 'radial-gradient(circle at 50% 30%, #450A0A 0%, #030712 80%)';
    subtitleText = 'तो सबसे पहले मुझे फ़ॉलो कर लो! क्योंकि अब दुकान ऑनलाइन ले जाने के लिए 30% कमीशन देने की बिल्कुल ज़रूरत नहीं है।';
    highlightWord = 'Follow Karo • 0% Commission';
  } else if (frame < 1100) {
    // Scene 3: Kirana Counter QR & WhatsApp Cart (21.3 - 36.6s)
    sceneIndex = 3;
    sceneBadge = '🛒 COUNTER QR + WHATSAPP CART';
    eyebrow = 'neutral';
    accentColor = '#10B981';
    bgGradient = 'radial-gradient(circle at 50% 30%, #064E3B 0%, #030712 75%)';
    subtitleText = 'वेबसाइट है shop.lifesolvenow.com! किराना दुकान पर QR लगाओ और डायरेक्ट WhatsApp पर आर्डर पाओ!';
    highlightWord = '1-Click WhatsApp Order & QR';
  } else if (frame < 1550) {
    // Scene 4: Repair Shops Digital Job Sheet (36.6 - 51.6s)
    sceneIndex = 4;
    sceneBadge = '📱 DIGITAL JOB SHEET & WARRANTY';
    eyebrow = 'neutral';
    accentColor = '#38BDF8';
    bgGradient = 'radial-gradient(circle at 50% 30%, #0f172a 0%, #030712 80%)';
    subtitleText = 'रिपेयर वाले पुराना रजिस्टर छोड़ो! ग्राहक को दो डिजिटल जॉब शीट, लाइव स्टेटस और WhatsApp वारंटी!';
    highlightWord = 'Digital Job Sheet #1042';
  } else if (frame < 1920) {
    // Scene 5: Restaurant Table QR & Live Kitchen KOT (51.6 - 64s)
    sceneIndex = 5;
    sceneBadge = '🍽️ TABLE QR & KITCHEN ORDERS';
    eyebrow = 'raised';
    accentColor = '#F97316';
    bgGradient = 'radial-gradient(circle at 50% 30%, #431407 0%, #030712 80%)';
    subtitleText = 'रेस्टोरेंट के लिए टेबल पर स्मार्ट QR और लाइव किचन स्क्रीन! और सबसे बड़ी बात — Zero Percent Commission!';
    highlightWord = 'Table QR & Live Kitchen';
  } else {
    // Scene 6: Bastar Call to Action (64 - 76.5s)
    sceneIndex = 6;
    sceneBadge = '🚀 BASTAR DIGITAL BANAO • FREE TRIAL';
    eyebrow = 'neutral';
    accentColor = '#FBBF24';
    bgGradient = 'radial-gradient(circle at 50% 30%, #312E81 0%, #030712 80%)';
    subtitleText = 'अभी जाओ shop.lifesolvenow.com पर, Free Trial क्लेम करो, और अपने बस्तर के बिज़नेस को डिजिटल बनाओ!';
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
      {/* Background Animated Tech Grid */}
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

      {/* TOP HEADER: Badge & Local Channel */}
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
          SHOP.LIFESOLVENOW.COM • BASTAR DUKANDAAR REVOLUTION
        </div>
      </div>

      {/* CENTER STAGE: CHARACTER (Yash / Alex) & DYNAMIC FEATURE MOCKUPS */}
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
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))',
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
              width: 630,
              background: 'rgba(15, 23, 42, 0.95)',
              border: '2px solid #FBBF24',
              borderRadius: 26,
              padding: '24px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              boxShadow: '0 20px 50px rgba(251, 191, 36, 0.3)',
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
                padding: '8px 20px',
                borderRadius: 99,
                fontSize: 16,
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
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
              width: 630,
              background: 'rgba(69, 10, 10, 0.95)',
              border: '2px solid #EF4444',
              borderRadius: 24,
              padding: '22px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 20px 48px rgba(239, 68, 68, 0.35)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 32 }}>❌</span>
              <div style={{ fontSize: 22, fontWeight: 900, color: '#FCA5A5' }}>
                Apps Ko 25-30% Commission Dena Band!
              </div>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px 18px', borderRadius: 14, fontSize: 17, fontWeight: 700, color: '#FCD34D' }}>
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
              width: 640,
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
                🏬 Kirana Counter QR Standee
              </span>
              <span style={{ background: '#047857', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                0% Cut
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
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
              width: 640,
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
              width: 640,
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
                🍽️ Table QR & Live Kitchen Orders
              </span>
              <span style={{ background: '#C2410C', color: '#FFFFFF', padding: '4px 10px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                Zero Commission
              </span>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
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
                ✓ Made for Bastar
              </span>
              <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 14px', borderRadius: 8, fontSize: 16, fontWeight: 700 }}>
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
          <span>📍 Proudly in Bastar</span>
          <span>•</span>
          <span>⚡ Free Trial Ready</span>
        </div>
      </div>
    </div>
  );
};
