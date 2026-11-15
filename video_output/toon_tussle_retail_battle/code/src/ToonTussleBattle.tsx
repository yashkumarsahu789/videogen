import React from "react";
import { AbsoluteFill, Audio, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import visemesData from "./visemes.json";
import timelineData from "./timeline_cues.json";

export const ToonTussleBattle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  // Find active dialogue cue
  const currentCue = timelineData.find((c: any) => sec >= c.start && sec < c.end) || timelineData[0];
  const speaker = currentCue ? currentCue.speaker : "announcer";

  // Viseme mouth
  const vFrame = (visemesData as any).frames?.[frame] || { mouth: "rest" };
  const mouthShape = vFrame.mouth;

  // Rounds & HP calculation
  let villainHpWidth = 100;
  let roundText = "MATCHUP: APPS VS LOCAL STORE";
  let showWham = false;
  let showShield = false;
  let showKo = false;
  let villainShake = 0;

  if (sec < 11.5) {
    villainHpWidth = 100;
    roundText = "MATCHUP: APPS VS LOCAL STORE";
  } else if (sec >= 11.5 && sec < 19.3) {
    villainHpWidth = 100;
    roundText = "ROUND 1: THE 30% LOOT";
    showWham = true;
  } else if (sec >= 19.3 && sec < 28.5) {
    villainHpWidth = 65;
    roundText = "ROUND 1: 0% COMMISSION COUNTER!";
    showShield = true;
    if (sec > 19.3 && sec < 20.0) villainShake = Math.sin(frame * 2.5) * 20;
  } else if (sec >= 28.5 && sec < 33.8) {
    villainHpWidth = 65;
    roundText = "ROUND 2: CUSTOMER THEFT";
    showWham = true;
  } else if (sec >= 33.8 && sec < 42.4) {
    villainHpWidth = 25;
    roundText = "ROUND 2: DIRECT WHATSAPP!";
    showShield = true;
    if (sec > 33.8 && sec < 34.5) villainShake = Math.sin(frame * 2.5) * 25;
  } else if (sec >= 42.4 && sec < 49.0) {
    villainHpWidth = 0;
    roundText = "💥 FINISHING MOVE: ₹99 PRO PLAN!";
    showKo = true;
    villainShake = Math.sin(frame * 2) * 15;
  } else {
    villainHpWidth = 0;
    roundText = "🏆 WINNER: LOCAL DUKANDAR!";
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#060810", color: "#F8FAFC", fontFamily: "sans-serif", overflow: "hidden" }}>
      <Audio src={staticFile("audio/voiceover.mp3")} />

      {/* Cyber Arena Background */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at 50% 30%, #1e1b4b 0%, #030712 90%)",
        }}
      />

      {/* Speed lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 60px)",
        }}
      />

      {/* Top HUD: Health Bars & VS */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 30,
        }}
      >
        {/* Left: 30% App Bot HUD */}
        <div style={{ width: 380 }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#EF4444", textTransform: "uppercase", marginBottom: 8 }}>
            😈 30% App Bot
          </div>
          <div style={{ width: "100%", height: 26, background: "#1E293B", borderRadius: 13, border: "2.5px solid rgba(255,255,255,0.4)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${villainHpWidth}%`, background: "linear-gradient(90deg, #DC2626, #F87171)", transition: "width 0.3s" }} />
          </div>
        </div>

        {/* Center VS Emblem */}
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            background: "radial-gradient(circle, #F59E0B, #B45309)",
            border: "4px solid #FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
            fontWeight: 900,
            color: "#000",
            boxShadow: "0 0 35px #F59E0B",
            transform: `scale(${1 + Math.sin(frame * 0.1) * 0.08})`,
          }}
        >
          VS
        </div>

        {/* Right: Smart Dukandar Dev HUD */}
        <div style={{ width: 380, textAlign: "right" }}>
          <div style={{ fontSize: 28, fontWeight: 900, color: "#38BDF8", textTransform: "uppercase", marginBottom: 8 }}>
            🦸‍♂️ Smart Dukandar (Dev)
          </div>
          <div style={{ width: "100%", height: 26, background: "#1E293B", borderRadius: 13, border: "2.5px solid rgba(255,255,255,0.4)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "100%", background: "linear-gradient(90deg, #10B981, #38BDF8)" }} />
          </div>
        </div>
      </div>

      {/* Announcer HUD (Kabir) */}
      {speaker === "announcer" && (
        <div
          style={{
            position: "absolute",
            top: 180,
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(15, 23, 42, 0.95)",
            border: "3px solid #F59E0B",
            borderRadius: 40,
            padding: "12px 36px",
            display: "flex",
            alignItems: "center",
            gap: 16,
            boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)",
            zIndex: 35,
          }}
        >
          <span style={{ fontSize: 32 }}>🎙️</span>
          <span style={{ fontSize: 24, fontWeight: 900, color: "#F59E0B", letterSpacing: 1.5 }}>
            KABIR · ARENA REFEREE
          </span>
        </div>
      )}

      {/* Round Banner */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: "50%",
          transform: "translateX(-50%)",
          background: "linear-gradient(90deg, #EF4444, #F59E0B)",
          color: "#FFF",
          fontWeight: 900,
          fontSize: 32,
          letterSpacing: 2,
          textTransform: "uppercase",
          padding: "14px 44px",
          borderRadius: 50,
          boxShadow: "0 0 50px rgba(239, 68, 68, 0.7)",
          zIndex: 32,
        }}
      >
        {roundText}
      </div>

      {/* Comic Hit Popups */}
      {showWham && (
        <div
          style={{
            position: "absolute",
            top: 700,
            left: 100,
            background: "#EF4444",
            color: "#FFF",
            fontSize: 48,
            fontWeight: 900,
            padding: "16px 36px",
            borderRadius: 24,
            border: "5px solid #FFF",
            boxShadow: "0 0 50px #EF4444",
            transform: "rotate(-8deg) scale(1.1)",
            zIndex: 40,
          }}
        >
          💥 30% COMMISSION LOOT!
        </div>
      )}

      {showShield && (
        <div
          style={{
            position: "absolute",
            top: 720,
            right: 100,
            background: "#10B981",
            color: "#FFF",
            fontSize: 48,
            fontWeight: 900,
            padding: "16px 36px",
            borderRadius: 24,
            border: "5px solid #FFF",
            boxShadow: "0 0 50px #10B981",
            transform: "rotate(6deg) scale(1.1)",
            zIndex: 40,
          }}
        >
          🛡️ 0% COMMISSION COUNTER!
        </div>
      )}

      {showKo && (
        <div
          style={{
            position: "absolute",
            top: 650,
            left: "50%",
            transform: "translateX(-50%) rotate(-3deg) scale(1.2)",
            background: "linear-gradient(45deg, #EF4444, #F59E0B)",
            color: "#FFF",
            fontSize: 72,
            fontWeight: 900,
            letterSpacing: 4,
            padding: "24px 60px",
            borderRadius: 36,
            border: "6px solid #FFF",
            boxShadow: "0 0 80px #EF4444",
            zIndex: 50,
          }}
        >
          👑 KNOCKOUT!
        </div>
      )}

      {/* Arena Fighters */}
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 40,
          right: 40,
          height: 900,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          zIndex: 20,
        }}
      >
        {/* Left: Commission Bot (Villain) */}
        <div
          style={{
            transform: `translateX(${villainShake}px) scale(${speaker === "villain" ? 1.08 : 1.0})`,
            filter: speaker === "villain" ? "drop-shadow(0 0 50px #EF4444)" : villainHpWidth === 0 ? "grayscale(1) opacity(0.4)" : "none",
            transition: "transform 0.2s",
          }}
        >
          <svg width="450" height="750" viewBox="0 0 300 450" fill="none">
            <path d="M 60 380 L 80 230 C 80 190, 220 190, 220 230 L 240 380 Z" fill="#18181B" stroke="#EF4444" strokeWidth="6" />
            <rect x="95" y="240" width="110" height="40" rx="8" fill="#450A0A" stroke="#EF4444" strokeWidth="3" />
            <text x="150" y="268" textAnchor="middle" fill="#EF4444" fontSize="20" fontWeight="900" fontFamily="monospace">30% CUT</text>
            <rect x="130" y="170" width="40" height="30" fill="#27272A" />
            <polygon points="70,90 230,90 250,170 50,170" fill="#27272A" stroke="#EF4444" strokeWidth="6" />
            <line x1="150" y1="90" x2="150" y2="40" stroke="#EF4444" strokeWidth="6" />
            <circle cx="150" cy="35" r="12" fill="#EF4444" />
            <polygon points="90,115 135,125 90,130" fill="#F87171" />
            <polygon points="210,115 165,125 210,130" fill="#F87171" />
            <rect x="110" y="145" width="80" height={speaker === "villain" && frame % 4 === 0 ? 24 : 14} rx="4" fill="#000" />
          </svg>
        </div>

        {/* Right: Smart Dukandar Dev (Real Human Hero) */}
        <div
          style={{
            transform: `scale(${speaker === "hero" ? 1.08 : 1.0})`,
            filter: speaker === "hero" ? "drop-shadow(0 0 60px rgba(56, 189, 248, 0.8))" : "none",
            transition: "transform 0.2s",
          }}
        >
          <svg width="450" height="780" viewBox="0 0 600 800" fill="none">
            <g id="heroBody">
              <path d="M 140 610 C 140 480, 210 455, 300 455 C 390 455, 460 480, 460 610 L 490 800 L 110 800 Z" fill="#1E293B" stroke="#38BDF8" strokeWidth="3" />
              <path d="M 260 455 C 260 495, 340 495, 340 455 Z" fill="#F8FAFC" />
              <path d="M 235 455 L 270 515 L 255 530" stroke="#334155" strokeWidth="4" fill="#1E293B" />
              <path d="M 365 455 L 330 515 L 345 530" stroke="#334155" strokeWidth="4" fill="#1E293B" />
              <line x1="300" y1="510" x2="300" y2="780" stroke="#0F172A" strokeWidth="4" />
            </g>
            <g id="heroHead" transform="translate(300, 335)">
              <path d="M 265 355 L 265 470 L 335 470 L 335 355 Z" fill="#DE9764" />
              <circle cx="180" cy="305" r="23" fill="#E8A676" />
              <circle cx="420" cy="305" r="23" fill="#E8A676" />
              <path d="M 190 220 C 190 120, 410 120, 410 220 C 410 330, 370 415, 300 415 C 230 415, 190 330, 190 220 Z" fill="#F3BA93" />
              <path d="M 220 335 C 235 410, 365 410, 380 335 C 375 390, 225 390, 220 335 Z" fill="#18181B" opacity="0.3" />
              <path d="M 175 190 C 175 75, 425 75, 425 190 C 410 150, 380 95, 300 95 C 220 95, 190 150, 175 190 Z" fill="#18181B" />
              <path d="M 220 220 L 275 224" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
              <path d="M 380 220 L 325 224" stroke="#18181B" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="250" cy="245" rx="14" ry="9" fill="#FFFFFF" />
              <circle cx="250" cy="245" r="6" fill="#18181B" />
              <ellipse cx="350" cy="245" rx="14" ry="9" fill="#FFFFFF" />
              <circle cx="350" cy="245" r="6" fill="#18181B" />
              <path d="M 300 240 L 296 295 L 306 297" stroke="#C97E4A" strokeWidth="4" strokeLinecap="round" fill="none" />
              <g transform="translate(300, 350)">
                <ellipse cx="0" cy="0" rx={speaker === "hero" ? (mouthShape === "open_wide" ? 22 : 16) : 12} ry={speaker === "hero" ? (mouthShape === "open_wide" ? 16 : 8) : 5} fill="#7F1D1D" stroke="#18181B" strokeWidth="3" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Subtitles Box */}
      <div
        style={{
          position: "absolute",
          bottom: 150,
          left: 40,
          right: 40,
          background: "rgba(15, 23, 42, 0.95)",
          border: "2.5px solid rgba(255, 255, 255, 0.2)",
          borderRadius: 24,
          padding: "24px 30px",
          textAlign: "center",
          zIndex: 35,
          boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 900, color: speaker === "villain" ? "#EF4444" : speaker === "hero" ? "#38BDF8" : "#F59E0B", marginBottom: 8, letterSpacing: 1 }}>
          {speaker === "villain" ? "😈 30% Commission App Bot" : speaker === "hero" ? "🦸‍♂️ Dev (Smart Dukandar)" : "🎙️ Kabir (Arena Announcer)"}
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.35 }}>
          {currentCue?.text}
        </div>
      </div>

      {/* Bottom LifeSolveNow Brand Link */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          right: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 35,
          fontSize: 26,
          fontWeight: 900,
          background: "linear-gradient(90deg, #10B981, #06B6D4)",
          padding: "18px 36px",
          borderRadius: 20,
          color: "#000",
        }}
      >
        <span>🛍️ shop.lifesolvenow.com</span>
        <span>0% COMMISSION · FREE STARTER PLAN ➔</span>
      </div>
    </AbsoluteFill>
  );
};
