#!/usr/bin/env python3
"""
Audio to Visemes & Puppet Motion Generator.
Converts any speech audio (.mp3, .wav) into frame-by-frame mouth shapes,
natural eye-blinks, and head-bobbing at 30 FPS.
"""

import sys
import json
import argparse
import subprocess
import numpy as np
import soundfile as sf
from pathlib import Path

def convert_to_wav(audio_path: Path) -> Path:
    temp_wav = audio_path.parent / f"_temp_{audio_path.stem}.wav"
    cmd = [
        "ffmpeg", "-y", "-i", str(audio_path),
        "-ar", "22050", "-ac", "1",
        "-c:a", "pcm_s16le", str(temp_wav)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    return temp_wav

def analyze_audio(wav_path: Path, fps: int = 30):
    data, sr = sf.read(str(wav_path))
    if len(data.shape) > 1:
        data = np.mean(data, axis=1)
        
    duration = len(data) / sr
    total_frames = int(np.ceil(duration * fps))
    samples_per_frame = int(sr / fps)
    
    # Calculate RMS per frame
    rms_list = []
    zcr_list = []
    
    for f in range(total_frames):
        start = f * samples_per_frame
        end = min(len(data), start + samples_per_frame)
        if start >= len(data):
            rms_list.append(0.0)
            zcr_list.append(0.0)
            continue
            
        chunk = data[start:end]
        rms = np.sqrt(np.mean(chunk**2)) if len(chunk) > 0 else 0.0
        # Zero crossing rate (measures high frequency / sibilance)
        zcr = np.mean(np.abs(np.diff(np.sign(chunk)))) / 2.0 if len(chunk) > 1 else 0.0
        
        rms_list.append(float(rms))
        zcr_list.append(float(zcr))
        
    max_rms = max(rms_list) if max(rms_list) > 0 else 1.0
    normalized_rms = [r / max_rms for r in rms_list]
    
    # Map to mouth shapes with smoothing
    mouth_shapes = []
    silence_threshold = 0.08
    
    vowel_cycle = ["open_small", "open_wide", "e_shape", "o_shape"]
    
    for i, n_rms in enumerate(normalized_rms):
        if n_rms < silence_threshold:
            mouth_shapes.append("rest")
        elif n_rms < 0.25:
            mouth_shapes.append("open_small")
        elif n_rms > 0.65:
            # High energy = open wide or high vowel
            if zcr_list[i] > 0.15:
                mouth_shapes.append("e_shape")
            else:
                mouth_shapes.append("open_wide")
        else:
            # Mid energy
            if zcr_list[i] > 0.18:
                mouth_shapes.append("e_shape")
            elif zcr_list[i] < 0.06:
                mouth_shapes.append("o_shape")
            else:
                mouth_shapes.append(vowel_cycle[i % len(vowel_cycle)])
                
    # Smooth single-frame anomalies (avoid mouth jumping from open_wide to rest instantly)
    for i in range(1, len(mouth_shapes) - 1):
        if mouth_shapes[i] == "rest" and mouth_shapes[i-1] != "rest" and mouth_shapes[i+1] != "rest":
            mouth_shapes[i] = "open_small"
            
    # Natural Eye Blinking Generator
    # Blink roughly every 75-100 frames (~2.5 to 3.5 seconds), lasting 3 frames
    eye_states = ["open"] * total_frames
    np.random.seed(42)
    current_frame = 20
    while current_frame < total_frames - 10:
        blink_interval = np.random.randint(65, 110)
        current_frame += blink_interval
        if current_frame < total_frames:
            eye_states[current_frame] = "blink"
            if current_frame + 1 < total_frames:
                eye_states[current_frame + 1] = "blink"
            if current_frame + 2 < total_frames:
                eye_states[current_frame + 2] = "blink"
                
    # Procedural Motion: Head tilt & subtle breath/bobbing
    frames_data = []
    for f in range(total_frames):
        is_talking = mouth_shapes[f] != "rest"
        # Subtle head bob synced with speech
        head_bob = np.sin(f * 0.25) * 4.0 if is_talking else np.sin(f * 0.08) * 1.5
        head_tilt = np.sin(f * 0.12) * 1.8 if is_talking else np.sin(f * 0.05) * 0.8
        
        frames_data.append({
            "frame": f,
            "mouth": mouth_shapes[f],
            "eyes": eye_states[f],
            "headY": round(float(head_bob), 2),
            "headRot": round(float(head_tilt), 2),
            "volume": round(float(normalized_rms[f]), 3)
        })
        
    return {
        "fps": fps,
        "total_frames": total_frames,
        "duration_seconds": round(duration, 3),
        "frames": frames_data
    }

def main():
    parser = argparse.ArgumentParser(description="Generate Lip-Sync & Visemes from Audio")
    parser.add_argument("-i", "--input", required=True, help="Input audio file (.mp3, .wav, .m4a)")
    parser.add_argument("-o", "--output", default="visemes.json", help="Output visemes JSON file")
    parser.add_argument("--fps", type=int, default=30, help="Target FPS (default: 30)")
    args = parser.parse_args()
    
    in_path = Path(args.input).resolve()
    if not in_path.exists():
        print(f"Error: {in_path} does not exist!")
        sys.exit(1)
        
    print(f"Analyzing audio for lip-sync: {in_path.name}...")
    temp_wav = convert_to_wav(in_path)
    
    try:
        viseme_data = analyze_audio(temp_wav, fps=args.fps)
        out_path = Path(args.output).resolve()
        out_path.parent.mkdir(parents=True, exist_ok=True)
        with open(out_path, "w", encoding="utf-8") as f:
            json.dump(viseme_data, f, indent=2)
            
        print(f"✓ Visemes generated successfully!")
        print(f"  Frames: {viseme_data['total_frames']} ({viseme_data['duration_seconds']}s @ {args.fps} FPS)")
        print(f"  Saved to: {out_path}")
    finally:
        if temp_wav.exists():
            temp_wav.unlink()

if __name__ == "__main__":
    main()

