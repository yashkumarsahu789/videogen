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

export const KabirCharacter: React.FC<CharacterProps> = ({
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
        {/* Skin Gradient - Warm Olive / Brown Tone */}
        <linearGradient id="kabir_skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E2A684" />
          <stop offset="100%" stopColor="#C88460" />
        </linearGradient>
        {/* Charcoal Turtleneck & Blazer */}
        <linearGradient id="kabir_turtleneck" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E2024" />
          <stop offset="100%" stopColor="#0B0C0E" />
        </linearGradient>
        {/* Hair - Sophisticated Brushed Back Charcoal */}
        <linearGradient id="kabir_hair" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#373B44" />
          <stop offset="100%" stopColor="#1E2024" />
        </linearGradient>
        <filter id="kabir_shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* BODY / CHARCOAL TURTLENECK */}
      <g id="kabir_body" transform={`translate(0, ${headY * 0.3})`}>
        {/* Broad Shoulders */}
        <path
          d="M 140 620 C 140 490, 210 470, 300 470 C 390 470, 460 490, 460 620 L 490 800 L 110 800 Z"
          fill="url(#kabir_turtleneck)"
          filter="url(#kabir_shadow)"
        />
        {/* Blazer Lapel Accents */}
        <path d="M 210 520 L 300 680 L 250 800 L 170 800 Z" fill="#2A2D34" />
        <path d="M 390 520 L 300 680 L 350 800 L 430 800 Z" fill="#2A2D34" />
        {/* High Turtleneck Collar */}
        <rect x="250" y="440" width="100" height="70" rx="14" fill="#181A1D" stroke="#333740" strokeWidth="2" />
        {/* Gold Lapel Pin */}
        <circle cx="230" cy="560" r="7" fill="#F59E0B" />
      </g>

      {/* HEAD GROUP */}
      <g
        id="kabir_head"
        transform={`translate(300, 340) rotate(${headRot}) translate(-300, -340) translate(0, ${headY})`}
      >
        {/* Neck */}
        <path d="M 265 360 L 265 460 L 335 460 L 335 360 Z" fill="#B87652" />

        {/* Ears */}
        <circle cx="180" cy="310" r="28" fill="#C88460" />
        <circle cx="180" cy="310" r="16" fill="#A86340" />
        <circle cx="420" cy="310" r="28" fill="#C88460" />
        <circle cx="420" cy="310" r="16" fill="#A86340" />

        {/* Face Shape */}
        <path
          d="M 190 230 C 190 130, 410 130, 410 230 C 410 365, 365 425, 300 425 C 235 425, 190 365, 190 230 Z"
          fill="url(#kabir_skin)"
          filter="url(#kabir_shadow)"
        />

        {/* Trimmed Jaw Beard & Stubble */}
        <path
          d="M 195 300 C 195 380, 240 425, 300 425 C 360 425, 405 380, 405 300 C 405 340, 385 410, 300 410 C 215 410, 195 340, 195 300 Z"
          fill="#1C1E22"
          opacity="0.9"
        />
        {/* Mustache Contour */}
        <path
          d="M 265 340 Q 300 334 335 340 Q 300 354 265 340 Z"
          fill="#1C1E22"
          opacity="0.85"
        />

        {/* Hair - Brushed Back Mature Cut */}
        <path
          d="M 170 210 C 170 90, 430 90, 430 210 C 440 270, 430 310, 420 320 C 420 200, 400 110, 300 110 C 200 110, 180 200, 180 320 C 170 310, 160 270, 170 210 Z"
          fill="#15171A"
        />
        <path
          d="M 180 180 C 200 100, 280 85, 360 95 C 420 105, 425 150, 415 190 C 385 140, 330 130, 280 145 C 230 160, 200 165, 180 180 Z"
          fill="url(#kabir_hair)"
        />
        {/* Subtle Silver Sheen */}
        <path d="M 240 110 C 280 100, 340 105, 370 120" stroke="#71717A" strokeWidth="4" strokeLinecap="round" />

        {/* Eyebrows */}
        <KabirEyebrows state={eyebrowState} />

        {/* Eyes (Left & Right) */}
        <KabirEyes state={eyeState} />

        {/* Strong Chiseled Nose */}
        <path d="M 300 270 L 294 308 L 306 312" stroke="#A86340" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

        {/* Dynamic Mouth (Visemes) */}
        <g transform="translate(300, 365)">
          <KabirMouth state={mouthState} />
        </g>
      </g>
    </svg>
  );
};

