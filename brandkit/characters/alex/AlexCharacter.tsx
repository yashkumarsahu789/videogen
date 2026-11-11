import React from 'react';

export type MouthState = 'rest' | 'open_small' | 'open_wide' | 'o_shape' | 'e_shape' | 'smile';
export type EyeState = 'open' | 'blink' | 'wink' | 'surprised';
export type EyebrowState = 'neutral' | 'raised' | 'curious';

export interface CharacterProps {
  mouthState?: MouthState;
  eyeState?: EyeState;
  eyebrowState?: EyebrowState;
  headY?: number;
  headRot?: number;
  width?: number;
  height?: number;
}

export const AlexCharacter: React.FC<CharacterProps> = ({
  mouthState = 'rest',
  eyeState = 'open',
  eyebrowState = 'neutral',
  headY = 0,
  headRot = 0,
  width = 600,
  height = 800,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 600 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Gradients & Shadows */}
        <linearGradient id="alex_skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDDFD0" />
          <stop offset="100%" stopColor="#F5C4B0" />
        </linearGradient>
        <linearGradient id="alex_hoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="alex_hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* BODY / HOODIE (Anchored, subtle breathing) */}
      <g id="body" transform={`translate(0, ${headY * 0.3})`}>
        {/* Shoulders / Torso */}
        <path
          d="M150 620 C 150 500, 220 480, 300 480 C 380 480, 450 500, 450 620 L 480 800 L 120 800 Z"
          fill="url(#alex_hoodie)"
          filter="url(#shadow)"
        />
        {/* Hoodie Collar / Drawstrings */}
        <path
          d="M240 480 C 270 540, 330 540, 360 480 C 340 560, 260 560, 240 480 Z"
          fill="#0F172A"
        />
        {/* Neon Cyan Drawstrings */}
        <line x1="270" y1="520" x2="265" y2="600" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
        <line x1="330" y1="520" x2="335" y2="595" stroke="#00F0FF" strokeWidth="4" strokeLinecap="round" />
        {/* Chest Logo: Code Icon */}
        <text x="300" y="650" textAnchor="middle" fill="#38BDF8" fontSize="28" fontWeight="bold" fontFamily="monospace">
          &lt;/&gt;
        </text>
      </g>

      {/* HEAD & FACE GROUP (Moves with headY and headRot) */}
      <g
        id="head_group"
        transform={`translate(300, 340) rotate(${headRot}) translate(-300, -340) translate(0, ${headY})`}
      >
        {/* Neck */}
        <path d="M265 370 L 265 490 L 335 490 L 335 370 Z" fill="#E8B39E" />

        {/* Ears */}
        <circle cx="180" cy="310" r="28" fill="#F5C4B0" />
        <circle cx="180" cy="310" r="16" fill="#E2A690" />
        <circle cx="420" cy="310" r="28" fill="#F5C4B0" />
        <circle cx="420" cy="310" r="16" fill="#E2A690" />

        {/* Face Shape */}
        <path
          d="M 190 240 C 190 140, 410 140, 410 240 C 410 370, 360 420, 300 420 C 240 420, 190 370, 190 240 Z"
          fill="url(#alex_skin)"
          filter="url(#shadow)"
        />

        {/* Hair - Back Layers */}
        <path
          d="M 170 230 C 170 100, 430 100, 430 230 C 440 290, 430 330, 420 340 C 420 220, 400 130, 300 130 C 200 130, 180 220, 180 340 C 170 330, 160 290, 170 230 Z"
          fill="#1E293B"
        />

        {/* Hair - Stylish Front Cut */}
        <path
          d="M 180 200 C 200 120, 260 100, 340 105 C 420 110, 430 160, 420 210 C 390 160, 350 170, 320 190 C 290 210, 240 175, 180 200 Z"
          fill="url(#alex_hair)"
        />
        {/* Hair Strands Highlight */}
        <path
          d="M 230 130 C 270 120, 330 125, 360 145"
          stroke="#475569"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Eyebrows */}
        <Eyebrows state={eyebrowState} />

        {/* Glasses */}
        <g id="glasses">
          {/* Left Frame */}
          <rect x="205" y="245" width="80" height="55" rx="14" fill="rgba(15,23,42,0.15)" stroke="#0F172A" strokeWidth="6" />
          {/* Right Frame */}
          <rect x="315" y="245" width="80" height="55" rx="14" fill="rgba(15,23,42,0.15)" stroke="#0F172A" strokeWidth="6" />
          {/* Bridge */}
          <line x1="285" y1="268" x2="315" y2="268" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
          {/* Glass Glint Reflection */}
          <path d="M 215 255 L 235 255 L 220 280 L 210 280 Z" fill="rgba(255,255,255,0.4)" />
          <path d="M 325 255 L 345 255 L 330 280 L 320 280 Z" fill="rgba(255,255,255,0.4)" />
        </g>

        {/* Eyes (Left & Right) */}
        <Eyes state={eyeState} />

        {/* Nose */}
        <path d="M 300 285 C 295 305, 290 315, 305 318" stroke="#E2A690" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Dynamic Mouth (Visemes) */}
        <g transform="translate(300, 360)">
          <Mouth state={mouthState} />
        </g>
      </g>
    </svg>
  );
};

