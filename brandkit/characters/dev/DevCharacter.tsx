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

export const DevCharacter: React.FC<CharacterProps> = ({
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
        <linearGradient id="dev_skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEE4D7" />
          <stop offset="100%" stopColor="#F6C3AE" />
        </linearGradient>
        <linearGradient id="dev_jacket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
        <linearGradient id="dev_hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>
        <filter id="dev_shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* BODY / TECHWEAR BOMBER */}
      <g id="dev_body" transform={`translate(0, ${headY * 0.3})`}>
        <path
          d="M 150 620 C 150 490, 220 470, 300 470 C 380 470, 450 490, 450 620 L 480 800 L 120 800 Z"
          fill="url(#dev_jacket)"
          filter="url(#dev_shadow)"
        />
        {/* Neon Green Zipper Track */}
        <line x1="300" y1="470" x2="300" y2="800" stroke="#10B981" strokeWidth="4" />
        {/* Chest Graphic Badge */}
        <rect x="210" y="550" width="45" height="22" rx="4" fill="#047857" stroke="#34D399" strokeWidth="2" />
        <text x="232" y="566" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="monospace">DEV</text>

        {/* Gaming Headphones Around Neck */}
        <path d="M 210 470 C 210 540, 390 540, 390 470" stroke="#27272A" strokeWidth="22" strokeLinecap="round" fill="none" />
        <path d="M 210 470 C 210 540, 390 540, 390 470" stroke="#10B981" strokeWidth="6" strokeLinecap="round" fill="none" />
        {/* Earcups */}
        <ellipse cx="205" cy="460" rx="20" ry="26" fill="#18181B" stroke="#10B981" strokeWidth="3" />
        <ellipse cx="395" cy="460" rx="20" ry="26" fill="#18181B" stroke="#10B981" strokeWidth="3" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="dev_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Neck */}
        <path d="M 268 360 L 268 470 L 332 470 L 332 360 Z" fill="#E8B09A" />

        {/* Ears */}
        <circle cx="180" cy="305" r="26" fill="#F6C3AE" />
        <circle cx="180" cy="305" r="14" fill="#DF9F88" />
        <circle cx="420" cy="305" r="26" fill="#F6C3AE" />
        <circle cx="420" cy="305" r="14" fill="#DF9F88" />

        {/* Face Shape */}
        <path
          d="M 195 240 C 195 140, 405 140, 405 240 C 405 365, 360 418, 300 418 C 240 418, 195 365, 195 240 Z"
          fill="url(#dev_skin)"
          filter="url(#dev_shadow)"
        />

        {/* Hair - Spiky Dynamic Silhouette */}
        <path
          d="M 170 230 C 160 140, 200 90, 250 80 L 270 45 L 300 70 L 340 40 L 360 75 L 410 65 L 430 140 C 440 220, 430 300, 420 320 C 420 200, 400 120, 300 120 C 200 120, 180 200, 180 320 C 170 300, 160 270, 170 230 Z"
          fill="#18181B"
        />
        {/* Front Hair Spikes */}
        <path
          d="M 180 200 C 200 130, 240 100, 300 100 C 360 100, 410 130, 420 200 C 390 160, 360 160, 330 180 C 310 160, 280 150, 250 170 C 220 160, 200 180, 180 200 Z"
          fill="url(#dev_hair)"
        />
        {/* Neon Green Spiked Highlights */}
        <path d="M 265 60 L 290 85" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
        <path d="M 335 55 L 350 85" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />

        {/* Eyebrows */}
        <DevEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <DevEyes state={eyeState} />

        {/* Sharp Nose */}
        <path d="M 300 275 L 295 306 L 306 310" stroke="#DF9F88" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Dynamic Mouth (Visemes) */}
        <g transform="translate(300, 360)">
          <DevMouth state={mouthState} />
        </g>
      </g>
    </svg>
  );
};

