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
        {/* Real Human Warm Elegant Outfit (Emerald Tailored Kurti/Blazer) */}
        <path
          d="M 150 610 C 150 490, 215 460, 300 460 C 385 460, 450 490, 450 610 L 480 800 L 120 800 Z"
          fill="#0F766E"
          filter="url(#riya_shadow)"
        />
        {/* Gold Zari Accent Border */}
        <path d="M 245 460 L 300 545 L 355 460 Z" fill="#134E4A" />
        <path d="M 245 460 L 300 545 L 355 460" stroke="#F59E0B" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <line x1="300" y1="545" x2="300" y2="780" stroke="#F59E0B" strokeWidth="2.5" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="riya_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Natural Warm Indian Skin Neck */}
        <path d="M 268 355 L 268 475 L 332 475 L 332 355 Z" fill="#E29B63" />
        <path d="M 268 355 C 280 375, 320 375, 332 355 L 332 385 L 268 385 Z" fill="#C97E4A" opacity="0.5" />

        {/* Delicate Gold Ear Studs */}
        <circle cx="182" cy="312" r="5" fill="#F59E0B" />
        <circle cx="418" cy="312" r="5" fill="#F59E0B" />

        {/* Ears */}
        <circle cx="185" cy="310" r="24" fill="#E29B63" />
        <circle cx="415" cy="310" r="24" fill="#E29B63" />

        {/* Realistic Human Face Proportions (Warm Indian Skin) */}
        <path
          d="M 192 235 C 192 135, 408 135, 408 235 C 408 360, 355 412, 300 412 C 245 412, 192 360, 192 235 Z"
          fill="#F4C7A5"
          filter="url(#riya_shadow)"
        />

        {/* Rosy Cheeks (Blush) */}
        <ellipse cx="228" cy="308" rx="20" ry="11" fill="#F87171" opacity="0.32" />
        <ellipse cx="372" cy="308" rx="20" ry="11" fill="#F87171" opacity="0.32" />

        {/* Natural Voluminous Layered Dark Hair (Back) */}
        <path
          d="M 140 210 C 140 70, 460 70, 460 210 C 472 335, 440 425, 395 445 C 418 315, 395 120, 300 120 C 205 120, 182 315, 205 445 C 160 425, 128 335, 140 210 Z"
          fill="#1F1610"
        />

        {/* Soft Wavy Hair Strands Framing Face */}
        <path
          d="M 165 200 C 180 95, 255 80, 340 85 C 420 90, 435 150, 425 215 C 395 150, 355 150, 315 172 C 275 194, 218 172, 165 200 Z"
          fill="#2E1C13"
        />
        <path d="M 165 230 C 175 320, 195 380, 210 420" stroke="#2E1C13" strokeWidth="7" strokeLinecap="round" fill="none" />
        <path d="M 435 230 C 425 320, 405 380, 390 420" stroke="#2E1C13" strokeWidth="7" strokeLinecap="round" fill="none" />

        {/* Eyebrows */}
        <RiyaEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <RiyaEyes state={eyeState} />

        {/* Delicate Natural Nose */}
        <path d="M 298 275 L 295 305 L 305 308" stroke="#C97E4A" strokeWidth="3" strokeLinecap="round" fill="none" />

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

