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

      {/* BODY / MODERN CHIC BLAZER */}
      <g id="maya_body" transform={`translate(0, ${headY * 0.3})`}>
        {/* Modern Sharp Tailored Blazer */}
        <path
          d="M 145 610 C 145 490, 210 460, 300 460 C 390 460, 455 490, 455 610 L 485 800 L 115 800 Z"
          fill="#0F172A"
          filter="url(#maya_shadow)"
        />
        {/* Deep V-Neck Inner Silk Top */}
        <path
          d="M 240 460 L 300 550 L 360 460 Z"
          fill="#0284C7"
        />
        {/* Minimalist Electric Cyan Lapel Piping */}
        <path d="M 235 460 L 295 565 L 300 780" stroke="#06B6D4" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 365 460 L 305 565" stroke="#06B6D4" strokeWidth="3.5" strokeLinecap="round" />
        {/* Modern Silver Clasp */}
        <rect x="294" y="558" width="12" height="6" rx="3" fill="#E2E8F0" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="maya_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Elegant Neck & Shadow */}
        <path d="M 268 355 L 268 475 L 332 475 L 332 355 Z" fill="#E2A688" />
        <path d="M 268 355 C 280 375, 320 375, 332 355 L 332 390 L 268 390 Z" fill="#D49372" opacity="0.6" />

        {/* Modern Titanium Hoop Earrings */}
        <ellipse cx="178" cy="318" rx="4" ry="12" fill="none" stroke="#38BDF8" strokeWidth="3" />
        <ellipse cx="422" cy="318" rx="4" ry="12" fill="none" stroke="#38BDF8" strokeWidth="3" />

        {/* Ears */}
        <circle cx="185" cy="310" r="24" fill="#F7C6B0" />
        <circle cx="415" cy="310" r="24" fill="#F7C6B0" />

        {/* Refined Face Structure */}
        <path
          d="M 192 235 C 192 135, 408 135, 408 235 C 408 360, 355 412, 300 412 C 245 412, 192 360, 192 235 Z"
          fill="#FCE7D8"
          filter="url(#maya_shadow)"
        />

        {/* Sleek Asymmetrical Modern Bob Hair (Back) */}
        <path
          d="M 160 210 C 160 80, 440 80, 440 210 C 452 310, 432 375, 395 395 C 405 270, 385 110, 300 110 C 215 110, 195 270, 205 395 C 168 375, 148 310, 160 210 Z"
          fill="#18181B"
        />

        {/* Chic Layered Front Bangs with Subtle Violet & Cyan Highlights */}
        <path
          d="M 170 200 C 190 100, 260 85, 340 90 C 420 95, 435 145, 422 230 C 400 160, 345 155, 295 175 C 245 195, 205 180, 170 200 Z"
          fill="#27272A"
        />
        <path
          d="M 230 105 C 270 95, 340 100, 375 130"
          stroke="#A855F7"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 255 120 C 290 112, 335 118, 360 142"
          stroke="#06B6D4"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Eyebrows */}
        <MayaEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <MayaEyes state={eyeState} />

        {/* Sculpted Nose */}
        <path d="M 300 280 C 297 298, 293 306, 304 310" stroke="#D49372" strokeWidth="3" strokeLinecap="round" fill="none" />

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

