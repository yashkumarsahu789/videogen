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

export const RiyaCharacter: React.FC<CharacterProps> = ({
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
        <linearGradient id="riya_skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1E8" />
          <stop offset="100%" stopColor="#FBD5C2" />
        </linearGradient>
        <linearGradient id="riya_sweater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="riya_hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
        <filter id="riya_shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* BODY / MUSTARD SWEATER */}
      <g id="riya_body" transform={`translate(0, ${headY * 0.3})`}>
        <path
          d="M 160 620 C 160 500, 220 480, 300 480 C 380 480, 440 500, 440 620 L 470 800 L 130 800 Z"
          fill="url(#riya_sweater)"
          filter="url(#riya_shadow)"
        />
        {/* White Peter Pan Collar */}
        <path d="M 235 480 C 255 520, 290 520, 300 495 C 290 480, 255 470, 235 480 Z" fill="#FFFFFF" />
        <path d="M 365 480 C 345 520, 310 520, 300 495 C 310 480, 345 470, 365 480 Z" fill="#FFFFFF" />
        {/* Sweater Knit Texture Lines */}
        <line x1="280" y1="550" x2="280" y2="780" stroke="#B45309" strokeWidth="2.5" strokeDasharray="4 4" />
        <line x1="320" y1="550" x2="320" y2="780" stroke="#B45309" strokeWidth="2.5" strokeDasharray="4 4" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="riya_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Neck */}
        <path d="M 270 360 L 270 480 L 330 480 L 330 360 Z" fill="#F4C2AB" />

        {/* Hair - Back Wavy Ponytail Volume */}
        <path
          d="M 150 220 C 150 80, 450 80, 450 220 C 460 340, 430 420, 390 440 C 410 320, 390 130, 300 130 C 210 130, 190 320, 210 440 C 170 420, 140 340, 150 220 Z"
          fill="#451A03"
        />

        {/* Ears */}
        <circle cx="185" cy="310" r="24" fill="#FBD5C2" />
        <circle cx="415" cy="310" r="24" fill="#FBD5C2" />

        {/* Face Shape */}
        <path
          d="M 195 240 C 195 140, 405 140, 405 240 C 405 365, 355 415, 300 415 C 245 415, 195 365, 195 240 Z"
          fill="url(#riya_skin)"
          filter="url(#riya_shadow)"
        />

        {/* Rosy Cheeks (Blush) */}
        <ellipse cx="225" cy="310" rx="18" ry="10" fill="#FDA4AF" opacity="0.45" />
        <ellipse cx="375" cy="310" rx="18" ry="10" fill="#FDA4AF" opacity="0.45" />

        {/* Hair - Front Bangs */}
        <path
          d="M 175 210 C 190 110, 260 95, 340 100 C 420 105, 430 160, 420 220 C 390 160, 350 160, 310 180 C 270 200, 220 180, 175 210 Z"
          fill="url(#riya_hair)"
        />
        {/* Cute Emerald Hair Clip */}
        <rect x="360" y="145" width="28" height="10" rx="5" fill="#10B981" transform="rotate(15, 360, 145)" />

        {/* Eyebrows */}
        <RiyaEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <RiyaEyes state={eyeState} />

        {/* Cute Button Nose */}
        <path d="M 296 295 Q 300 302 304 295" stroke="#E2A690" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Dynamic Mouth (Visemes) */}
        <g transform="translate(300, 355)">
          <RiyaMouth state={mouthState} />
        </g>
      </g>
    </svg>
  );
};

const RiyaEyebrows: React.FC<{ state: EyebrowState }> = ({ state }) => {
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
    <g id="riya_eyebrows">
      <path
        d={`M 220 ${leftY + 2} Q 248 ${leftY - 8} 275 ${leftY}`}
        stroke="#451A03"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${leftRot}, 248, ${leftY})`}
      />
      <path
        d={`M 325 ${rightY} Q 352 ${rightY - 8} 380 ${rightY + 2}`}
        stroke="#451A03"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${rightRot}, 352, ${rightY})`}
      />
    </g>
  );
};

