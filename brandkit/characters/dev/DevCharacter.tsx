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
        {/* Modern Crisp Navy Tailored Shirt with White Inner Crewneck */}
        <path
          d="M 140 610 C 140 480, 210 455, 300 455 C 390 455, 460 480, 460 610 L 490 800 L 110 800 Z"
          fill="#1E293B"
          filter="url(#dev_shadow)"
        />
        {/* White Inner Crewneck Collar */}
        <path d="M 260 455 C 260 495, 340 495, 340 455 Z" fill="#F8FAFC" />
        {/* Open Shirt Collar & Buttons */}
        <path d="M 235 455 L 270 515 L 255 530" stroke="#334155" strokeWidth="3" fill="#1E293B" />
        <path d="M 365 455 L 330 515 L 345 530" stroke="#334155" strokeWidth="3" fill="#1E293B" />
        <line x1="300" y1="510" x2="300" y2="780" stroke="#0F172A" strokeWidth="3.5" />
        <circle cx="300" cy="545" r="3" fill="#CBD5E1" />
        <circle cx="300" cy="590" r="3" fill="#CBD5E1" />
        {/* Modern Minimalist Smartwatch */}
        <rect x="445" y="660" width="22" height="32" rx="6" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="dev_head"
        transform={`translate(300, 335) rotate(${headRot}) translate(-300, -335) translate(0, ${headY})`}
      >
        {/* Strong Masculine Neck */}
        <path d="M 262 350 L 262 470 L 338 470 L 338 350 Z" fill="#C5855A" />
        <path d="M 262 350 C 275 372, 325 372, 338 350 L 338 382 L 262 382 Z" fill="#B06E44" opacity="0.6" />
        <circle cx="178" cy="310" r="26" fill="#C5855A" />
        <circle cx="422" cy="310" r="26" fill="#C5855A" />

        {/* Sharp Masculine Real-Human Jawline */}
        <path
          d="M 188 230 C 188 130, 412 130, 412 230 C 412 360, 365 418, 300 418 C 235 418, 188 360, 188 230 Z"
          fill="#E8A779"
          filter="url(#dev_shadow)"
        />

        {/* Groomed 5 O'Clock Stubble / Beard Shadow */}
        <path d="M 194 310 C 194 380, 240 418, 300 418 C 360 418, 406 380, 406 310 C 406 345, 385 405, 300 405 C 215 405, 194 345, 194 310 Z" fill="#1C1815" opacity="0.45" />
        <path d="M 268 340 Q 300 334 332 340 Q 300 350 268 340 Z" fill="#1C1815" opacity="0.4" />

        {/* Modern Textured Fade Haircut (No Cartoon Spikes) */}
        <path
          d="M 175 190 C 185 110, 255 85, 335 90 C 410 95, 425 140, 418 190 C 395 140, 345 130, 295 142 C 245 154, 205 160, 175 190 Z"
          fill="#1C1917"
        />
        <path
          d="M 182 170 C 210 90, 280 75, 355 82 C 405 88, 420 120, 415 165 C 385 110, 330 102, 280 115 C 230 128, 200 135, 182 170 Z"
          fill="#292524"
        />
        {/* Fade Sides Hair */}
        <path d="M 172 210 C 172 170, 185 145, 200 135 L 188 220 Z" fill="#1C1917" opacity="0.85" />
        <path d="M 428 210 C 428 170, 415 145, 400 135 L 412 220 Z" fill="#1C1917" opacity="0.85" />

        {/* Eyebrows */}
        <DevEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <DevEyes state={eyeState} />

        {/* Defined Masculine Nose */}
        <path d="M 300 265 L 294 306 L 306 310" stroke="#A8653C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />

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

