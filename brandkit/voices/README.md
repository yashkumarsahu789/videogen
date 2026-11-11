# 🎙️ Universal Voice Suite (`brandkit/voices/`)

This directory houses the **5 open-source / neural voice personas** configured for your AI Video Studio.

---

## 👥 The 5 Voice Personas

| Voice ID | Name | Gender | Language Style | Best Use Case |
|---|---|---|---|---|
| `aarav` | **Aarav** | Male | Hinglish / Hindi | Relatable tech creator, storytelling, tutorials |
| `ananya` | **Ananya** | Female | Hinglish / Hindi | Energetic, high-retention reels, product hooks |
| `kabir` | **Kabir** | Male | Hindi / English | Deep, authoritative, cinematic, podcast explainers |
| `riya` | **Riya** | Female | Hindi / English | Friendly, approachable, lifestyle vlogs, Q&A |
| `dev` | **Dev** | Male | Hinglish / English | Fast-paced, punchy, rapid 30s coding tips |

---

## ⚡ How to Generate Voiceover (Single Command)

Use the unified Python CLI `tts_engine.py`:

```bash
# Basic generation
python brandkit/voices/tts_engine.py --voice aarav --text "Namaste dosto, swagat hai!" --output my_audio.mp3

# Read script from a text file
python brandkit/voices/tts_engine.py --voice ananya --file script.txt --output voiceover.mp3

# Custom speech rate / pitch
python brandkit/voices/tts_engine.py --voice dev --rate "+20%" --pitch "+2Hz" --text "Check this out!" --output speed_tip.mp3

# List all available voices
python brandkit/voices/tts_engine.py --list
```

### 🔄 Automatic Outputs:
Every time you run `tts_engine.py`, it automatically generates:
1. Master High-Quality Audio (`.mp3` or `.wav`).
2. Normalized **16kHz Mono WAV (`_16k.wav`)** ready for instant Whisper transcription and Puppet lip-syncing!

