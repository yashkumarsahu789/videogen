import json
import subprocess
import numpy as np
from pathlib import Path

base_dir = Path("video_output/animated_face_to_face_dialogue")
audio_dir = base_dir / "audio"

turns = [
    {"id": 1, "speaker": "dev", "file": "turn1_male.mp3", "visemes": "turn1_visemes.json"},
    {"id": 2, "speaker": "riya", "file": "turn2_female.mp3", "visemes": "turn2_visemes.json"},
    {"id": 3, "speaker": "dev", "file": "turn3_male.mp3", "visemes": "turn3_visemes.json"},
    {"id": 4, "speaker": "riya", "file": "turn4_female.mp3", "visemes": "turn4_visemes.json"},
    {"id": 5, "speaker": "dev", "file": "turn5_male.mp3", "visemes": "turn5_visemes.json"},
    {"id": 6, "speaker": "riya", "file": "turn6_female.mp3", "visemes": "turn6_visemes.json"},
]

# 1. Stitch full audio
concat_txt = audio_dir / "dialogue_concat.txt"
with open(concat_txt, "w", encoding="utf-8") as f:
    for t in turns:
        f.write(f"file '{t['file']}'\n")

raw_dialogue_mp3 = audio_dir / "dialogue_full.mp3"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_txt),
    "-c", "copy",
    str(raw_dialogue_mp3)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Also mix gentle BGM
bgm_in = Path("video_output/shop_livingroom_phone_duo/audio/bgm_indian_commercial.wav")
audio_master = audio_dir / "face_to_face_master_audio.mp3"
subprocess.run([
    "ffmpeg", "-y",
    "-i", str(raw_dialogue_mp3),
    "-i", str(bgm_in),
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.18[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "[aout]",
    "-c:a", "libmp3lame",
    "-b:a", "192k",
    str(audio_master)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

print(f"✓ Master dialogue audio mixed: {audio_master}")

# 2. Build full master frame sequence
timeline_frames = []
global_frame = 0

for t in turns:
    vis_path = audio_dir / t["visemes"]
    with open(vis_path, "r", encoding="utf-8") as f:
        v_data = json.load(f)
        
    speaker = t["speaker"]
    frames = v_data["frames"]
    
    for local_f, f_info in enumerate(frames):
        if speaker == "dev":
            dev_mouth = f_info["mouth"]
            dev_eyes = f_info["eyes"]
            dev_bob = f_info["headY"]
            
            # Riya is listening
            riya_mouth = "rest"
            riya_eyes = "blink" if (global_frame % 70 in [0, 1]) else "open"
            riya_bob = round(float(np.sin(global_frame * 0.08) * 1.5), 2)
        else: # riya speaking
            riya_mouth = f_info["mouth"]
            riya_eyes = f_info["eyes"]
            riya_bob = f_info["headY"]
            
            # Dev is listening
            dev_mouth = "rest"
            dev_eyes = "blink" if (global_frame % 65 in [0, 1]) else "open"
            dev_bob = round(float(np.sin(global_frame * 0.08) * 1.5), 2)
            
        timeline_frames.append({
            "frame": global_frame,
            "turn": t["id"],
            "speaker": speaker,
            "dev": {"mouth": dev_mouth, "eyes": dev_eyes, "bob": dev_bob},
            "riya": {"mouth": riya_mouth, "eyes": riya_eyes, "bob": riya_bob}
        })
        global_frame += 1

# Add closing celebratory pause (45 frames = 1.5s)
for end_f in range(45):
    timeline_frames.append({
        "frame": global_frame,
        "turn": 7,
        "speaker": "both",
        "dev": {"mouth": "smile", "eyes": "open", "bob": round(float(np.sin(global_frame * 0.1) * 1.0), 2)},
        "riya": {"mouth": "smile", "eyes": "open", "bob": round(float(np.sin(global_frame * 0.1) * 1.0), 2)}
    })
    global_frame += 1

out_timeline = audio_dir / "master_timeline.json"
with open(out_timeline, "w", encoding="utf-8") as f:
    json.dump({
        "fps": 30,
        "total_frames": len(timeline_frames),
        "duration_seconds": round(len(timeline_frames) / 30.0, 2),
        "frames": timeline_frames
    }, f, indent=2)

print(f"✓ Master timeline created: {len(timeline_frames)} frames ({len(timeline_frames)/30.0:.2f}s)")