const KabirEyebrows: React.FC<{ state: EyebrowState }> = ({ state }) => {
  let leftY = 224;
  let rightY = 224;
  let leftRot = 0;
  let rightRot = 0;

  if (state === 'raised') {
    leftY = 214;
    rightY = 214;
  } else if (state === 'curious') {
    leftY = 210;
    rightY = 226;
    leftRot = -8;
    rightRot = 6;
  }

  return (
    <g id="kabir_eyebrows">
      <path
        d={`M 210 ${leftY + 6} Q 245 ${leftY - 8} 280 ${leftY + 2}`}
        stroke="#15171A"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${leftRot}, 245, ${leftY})`}
      />
      <path
        d={`M 320 ${rightY + 2} Q 355 ${rightY - 8} 390 ${rightY + 6}`}
        stroke="#15171A"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
        transform={`rotate(${rightRot}, 355, ${rightY})`}
      />
    </g>
  );
};

const KabirEyes: React.FC<{ state: EyeState }> = ({ state }) => {
  if (state === 'blink') {
    return (
      <g id="kabir_eyes_blink">
        <path d="M 220 268 Q 245 280 270 268" stroke="#15171A" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <path d="M 330 268 Q 355 280 380 268" stroke="#15171A" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }

  if (state === 'wink') {
    return (
      <g id="kabir_eyes_wink">
        <path d="M 220 268 Q 245 280 270 268" stroke="#15171A" strokeWidth="5.5" strokeLinecap="round" fill="none" />
        <circle cx="355" cy="265" r="14" fill="#15171A" />
        <circle cx="352" cy="262" r="4.5" fill="#FFFFFF" />
      </g>
    );
  }

  return (
    <g id="kabir_eyes_open">
      {/* Left Eye */}
      <circle cx="245" cy="265" r={state === 'surprised' ? 17 : 14} fill="#15171A" />
      <circle cx="242" cy="262" r="4.5" fill="#FFFFFF" />
      {/* Right Eye */}
      <circle cx="355" cy="265" r={state === 'surprised' ? 17 : 14} fill="#15171A" />
      <circle cx="352" cy="262" r="4.5" fill="#FFFFFF" />
    </g>
  );
};

const KabirMouth: React.FC<{ state: MouthState }> = ({ state }) => {
  switch (state) {
    case 'open_wide':
      return (
        <g id="kabir_mouth_open_wide">
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 26 0 28 Q -30 26 -26 -8 Z" fill="#7F1D1D" />
          <path d="M -18 -8 Q 0 -10 18 -8 L 14 -1 Q 0 -3 -14 -1 Z" fill="#FFFFFF" />
          <path d="M -14 14 Q 0 8 14 14 Q 10 26 0 27 Q -10 26 -14 14 Z" fill="#EF4444" />
          <path d="M -26 -8 Q 0 -12 26 -8 Q 30 26 0 28 Q -30 26 -26 -8 Z" stroke="#15171A" strokeWidth="4" fill="none" />
        </g>
      );
    case 'open_small':
      return (
        <g id="kabir_mouth_open_small">
          <ellipse cx="0" cy="2" rx="18" ry="10" fill="#7F1D1D" />
          <rect x="-10" y="-3" width="20" height="5" rx="2" fill="#FFFFFF" />
          <ellipse cx="0" cy="2" rx="18" ry="10" stroke="#15171A" strokeWidth="4" fill="none" />
        </g>
      );
    case 'o_shape':
      return (
        <g id="kabir_mouth_o_shape">
          <circle cx="0" cy="3" r="13" fill="#7F1D1D" />
          <ellipse cx="0" cy="8" rx="7" ry="3.5" fill="#EF4444" />
          <circle cx="0" cy="3" r="13" stroke="#15171A" strokeWidth="4" fill="none" />
        </g>
      );
    case 'e_shape':
      return (
        <g id="kabir_mouth_e_shape">
          <rect x="-24" y="-3" width="48" height="13" rx="6.5" fill="#7F1D1D" stroke="#15171A" strokeWidth="4" />
          <rect x="-18" y="-1" width="36" height="5" rx="2" fill="#FFFFFF" />
        </g>
      );
    case 'smile':
      return (
        <g id="kabir_mouth_smile">
          <path d="M -22 -2 Q 0 14 22 -2" stroke="#15171A" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );
    case 'rest':
    default:
      return (
        <g id="kabir_mouth_rest">
          <path d="M -16 0 Q 0 2 16 0" stroke="#15171A" strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      );
  }
};

