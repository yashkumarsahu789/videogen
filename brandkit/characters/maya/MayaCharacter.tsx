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

export const MayaCharacter: React.FC<CharacterProps> = ({
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
        {/* Skin Gradient */}
        <linearGradient id="maya_skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE3D4" />
          <stop offset="100%" stopColor="#F7C6B0" />
        </linearGradient>
        {/* Cyber Tech Jacket Gradient */}
        <linearGradient id="maya_jacket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2E1065" />
          <stop offset="100%" stopColor="#0F0728" />
        </linearGradient>
        {/* Sleek Violet Hair Gradient */}
        <linearGradient id="maya_hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#581C87" />
          <stop offset="100%" stopColor="#2E1065" />
        </linearGradient>
        <filter id="maya_shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* BODY / JACKET */}
      <g id="maya_body" transform={`translate(0, ${headY * 0.3})`}>
        {/* Shoulders */}
        <path
          d="M 160 620 C 160 500, 220 470, 300 470 C 380 470, 440 500, 440 620 L 470 800 L 130 800 Z"
          fill="url(#maya_jacket)"
          filter="url(#maya_shadow)"
        />
        {/* High-Collar V-Neck Trim */}
        <path
          d="M 230 470 L 300 560 L 370 470 L 340 470 L 300 525 L 260 470 Z"
          fill="#EC4899"
        />
        {/* Neon Magenta Zipper Line */}
        <line x1="300" y1="560" x2="300" y2="780" stroke="#EC4899" strokeWidth="4" strokeLinecap="round" />
        {/* AI Studio Tech Pin / Badge */}
        <circle cx="230" cy="540" r="14" fill="#A855F7" stroke="#F472B6" strokeWidth="3" />
        <circle cx="230" cy="540" r="5" fill="#FFFFFF" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="maya_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Neck */}
        <path d="M 268 360 L 268 480 L 332 480 L 332 360 Z" fill="#E8B29C" />

        {/* Earrings */}
        <circle cx="180" cy="315" r="10" fill="#F43F5E" />
        <circle cx="420" cy="315" r="10" fill="#F43F5E" />

        {/* Ears */}
        <circle cx="185" cy="310" r="24" fill="#F7C6B0" />
        <circle cx="415" cy="310" r="24" fill="#F7C6B0" />

        {/* Face Shape */}
        <path
          d="M 195 240 C 195 140, 405 140, 405 240 C 405 365, 355 415, 300 415 C 245 415, 195 365, 195 240 Z"
          fill="url(#maya_skin)"
          filter="url(#maya_shadow)"
        />

        {/* Hair - Back Bob Volume */}
        <path
          d="M 160 220 C 160 90, 440 90, 440 220 C 450 320, 430 380, 400 400 C 410 280, 390 120, 300 120 C 210 120, 190 280, 200 400 C 170 380, 150 320, 160 220 Z"
          fill="#1E1035"
        />

        {/* Hair - Stylish Angled Bangs */}
        <path
          d="M 170 210 C 190 110, 260 90, 340 95 C 420 100, 435 150, 425 240 C 405 170, 350 165, 300 185 C 250 205, 210 190, 170 210 Z"
          fill="url(#maya_hair)"
        />
        {/* Magenta Hair Streak Highlight */}
        <path
          d="M 230 115 C 270 105, 330 110, 370 140"
          stroke="#D946EF"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Eyebrows */}
        <MayaEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <MayaEyes state={eyeState} />

        {/* Subtle Nose */}
        <path d="M 300 285 C 297 302, 294 310, 304 314" stroke="#E2A690" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Dynamic Mouth (Visemes) */}
        <g transform="translate(300, 360)">
          <MayaMouth state={mouthState} />
        </g>
      </g>
    </svg>
  );
};

// --- Maya Eyebrows ---
const MayaEyebrows: React.FC<{ state: EyebrowState }> = ({ state }) => {
  let leftY = 228;
  let rightY = 228;
  let leftRot = 0;
  let rightRot = 0;

  if (state === 'raised') {
    leftY = 218;
    rightY = 218;
  } else if (state === 'curious') {
    leftY = 214;
    rightY = 230;
    leftRot = -7;
    rightRot = 5;
  }

  return (
    <g id="maya_eyebrows">
      <path
        d={`M 220 ${leftY + 3} Q 248 ${leftY - 8} 275 ${leftY}`}
        stroke="#3B0764"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${leftRot}, 248, ${leftY})`}
      />
      <path
        d={`M 325 ${rightY} Q 352 ${rightY - 8} 380 ${rightY + 3}`}
        stroke="#3B0764"
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${rightRot}, 352, ${rightY})`}
      />
    </g>
  );
};

