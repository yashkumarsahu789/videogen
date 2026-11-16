import asyncio
import os
import subprocess
import json
import numpy as np
import soundfile as sf
from pathlib import Path
import edge_tts

project_dir = Path("video_output/animated_face_to_face_dialogue")
audio_dir = project_dir / "audio"
audio_dir.mkdir(parents=True, exist_ok=True)

dialogues = [
    {
        "id": 1,
        "speaker": "male",
        "voice": "hi-IN-MadhurNeural",
        "text": "Riya, bazaar me grahak pehle se kaafi kam ho gaye hain... sab phone par online lage rehte hain, meri dukan ka kya hoga?",
        "file": "turn1_male.mp3",
        "visemes": "turn1_visemes.json"
    },
    {
        "id": 2,
        "speaker": "female",
        "voice": "hi-IN-SwaraNeural",
        "text": "Arrey bhaiya, chinta kyu karte ho! Jab customer phone par hain, toh aapki dukan bhi toh unke phone me honi chahiye!",
        "file": "turn2_female.mp3",
        "visemes": "turn2_visemes.json"
    },
    {
        "id": 3,
        "speaker": "male",
        "voice": "hi-IN-MadhurNeural",
        "text": "Lekin mujhe koi technical coding ya website banana nahi aata, aur na hi main commission dena chahta hoon!",
        "file": "turn3_male.mp3",
        "visemes": "turn3_visemes.json"
    },
    {
        "id": 4,
        "speaker": "female",
        "voice": "hi-IN-SwaraNeural",
        "text": "Aapko kuch technical nahi karna! shop.lifesolvenow.com par bas dukan ka naam aur photos daalo. Customer direct WhatsApp se judenge, zero percent commission par!",
        "file": "turn4_female.mp3",
        "visemes": "turn4_visemes.json"
    },
    {
        "id": 5,
        "speaker": "male",
        "voice": "hi-IN-MadhurNeural",
        "text": "Direct WhatsApp order? Na koi bicholiya, na koi commission? Wah, ye toh kamal hai!",
        "file": "turn5_male.mp3",
        "visemes": "turn5_visemes.json"
    },
    {
        "id": 6,
        "speaker": "female",
        "voice": "hi-IN-SwaraNeural",
        "text": "Bilkul! Toh der mat kijiye, aaj hi visit kijiye — shop.lifesolvenow.com!",
        "file": "turn6_female.mp3",
        "visemes": "turn6_visemes.json"
    }
]

def analyze_audio_visemes(wav_path: Path, fps: int = 30):
    data, sr = sf.read(str(wav_path))
    if len(data.shape) > 1:
        data = np.mean(data, axis=1)
        
    duration = len(data) / sr
    total_frames = int(np.ceil(duration * fps))
    samples_per_frame = int(sr / fps)
    
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
        zcr = np.mean(np.abs(np.diff(np.sign(chunk)))) / 2.0 if len(chunk) > 1 else 0.0
        
        rms_list.append(float(rms))
        zcr_list.append(float(zcr))
        
    max_rms = max(rms_list) if max(rms_list) > 0 else 1.0
    normalized_rms = [r / max_rms for r in rms_list]
    
    mouth_shapes = []
    silence_threshold = 0.09
    vowel_cycle = ["open_small", "open_wide", "e_shape", "o_shape"]
    
    for i, n_rms in enumerate(normalized_rms):
        if n_rms < silence_threshold:
            mouth_shapes.append("rest")
        elif n_rms < 0.25:
            mouth_shapes.append("open_small")
        elif n_rms > 0.60:
            if zcr_list[i] > 0.15:
                mouth_shapes.append("e_shape")
            else:
                mouth_shapes.append("open_wide")
        else:
            if zcr_list[i] > 0.18:
                mouth_shapes.append("e_shape")
            elif zcr_list[i] < 0.06:
                mouth_shapes.append("o_shape")
            else:
                mouth_shapes.append(vowel_cycle[i % len(vowel_cycle)])
                
    for i in range(1, len(mouth_shapes) - 1):
        if mouth_shapes[i] == "rest" and mouth_shapes[i-1] != "rest" and mouth_shapes[i+1] != "rest":
            mouth_shapes[i] = "open_small"
            
    eye_states = ["open"] * total_frames
    np.random.seed(42)
    cur_f = 15
    while cur_f < total_frames - 5:
        cur_f += np.random.randint(45, 80)
        if cur_f < total_frames:
            eye_states[cur_f] = "blink"
            if cur_f + 1 < total_frames:
                eye_states[cur_f + 1] = "blink"
                
    frames_data = []
    for f in range(total_frames):
        is_talking = mouth_shapes[f] != "rest"
        head_bob = np.sin(f * 0.3) * 3.5 if is_talking else np.sin(f * 0.08) * 1.2
        head_tilt = np.sin(f * 0.15) * 1.6 if is_talking else np.sin(f * 0.05) * 0.7
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

async def generate_speech():
    for d in dialogues:
        out_mp3 = audio_dir / d["file"]
        print(f"🎙️ Generating TTS for Turn {d['id']}: {d['speaker']} ({d['voice']})...")
        communicate = edge_tts.Communicate(d["text"], d["voice"], rate="+2%")
        await communicate.save(str(out_mp3))
        
        # Convert to temp wav for viseme analysis
        temp_wav = audio_dir / f"temp_{d['id']}.wav"
        subprocess.run([
            "ffmpeg", "-y", "-i", str(out_mp3),
            "-ar", "22050", "-ac", "1",
            str(temp_wav)
        ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        
        visemes_data = analyze_audio_visemes(temp_wav, fps=30)
        out_visemes = audio_dir / d["visemes"]
        with open(out_visemes, "w", encoding="utf-8") as f:
            json.dump(visemes_data, f, indent=2)
            
        if temp_wav.exists():
            temp_wav.unlink()
            
        print(f"✓ Turn {d['id']} ready: {visemes_data['total_frames']} frames ({visemes_data['duration_seconds']}s)")

if __name__ == "__main__":
    asyncio.run(generate_speech())
    print("\n🎉 All 6 dialogue audios & visemes generated successfully!")