const RiyaEyes: React.FC<{ state: EyeState }> = ({ state }) => {
  if (state === 'blink') {
    return (
      <g id="riya_eyes_blink">
        <path d="M 225 272 Q 250 284 275 272" stroke="#451A03" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 325 272 Q 350 284 375 272" stroke="#451A03" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  if (state === 'wink') {
    return (
      <g id="riya_eyes_wink">
        <path d="M 225 272 Q 250 284 275 272" stroke="#451A03" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <circle cx="350" cy="270" r="16" fill="#451A03" />
        <circle cx="347" cy="266" r="5" fill="#FFFFFF" />
        <circle cx="353" cy="273" r="2.5" fill="#F59E0B" />
      </g>
    );
  }

  return (
    <g id="riya_eyes_open">
      {/* Left Eye */}
      <circle cx="250" cy="270" r={state === 'surprised' ? 19 : 16} fill="#451A03" />
      <circle cx="247" cy="266" r="5" fill="#FFFFFF" />
      <circle cx="253" cy="273" r="2.5" fill="#F59E0B" />
      <path d="M 230 263 Q 250 254 270 263" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* Right Eye */}
      <circle cx="350" cy="270" r={state === 'surprised' ? 19 : 16} fill="#451A03" />
      <circle cx="347" cy="266" r="5" fill="#FFFFFF" />
      <circle cx="353" cy="273" r="2.5" fill="#F59E0B" />
      <path d="M 330 263 Q 350 254 370 263" stroke="#451A03" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </g>
  );
};

const RiyaMouth: React.FC<{ state: MouthState }> = ({ state }) => {
  switch (state) {
    case 'open_wide':
      return (
        <g id="riya_mouth_open_wide">
          <path d="M -24 -8 Q 0 -12 24 -8 Q 28 26 0 28 Q -28 26 -24 -8 Z" fill="#9F1239" />
          <path d="M -16 -8 Q 0 -10 16 -8 L 13 -1 Q 0 -3 -13 -1 Z" fill="#FFFFFF" />
          <path d="M -13 14 Q 0 8 13 14 Q 9 26 0 27 Q -9 26 -13 14 Z" fill="#FB7185" />
          <path d="M -24 -8 Q 0 -12 24 -8 Q 28 26 0 28 Q -28 26 -24 -8 Z" stroke="#451A03" strokeWidth="3.5" fill="none" />
        </g>
      );
    case 'open_small':
      return (
        <g id="riya_mouth_open_small">
          <ellipse cx="0" cy="2" rx="17" ry="9.5" fill="#9F1239" />
          <rect x="-9" y="-3" width="18" height="4.5" rx="2" fill="#FFFFFF" />
          <ellipse cx="0" cy="2" rx="17" ry="9.5" stroke="#451A03" strokeWidth="3.5" fill="none" />
        </g>
      );
    case 'o_shape':
      return (
        <g id="riya_mouth_o_shape">
          <circle cx="0" cy="3" r="12" fill="#9F1239" />
          <ellipse cx="0" cy="8" rx="6.5" ry="3" fill="#FB7185" />
          <circle cx="0" cy="3" r="12" stroke="#451A03" strokeWidth="3.5" fill="none" />
        </g>
      );
    case 'e_shape':
      return (
        <g id="riya_mouth_e_shape">
          <rect x="-22" y="-3" width="44" height="12" rx="6" fill="#9F1239" stroke="#451A03" strokeWidth="3.5" />
          <rect x="-16" y="-1" width="32" height="5" rx="2" fill="#FFFFFF" />
        </g>
      );
    case 'smile':
      return (
        <g id="riya_mouth_smile">
          <path d="M -22 -2 Q 0 15 22 -2" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'rest':
    default:
      return (
        <g id="riya_mouth_rest">
          <path d="M -15 0 Q 0 2 15 0" stroke="#E11D48" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

