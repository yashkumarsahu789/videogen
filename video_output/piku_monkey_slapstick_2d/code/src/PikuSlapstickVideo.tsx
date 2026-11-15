import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import visemesData from "./visemes.json";
import timelineData from "./timeline_cues.json";

export const PikuSlapstickVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sec = frame / fps;

  const curCue = timelineData.find((c: any) => sec >= c.start && sec < c.end) || timelineData[0];
  const speaker = curCue ? curCue.speaker : "piku";

  const vFrame = (visemesData as any).frames?.[frame] || { mouth: "rest" };
  const mouthShape = vFrame.mouth;

  // Scene state
  let sceneBadge = "SCENE 1: THE SWEET GOLDEN MANGO";
  let showCatapult = false;
  let showBeehive = false;
  let showSlip = false;
  let showSplash = false;
  let flightY = 0;
  let shakeX = 0;

  if (sec < 9.5) {
    sceneBadge = "SCENE 1: THE SWEET GOLDEN MANGO";
  } else if (sec >= 9.5 && sec < 19.2) {
    sceneBadge = "SCENE 2: THE BAMBOO CATAPULT!";
    showCatapult = true;
    if (sec >= 9.5 && sec <= 12.0) {
      const p = (sec - 9.5) / 2.5;
      flightY = -Math.sin(p * Math.PI) * 1200;
    }
  } else if (sec >= 19.2 && sec < 27.4) {
    sceneBadge = "SCENE 3: THE BEEHIVE HELMET!";
    showBeehive = true;
    shakeX = Math.sin(frame * 2.5) * 20;
  } else if (sec >= 27.4 && sec < 36.0) {
    sceneBadge = "SCENE 4: BANANA PEEL CRASH!";
    showSlip = true;
    shakeX = Math.sin(frame * 3) * 25;
  } else {
    sceneBadge = "SCENE 5: RIVER SPLASH & PIKU WINS!";
    showSplash = true;
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "#040810", color: "#F8FAFC", fontFamily: "sans-serif", overflow: "hidden" }}>
      {/* Jungle Backdrop */}
      <AbsoluteFill
        style={{
          background: "radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 60%), linear-gradient(180deg, #062b1a 0%, #0d4a2b 45%, #051a10 85%, #020b07 100%)",
        }}
      />

      {/* Sunbeams */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(60deg, transparent, transparent 60px, rgba(255, 235, 150, 0.04) 60px, rgba(255, 235, 150, 0.04) 120px)",
        }}
      />

      {/* Top Scene Badge */}
      <div
        style={{
          position: "absolute",
          top: 70,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(15, 23, 42, 0.95)",
          border: "3px solid #F59E0B",
          color: "#F59E0B",
          fontSize: 28,
          fontWeight: 900,
          padding: "12px 36px",
          borderRadius: 40,
          letterSpacing: 2,
          textTransform: "uppercase",
          boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
          zIndex: 30,
        }}
      >
        {sceneBadge}
      </div>

      {/* Comic Popups */}
      {showCatapult && (
        <div
          style={{
            position: "absolute",
            top: 400,
            left: 100,
            background: "#EF4444",
            color: "#FFF",
            fontSize: 48,
            fontWeight: 900,
            padding: "18px 36px",
            borderRadius: 24,
            border: "5px solid #FFF",
            boxShadow: "0 0 50px #EF4444",
            transform: "rotate(-8deg) scale(1.1)",
            zIndex: 40,
          }}
        >
          🎋 BOING! CATAPULT!
        </div>
      )}

      {showBeehive && (
        <div
          style={{
            position: "absolute",
            top: 500,
            right: 80,
            background: "#F59E0B",
            color: "#000",
            fontSize: 48,
            fontWeight: 900,
            padding: "18px 36px",
            borderRadius: 24,
            border: "5px solid #FFF",
            boxShadow: "0 0 50px #F59E0B",
            transform: "rotate(6deg) scale(1.1)",
            zIndex: 40,
          }}
        >
          🐝 BZZZZ! BEE HELMET!
        </div>
      )}

      {showSlip && (
        <div
          style={{
            position: "absolute",
            top: 650,
            left: "50%",
            transform: "translateX(-50%) rotate(4deg) scale(1.2)",
            background: "#10B981",
            color: "#FFF",
            fontSize: 52,
            fontWeight: 900,
            padding: "20px 44px",
            borderRadius: 28,
            border: "5px solid #FFF",
            boxShadow: "0 0 60px #10B981",
            zIndex: 40,
          }}
        >
          🍌 BANANA PRETZEL SLIP!
        </div>
      )}

      {showSplash && (
        <div
          style={{
            position: "absolute",
            top: 600,
            left: "50%",
            transform: "translateX(-50%) rotate(-3deg) scale(1.25)",
            background: "linear-gradient(45deg, #06B6D4, #3B82F6)",
            color: "#FFF",
            fontSize: 64,
            fontWeight: 900,
            padding: "24px 60px",
            borderRadius: 36,
            border: "6px solid #FFF",
            boxShadow: "0 0 80px #06B6D4",
            zIndex: 40,
          }}
        >
          💦 KERSPLASH!
        </div>
      )}

      {/* Piku Monkey (Top Right) */}
      <div
        style={{
          position: "absolute",
          top: 220,
          right: 60,
          width: 400,
          height: 550,
          transform: `scale(${speaker === "piku" ? 1.08 : 1.0})`,
          filter: speaker === "piku" ? "drop-shadow(0 0 50px rgba(245, 158, 11, 0.8))" : "none",
          zIndex: 20,
          transition: "transform 0.2s",
        }}
      >
        <svg width="400" height="550" viewBox="0 0 300 400" fill="none">
          <path d="M 0 340 Q 150 360 300 320" stroke="#15803D" strokeWidth="24" strokeLinecap="round" />
          <path d="M 120 280 C 70 320, 20 280, 40 230 C 50 200, 70 210, 60 230 C 45 260, 80 290, 130 260 Z" fill="#D97706" />
          <ellipse cx="150" cy="270" rx="45" ry="55" fill="#D97706" />
          <ellipse cx="150" cy="275" rx="32" ry="40" fill="#FDE68A" />
          <g transform="translate(180, 230)">
            <ellipse cx="0" cy="0" rx="22" ry="30" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
            <path d="M 8 -25 Q 16 -35 12 -40" stroke="#15803D" strokeWidth="3" fill="none" />
            <ellipse cx="16" cy="-35" rx="8" ry="4" fill="#22C55E" transform="rotate(-30, 16, -35)" />
            <path d="M 16 -5 Q 10 0 16 8 Q 12 12 16 16" fill="#062b1a" />
          </g>
          <g id="pikuHead" transform="translate(150, 170)">
            <ellipse cx="-42" cy="0" rx="16" ry="20" fill="#D97706" />
            <ellipse cx="-42" cy="0" rx="10" ry="14" fill="#FDE68A" />
            <ellipse cx="42" cy="0" rx="16" ry="20" fill="#D97706" />
            <ellipse cx="42" cy="0" rx="10" ry="14" fill="#FDE68A" />
            <circle cx="0" cy="0" r="40" fill="#D97706" />
            <path d="M -30 8 C -30 -15, 30 -15, 30 8 C 30 35, -30 35, -30 8 Z" fill="#FDE68A" />
            <path d="M -44 -6 C -44 -50, 44 -50, 44 -6 Z" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="0" cy="-48" rx="8" ry="16" fill="#22C55E" transform="rotate(-20, 0, -48)" />
            <ellipse cx="-14" cy="-2" rx="9" ry="13" fill="#FFF" />
            <circle cx="-14" cy="-2" r="6" fill="#1E293B" />
            <circle cx="-16" cy="-5" r="2.5" fill="#FFF" />
            <ellipse cx="14" cy="-2" rx="9" ry="13" fill="#FFF" />
            <circle cx="14" cy="-2" r="6" fill="#1E293B" />
            <circle cx="12" cy="-5" r="2.5" fill="#FFF" />
            <ellipse cx="0" cy="10" rx="4" ry="3" fill="#78350F" />
            <g id="pikuMouth" transform="translate(0, 22)">
              <ellipse cx="0" cy="0" rx={speaker === "piku" && mouthShape === "open_wide" ? 16 : 12} ry={speaker === "piku" && mouthShape === "open_wide" ? 12 : 5} fill="#7F1D1D" stroke="#451A03" strokeWidth="2" />
            </g>
          </g>
        </svg>
      </div>

      {/* Predators Area (Bottom) */}
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 40,
          right: 40,
          height: 700,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          transform: `translateY(${flightY}px) translateX(${shakeX}px)`,
          zIndex: 20,
        }}
      >
        {/* Chitu (Leopard) */}
        <div style={{ transform: `scale(${speaker === "chitu" ? 1.08 : 1.0})` }}>
          <svg width="450" height="650" viewBox="0 0 300 400" fill="none">
            <ellipse cx="150" cy="270" rx="60" ry="75" fill="#FBBF24" stroke="#B45309" strokeWidth="5" />
            <circle cx="130" cy="240" r="9" fill="#78350F" />
            <circle cx="170" cy="250" r="10" fill="#78350F" />
            <circle cx="140" cy="285" r="11" fill="#78350F" />
            <g id="chituHead" transform="translate(150, 160)">
              <polygon points="-40,-15 -25,-55 -10,-20" fill="#FBBF24" stroke="#B45309" strokeWidth="4" />
              <polygon points="10,-20 25,-55 40,-15" fill="#FBBF24" stroke="#B45309" strokeWidth="4" />
              <circle cx="0" cy="0" r="45" fill="#FBBF24" stroke="#B45309" strokeWidth="4" />
              <ellipse cx="-15" cy="8" rx="18" ry="18" fill="#FEF3C7" />
              <ellipse cx="15" cy="8" rx="18" ry="18" fill="#FEF3C7" />
              <circle cx="-16" cy="-8" r="12" fill="#FEF08A" stroke="#78350F" strokeWidth="2.5" />
              <circle cx="-16" cy="-8" r="6" fill="#18181B" />
              <circle cx="16" cy="-8" r="12" fill="#FEF08A" stroke="#78350F" strokeWidth="2.5" />
              <circle cx="16" cy="-8" r="6" fill="#18181B" />
              <polygon points="-6,6 6,6 0,13" fill="#DC2626" />
              <g id="chituMouth" transform="translate(0, 22)">
                <ellipse cx="0" cy="0" rx={speaker === "chitu" ? 18 : 12} ry={speaker === "chitu" ? 10 : 5} fill="#7F1D1D" stroke="#78350F" strokeWidth="2" />
                <path d="M -4 4 C -4 20, 4 20, 4 4 Z" fill="#F43F5E" />
              </g>
            </g>
          </svg>
        </div>

        {/* Bhalu (Bear) */}
        <div style={{ transform: `scale(${speaker === "bhalu" ? 1.08 : 1.0})` }}>
          <svg width="480" height="680" viewBox="0 0 320 400" fill="none">
            <ellipse cx="160" cy="270" rx="80" ry="90" fill="#78350F" stroke="#451A03" strokeWidth="6" />
            <ellipse cx="160" cy="275" rx="55" ry="65" fill="#B45309" opacity="0.6" />
            <g id="bhaluHead" transform="translate(160, 150)">
              <circle cx="-50" cy="-35" r="22" fill="#78350F" stroke="#451A03" strokeWidth="4" />
              <circle cx="50" cy="-35" r="22" fill="#78350F" stroke="#451A03" strokeWidth="4" />
              <circle cx="0" cy="0" r="55" fill="#78350F" stroke="#451A03" strokeWidth="5" />
              <ellipse cx="0" cy="18" rx="32" ry="24" fill="#D97706" />
              <circle cx="-20" cy="-6" r="13" fill="#FFF" stroke="#451A03" strokeWidth="3" />
              <circle cx="-20" cy="-6" r="6" fill="#18181B" />
              <circle cx="20" cy="-6" r="13" fill="#FFF" stroke="#451A03" strokeWidth="3" />
              <circle cx="20" cy="-6" r="6" fill="#18181B" />
              <ellipse cx="0" cy="12" rx="14" ry="9" fill="#18181B" />
              <g id="bhaluMouth" transform="translate(0, 30)">
                <ellipse cx="0" cy="0" rx={speaker === "bhalu" ? 20 : 14} ry={speaker === "bhalu" ? 12 : 6} fill="#7F1D1D" stroke="#451A03" strokeWidth="3" />
              </g>
              {showBeehive && (
                <g id="beehiveGroup" transform="translate(0, -60)">
                  <path d="M -40 25 C -45 -20, 45 -20, 40 25 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="4" />
                  <ellipse cx="0" cy="10" rx="8" ry="12" fill="#78350F" />
                </g>
              )}
            </g>
          </svg>
        </div>
      </div>

      {/* Subtitles Box */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
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
        <div style={{ fontSize: 24, fontWeight: 900, color: speaker === "piku" ? "#F59E0B" : speaker === "chitu" ? "#FBBF24" : "#B45309", marginBottom: 8, letterSpacing: 1 }}>
          {speaker === "piku" ? "🐵 Piku (Baby Monkey)" : speaker === "chitu" ? "🐆 Chitu (Leopard)" : speaker === "bhalu" ? "🐻 Bhalu (Bear)" : "😱 Predators!"}
        </div>
        <div style={{ fontSize: 32, fontWeight: 700, color: "#F8FAFC", lineHeight: 1.35 }}>
          {curCue?.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
