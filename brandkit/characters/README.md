# 🎭 Code-Driven Vector Puppets & Lip-Sync Suite (`brandkit/characters/`)

This directory contains **100% code-driven characters** designed for procedural lip-syncing, natural eye-blinking, and dynamic head motion in your video edits.

---

## 👥 The 2 Vector Characters

1. **👨‍💻 Alex (The Vibe Coder / Creator)**
   - Located at: [`alex/AlexCharacter.tsx`](file:///c:/Users/yashk/vibdecoding/brandkit/characters/alex/AlexCharacter.tsx)
   - Aesthetic: Slate hoodie, cyan drawstrings, stylish modern glasses, expressive animated eyebrows.

2. **👩‍🎨 Maya (The AI Creative Director)**
   - Located at: [`maya/MayaCharacter.tsx`](file:///c:/Users/yashk/vibdecoding/brandkit/characters/maya/MayaCharacter.tsx)
   - Aesthetic: Cyber-tech high-collar jacket with magenta trim, sleek violet bob, almond eyes with catchlights.

---

## 👄 6 Parametric Visemes (Mouth Shapes)

Both characters implement standard viseme mouth states:
* `rest`: Neutral mouth line (silence / pauses).
* `open_small`: Subtle teeth parting for consonants (*B, D, F, G, K, L, M, N, P, S, T*).
* `open_wide`: Jaw-drop open mouth for open vowels (*AA, AH, HA*).
* `o_shape`: Rounded circular mouth for round vowels (*O, OO, W, U*).
* `e_shape`: Wide horizontal smile with visible teeth line for spread vowels (*EE, AY, I*).
* `smile`: Warm closed smile for friendly pauses.

---

## ⚡ How to Sync Any Audio to Mouth Movement (1 Command)

Pass any speech audio file into the audio analyzer:

```bash
python brandkit/characters/engine/audio_to_visemes.py -i voiceover.mp3 -o visemes.json --fps 30
```

### What this produces:
A clean frame-by-frame JSON file containing:
* `mouth`: Exact mouth shape for that frame (`open_wide`, `e_shape`, `rest`, etc.)
* `eyes`: Natural blinks triggered every 2.5–3.5s automatically (`open` / `blink`)
* `headY` & `headRot`: Subtle procedural breathing and speech-reactive head bobbing.

---

## 🖥️ Interactive Browser Studio

Double-click or open [**`interactive_studio.html`**](file:///c:/Users/yashk/vibdecoding/brandkit/characters/interactive_studio.html) in any web browser to:
* Test Alex & Maya side-by-side.
* Click and preview all 6 mouth shapes and 4 eye states in real-time.
* Toggle the **Auto Speech Simulator** to watch them talk live!

