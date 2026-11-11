#!/usr/bin/env python3
"""
Universal Voice Synthesis Engine for AI Video Studio.
Supports 5 distinct open-source personalities (Aarav, Ananya, Kabir, Riya, Dev).
"""

import os
import sys
import json
import asyncio
import argparse
import subprocess
from pathlib import Path

VOICES_JSON_PATH = Path(__file__).parent / "voices.json"

def load_voices():
    if not VOICES_JSON_PATH.exists():
        print(f"Error: {VOICES_JSON_PATH} not found!")
        sys.exit(1)
    with open(VOICES_JSON_PATH, "r", encoding="utf-8") as f:
        return json.load(f)["voices"]

async def synthesize_async(voice_id: str, text: str, output_path: str, rate: str = None, pitch: str = None):
    voices = load_voices()
    if voice_id not in voices:
        print(f"Error: Unknown voice '{voice_id}'. Available: {', '.join(voices.keys())}")
        sys.exit(1)
    
    cfg = voices[voice_id]
    model_voice = cfg["model_voice"]
    effective_rate = rate or cfg.get("rate", "+0%")
    effective_pitch = pitch or cfg.get("pitch", "+0Hz")
    
    out_file = Path(output_path).resolve()
    out_file.parent.mkdir(parents=True, exist_ok=True)
    
    import edge_tts
    communicate = edge_tts.Communicate(
        text=text,
        voice=model_voice,
        rate=effective_rate,
        pitch=effective_pitch
    )
    
    # Save audio (typically MP3)
    temp_mp3 = out_file if out_file.suffix.lower() == ".mp3" else out_file.with_suffix(".mp3")
    await communicate.save(str(temp_mp3))
    
    # If user asked for WAV, convert with ffmpeg
    if out_file.suffix.lower() == ".wav":
        cmd = ["ffmpeg", "-y", "-i", str(temp_mp3), "-ar", "44100", "-ac", "2", str(out_file)]
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if temp_mp3 != out_file and temp_mp3.exists():
            temp_mp3.unlink()
    
    # Also generate a 16kHz mono WAV for Whisper Lip-Sync alignment
    wav_16k = out_file.parent / f"{out_file.stem}_16k.wav"
    subprocess.run(
        ["ffmpeg", "-y", "-i", str(out_file), "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", str(wav_16k)],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
        check=True
    )
    
    # Get exact duration
    duration = get_audio_duration(str(out_file))
    print(f"✓ Speech generated successfully!")
    print(f"  Voice: {cfg['name']} ({voice_id}) [{cfg['language']}]")
    print(f"  Output: {out_file} ({duration:.2f}s)")
    print(f"  Lip-Sync Sync file: {wav_16k}")
    return duration

def get_audio_duration(path: str) -> float:
    try:
        res = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", path],
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            text=True,
            check=True
        )
        return float(res.stdout.strip())
    except Exception:
        return 0.0

def main():
    parser = argparse.ArgumentParser(description="AI Studio Universal Voice Synthesizer")
    parser.add_argument("-v", "--voice", default="aarav", help="Voice ID: aarav, ananya, kabir, riya, dev")
    parser.add_argument("-t", "--text", help="Text to speak")
    parser.add_argument("-f", "--file", help="Path to text file to speak")
    parser.add_argument("-o", "--output", default="output.mp3", help="Destination audio path (.mp3 or .wav)")
    parser.add_argument("--rate", help="Override rate (e.g. +10%, -5%)")
    parser.add_argument("--pitch", help="Override pitch (e.g. +2Hz, -3Hz)")
    parser.add_argument("--list", action="store_true", help="List all available voices")
    
    args = parser.parse_args()
    
    if args.list:
        voices = load_voices()
        print("\nAvailable Voices in Universal Setup:")
        print("--------------------------------------------------------------------------------")
        for vid, v in voices.items():
            print(f"• {vid.upper():<7} | Name: {v['name']:<7} | {v['gender']:<6} | {v['language']:<18} | {v['style']}")
        print("--------------------------------------------------------------------------------\n")
        return

    text = args.text
    if args.file:
        with open(args.file, "r", encoding="utf-8") as f:
            text = f.read().strip()
            
    if not text:
        print("Error: Please provide --text or --file!")
        sys.exit(1)
        
    asyncio.run(synthesize_async(args.voice, text, args.output, args.rate, args.pitch))

if __name__ == "__main__":
    main()