const DevEyebrows: React.FC<{ state: EyebrowState }> = ({ state }) => {
  let leftY = 226;
  let rightY = 226;
  let leftRot = 0;
  let rightRot = 0;

  if (state === 'raised') {
    leftY = 216;
    rightY = 216;
  } else if (state === 'curious') {
    leftY = 210;
    rightY = 228;
    leftRot = -9;
    rightRot = 6;
  }

  return (
    <g id="dev_eyebrows">
      <path
        d={`M 215 ${leftY + 6} Q 245 ${leftY - 8} 275 ${leftY + 1}`}
        stroke="#18181B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${leftRot}, 245, ${leftY})`}
      />
      <path
        d={`M 325 ${rightY + 1} Q 355 ${rightY - 8} 385 ${rightY + 6}`}
        stroke="#18181B"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${rightRot}, 355, ${rightY})`}
      />
    </g>
  );
};

const DevEyes: React.FC<{ state: EyeState }> = ({ state }) => {
  if (state === 'blink') {
    return (
      <g id="dev_eyes_blink">
        <path d="M 225 272 Q 248 284 270 272" stroke="#18181B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <path d="M 330 272 Q 352 284 375 272" stroke="#18181B" strokeWidth="5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  if (state === 'wink') {
    return (
      <g id="dev_eyes_wink">
        <path d="M 225 272 Q 248 284 270 272" stroke="#18181B" strokeWidth="5" strokeLinecap="round" fill="none" />
        <circle cx="352" cy="268" r="14" fill="#09090B" />
        <circle cx="349" cy="265" r="4.5" fill="#FFFFFF" />
        <circle cx="355" cy="271" r="2.5" fill="#10B981" />
      </g>
    );
  }

  return (
    <g id="dev_eyes_open">
      {/* Left Eye */}
      <circle cx="248" cy="268" r={state === 'surprised' ? 17 : 14} fill="#09090B" />
      <circle cx="245" cy="265" r="4.5" fill="#FFFFFF" />
      <circle cx="251" cy="271" r="2.5" fill="#10B981" />

      {/* Right Eye */}
      <circle cx="352" cy="268" r={state === 'surprised' ? 17 : 14} fill="#09090B" />
      <circle cx="349" cy="265" r="4.5" fill="#FFFFFF" />
      <circle cx="355" cy="271" r="2.5" fill="#10B981" />
    </g>
  );
};

const DevMouth: React.FC<{ state: MouthState }> = ({ state }) => {
  switch (state) {
    case 'open_wide':
      return (
        <g id="dev_mouth_open_wide">
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 28 0 30 Q -30 28 -26 -8 Z" fill="#881337" />
          <path d="M -18 -8 Q 0 -10 18 -8 L 14 -1 Q 0 -3 -14 -1 Z" fill="#FFFFFF" />
          <path d="M -14 15 Q 0 9 14 15 Q 10 28 0 29 Q -10 28 -14 15 Z" fill="#F43F5E" />
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 28 0 30 Q -30 28 -26 -8 Z" stroke="#18181B" strokeWidth="4" fill="none" />
        </g>
      );
    case 'open_small':
      return (
        <g id="dev_mouth_open_small">
          <ellipse cx="0" cy="2" rx="19" ry="10" fill="#881337" />
          <rect x="-11" y="-3" width="22" height="5" rx="2" fill="#FFFFFF" />
          <ellipse cx="0" cy="2" rx="19" ry="10" stroke="#18181B" strokeWidth="4" fill="none" />
        </g>
      );
    case 'o_shape':
      return (
        <g id="dev_mouth_o_shape">
          <circle cx="0" cy="3" r="13" fill="#881337" />
          <ellipse cx="0" cy="8" rx="7" ry="3.5" fill="#F43F5E" />
          <circle cx="0" cy="3" r="13" stroke="#18181B" strokeWidth="4" fill="none" />
        </g>
      );
    case 'e_shape':
      return (
        <g id="dev_mouth_e_shape">
          <rect x="-24" y="-3" width="48" height="13" rx="6.5" fill="#881337" stroke="#18181B" strokeWidth="4" />
          <rect x="-18" y="-1" width="36" height="5.5" rx="2" fill="#FFFFFF" />
        </g>
      );
    case 'smile':
      return (
        <g id="dev_mouth_smile">
          <path d="M -22 -2 Q 0 16 22 -2" stroke="#18181B" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'rest':
    default:
      return (
        <g id="dev_mouth_rest">
          <path d="M -16 0 Q 0 2 16 0" stroke="#18181B" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