// --- Maya Almond Eyes with Eyelashes ---
const MayaEyes: React.FC<{ state: EyeState }> = ({ state }) => {
  if (state === 'blink') {
    return (
      <g id="maya_eyes_blink">
        <path d="M 225 272 Q 250 284 275 272" stroke="#2E1065" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 325 272 Q 350 284 375 272" stroke="#2E1065" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  if (state === 'wink') {
    return (
      <g id="maya_eyes_wink">
        <path d="M 225 272 Q 250 284 275 272" stroke="#2E1065" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        {/* Right eye open */}
        <ellipse cx="350" cy="270" rx="18" ry="14" fill="#2E1065" />
        <circle cx="347" cy="266" r="5" fill="#FFFFFF" />
        <circle cx="354" cy="274" r="2.5" fill="#C084FC" />
        <path d="M 328 262 Q 350 252 372 262" stroke="#2E1065" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  return (
    <g id="maya_eyes_open">
      {/* Left Eye */}
      <ellipse cx="250" cy="270" rx={state === 'surprised' ? 20 : 17} ry={state === 'surprised' ? 17 : 14} fill="#2E1065" />
      <circle cx="247" cy="266" r="5" fill="#FFFFFF" />
      <circle cx="254" cy="274" r="2.5" fill="#C084FC" />
      {/* Eyelash Wing */}
      <path d="M 228 262 Q 250 252 272 262" stroke="#2E1065" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Right Eye */}
      <ellipse cx="350" cy="270" rx={state === 'surprised' ? 20 : 17} ry={state === 'surprised' ? 17 : 14} fill="#2E1065" />
      <circle cx="347" cy="266" r="5" fill="#FFFFFF" />
      <circle cx="354" cy="274" r="2.5" fill="#C084FC" />
      {/* Eyelash Wing */}
      <path d="M 328 262 Q 350 252 372 262" stroke="#2E1065" strokeWidth="4" strokeLinecap="round" fill="none" />
    </g>
  );
};

// --- Maya Mouth / Viseme Shapes ---
const MayaMouth: React.FC<{ state: MouthState }> = ({ state }) => {
  switch (state) {
    case 'open_wide':
      return (
        <g id="maya_mouth_open_wide">
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 28 0 30 Q -30 28 -26 -8 Z" fill="#881337" />
          <path d="M -18 -8 Q 0 -10 18 -8 L 15 -1 Q 0 -3 -15 -1 Z" fill="#FFFFFF" />
          <path d="M -15 14 Q 0 8 15 14 Q 10 28 0 29 Q -10 28 -15 14 Z" fill="#FB7185" />
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 28 0 30 Q -30 28 -26 -8 Z" stroke="#3B0764" strokeWidth="3.5" fill="none" />
        </g>
      );

    case 'open_small':
      return (
        <g id="maya_mouth_open_small">
          <ellipse cx="0" cy="2" rx="18" ry="10" fill="#881337" />
          <rect x="-10" y="-3" width="20" height="5" rx="2" fill="#FFFFFF" />
          <ellipse cx="0" cy="2" rx="18" ry="10" stroke="#3B0764" strokeWidth="3.5" fill="none" />
        </g>
      );

    case 'o_shape':
      return (
        <g id="maya_mouth_o_shape">
          <circle cx="0" cy="3" r="13" fill="#881337" />
          <ellipse cx="0" cy="8" rx="7" ry="3.5" fill="#FB7185" />
          <circle cx="0" cy="3" r="13" stroke="#3B0764" strokeWidth="3.5" fill="none" />
        </g>
      );

    case 'e_shape':
      return (
        <g id="maya_mouth_e_shape">
          <rect x="-24" y="-3" width="48" height="13" rx="6.5" fill="#881337" stroke="#3B0764" strokeWidth="3.5" />
          <rect x="-18" y="-1" width="36" height="5.5" rx="2" fill="#FFFFFF" />
        </g>
      );

    case 'smile':
      return (
        <g id="maya_mouth_smile">
          <path d="M -22 -2 Q 0 15 22 -2" stroke="#BE185D" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      );

    case 'rest':
    default:
      return (
        <g id="maya_mouth_rest">
          <path d="M -16 0 Q 0 2 16 0" stroke="#BE185D" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