// --- Eyebrows Component ---
const Eyebrows: React.FC<{ state: EyebrowState }> = ({ state }) => {
  let leftY = 230;
  let rightY = 230;
  let leftRot = 0;
  let rightRot = 0;

  if (state === 'raised') {
    leftY = 220;
    rightY = 220;
  } else if (state === 'curious') {
    leftY = 216;
    rightY = 232;
    leftRot = -8;
    rightRot = 6;
  }

  return (
    <g id="eyebrows">
      <path
        d={`M 215 ${leftY + 4} Q 245 ${leftY - 6} 275 ${leftY + 2}`}
        stroke="#1E293B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${leftRot}, 245, ${leftY})`}
      />
      <path
        d={`M 325 ${rightY + 2} Q 355 ${rightY - 6} 385 ${rightY + 4}`}
        stroke="#1E293B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${rightRot}, 355, ${rightY})`}
      />
    </g>
  );
};

// --- Eyes Component ---
const Eyes: React.FC<{ state: EyeState }> = ({ state }) => {
  if (state === 'blink') {
    return (
      <g id="eyes_blink">
        <path d="M 225 275 Q 245 285 265 275" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 335 275 Q 355 285 375 275" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  if (state === 'wink') {
    return (
      <g id="eyes_wink">
        {/* Left eye winking */}
        <path d="M 225 275 Q 245 285 265 275" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
        {/* Right eye open */}
        <circle cx="355" cy="272" r="14" fill="#0F172A" />
        <circle cx="352" cy="269" r="5" fill="#FFFFFF" />
      </g>
    );
  }

  return (
    <g id="eyes_open">
      {/* Left Eye */}
      <circle cx="245" cy="272" r={state === 'surprised' ? 17 : 14} fill="#0F172A" />
      <circle cx="242" cy="268" r="5" fill="#FFFFFF" />
      {/* Right Eye */}
      <circle cx="355" cy="272" r={state === 'surprised' ? 17 : 14} fill="#0F172A" />
      <circle cx="352" cy="268" r="5" fill="#FFFFFF" />
    </g>
  );
};

// --- Mouth / Viseme Shapes Component ---
const Mouth: React.FC<{ state: MouthState }> = ({ state }) => {
  switch (state) {
    case 'open_wide':
      // Open jaw, tongue & upper teeth
      return (
        <g id="mouth_open_wide">
          <path d="M -28 -10 Q 0 -14 28 -10 Q 32 30 0 32 Q -32 30 -28 -10 Z" fill="#881337" />
          {/* Upper Teeth */}
          <path d="M -20 -10 Q 0 -12 20 -10 L 16 -2 Q 0 -4 -16 -2 Z" fill="#FFFFFF" />
          {/* Tongue */}
          <path d="M -16 16 Q 0 10 16 16 Q 12 30 0 31 Q -12 30 -16 16 Z" fill="#F43F5E" />
          <path d="M -28 -10 Q 0 -14 28 -10 Q 32 30 0 32 Q -32 30 -28 -10 Z" stroke="#1E293B" strokeWidth="4" fill="none" />
        </g>
      );

    case 'open_small':
      // Subtle oval opening
      return (
        <g id="mouth_open_small">
          <ellipse cx="0" cy="2" rx="20" ry="11" fill="#881337" />
          {/* Upper teeth peak */}
          <rect x="-12" y="-4" width="24" height="6" rx="2" fill="#FFFFFF" />
          <ellipse cx="0" cy="2" rx="20" ry="11" stroke="#1E293B" strokeWidth="4" fill="none" />
        </g>
      );

    case 'o_shape':
      // Rounded circular mouth
      return (
        <g id="mouth_o_shape">
          <circle cx="0" cy="4" r="14" fill="#881337" />
          <ellipse cx="0" cy="9" rx="8" ry="4" fill="#F43F5E" />
          <circle cx="0" cy="4" r="14" stroke="#1E293B" strokeWidth="4" fill="none" />
        </g>
      );

    case 'e_shape':
      // Stretched wide mouth showing teeth
      return (
        <g id="mouth_e_shape">
          <rect x="-26" y="-3" width="52" height="14" rx="7" fill="#881337" stroke="#1E293B" strokeWidth="4" />
          <rect x="-20" y="-1" width="40" height="6" rx="2" fill="#FFFFFF" />
        </g>
      );

    case 'smile':
      // Warm friendly smile curve
      return (
        <g id="mouth_smile">
          <path d="M -24 -2 Q 0 16 24 -2" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );

    case 'rest':
    default:
      // Neutral resting mouth line
      return (
        <g id="mouth_rest">
          <path d="M -18 0 Q 0 2 18 0" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

