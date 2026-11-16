import os
import json
import subprocess
from pathlib import Path

base_dir = Path("video_output/shop_sofa_duo_3d")
audio_dir = base_dir / "audio"
assets_dir = base_dir / "assets"
clips_dir = Path("video_output/shop_talking_characters/clips")
output_dir = Path("video_output/shop_talking_characters/output")
exports_dir = Path("exports")

clips_dir.mkdir(parents=True, exist_ok=True)
output_dir.mkdir(parents=True, exist_ok=True)
exports_dir.mkdir(parents=True, exist_ok=True)

shots = [
    {
        "id": 1,
        "speaker": "Ramesh Bhaiya",
        "char_img": "char_ramesh.jpg",
        "audio": "line1_ramesh.mp3",
        "visemes": "line1_visemes.json",
        "subtitle": "Priya behen, bazaar me grahak aana kam ho gaye hain... main kya karun?",
        "top_broll": None
    },
    {
        "id": 2,
        "speaker": "Priya",
        "char_img": "char_priya.jpg",
        "audio": "line2_priya.mp3",
        "visemes": "line2_visemes.json",
        "subtitle": "Arrey Ramesh Bhaiya! Jab grahak phone par hain, toh dukan bhi online honi chahiye!",
        "top_broll": None
    },
    {
        "id": 3,
        "speaker": "Ramesh Bhaiya",
        "char_img": "char_ramesh.jpg",
        "audio": "line3_ramesh.mp3",
        "visemes": "line3_visemes.json",
        "subtitle": "Lekin behen, mujhe toh koi computer ya technical kaam nahi aata...",
        "top_broll": None
    },
    {
        "id": 4,
        "speaker": "Priya",
        "char_img": "char_priya.jpg",
        "audio": "line4_priya.mp3",
        "visemes": "line4_visemes.json",
        "subtitle": "Koi technical kaam nahi! shop.lifesolvenow.com par photo daalo aur WhatsApp par link share karo!",
        "top_broll": "broll_storefront.jpg"
    },
    {
        "id": 5,
        "speaker": "Ramesh Bhaiya",
        "char_img": "char_ramesh.jpg",
        "audio": "line5_ramesh.mp3",
        "visemes": "line5_visemes.json",
        "subtitle": "Aur grahak seedha mujhse judenge?",
        "top_broll": None
    },
    {
        "id": 6,
        "speaker": "Priya",
        "char_img": "char_priya.jpg",
        "audio": "line6_priya.mp3",
        "visemes": "line6_visemes.json",
        "subtitle": "Haan bilkul! Seedha WhatsApp ya call par! Na koi bicholiya, na koi commission!",
        "top_broll": "broll_whatsapp.jpg"
    },
    {
        "id": 7,
        "speaker": "Ramesh Bhaiya",
        "char_img": "char_ramesh.jpg",
        "audio": "line7_ramesh.mp3",
        "visemes": "line7_visemes.json",
        "subtitle": "Wah! Matlab ab har dukan ki apni digital pehchaan!",
        "top_broll": "broll_customer.jpg"
    },
    {
        "id": 8,
        "speaker": "LifeSolveNow",
        "char_img": "broll_finale.jpg",
        "audio": "line8_priya.mp3",
        "visemes": "line8_visemes.json",
        "subtitle": "Toh der kis baat ki? Aaj hi visit kijiye — shop.lifesolvenow.com!",
        "top_broll": None
    }
]

shot_paths = []

for shot in shots:
    idx = shot["id"]
    char_img_p = assets_dir / shot["char_img"]
    aud_p = audio_dir / shot["audio"]
    viseme_p = audio_dir / shot["visemes"]
    out_clip = clips_dir / f"talking_shot{idx}.mp4"
    
    with open(viseme_p, "r", encoding="utf-8") as f:
        v_data = json.load(f)
    frames_count = len(v_data["frames"])
    dur = frames_count / 30.0
    
    print(f"🎬 Animating Talking Shot {idx}/8: {shot['speaker']} ({frames_count} frames, {dur:.2f}s)...")
    
    clean_sub = shot["subtitle"].replace("'", "").replace(":", "-").replace(",", "")
    clean_speaker = shot["speaker"].upper()
    
    # Zoompan with on (frame index)
    motion_filter = f"zoompan=z='1.06+0.02*sin(on*0.25)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+3*sin(on*0.35)':d={frames_count}:s=1280x720:fps=30"
    
    if shot["top_broll"]:
        broll_p = assets_dir / shot["top_broll"]
        filter_str = (
            f"[0:v]{motion_filter}[bg];"
            f"[1:v]scale=460:260,drawbox=t=4:c=0x38bdf8@0.9[top_card];"
            f"[bg][top_card]overlay=W-w-50:40:enable='between(t,0.8,{dur-0.5})'[ov];"
            f"[ov]drawbox=y=ih-120:color=black@0.65:width=iw:height=100:t=fill,"
            f"drawtext=text='{clean_speaker}':fontcolor=0x38bdf8:fontsize=22:x=60:y=h-105,"
            f"drawtext=text='{clean_sub}':fontcolor=white:fontsize=24:x=60:y=h-68[v]"
        )
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", str(char_img_p),
            "-loop", "1", "-i", str(broll_p),
            "-i", str(aud_p),
            "-filter_complex", filter_str,
            "-map", "[v]",
            "-map", "2:a",
            "-t", str(dur),
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "19",
            "-c:a", "aac",
            "-pix_fmt", "yuv420p",
            str(out_clip)
        ]
    else:
        filter_str = (
            f"{motion_filter},"
            f"drawbox=y=ih-120:color=black@0.65:width=iw:height=100:t=fill,"
            f"drawtext=text='{clean_speaker}':fontcolor=0x38bdf8:fontsize=22:x=60:y=h-105,"
            f"drawtext=text='{clean_sub}':fontcolor=white:fontsize=24:x=60:y=h-68"
        )
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", str(char_img_p),
            "-i", str(aud_p),
            "-vf", filter_str,
            "-t", str(dur),
            "-c:v", "libx264",
            "-preset", "fast",
            "-crf", "19",
            "-c:a", "aac",
            "-pix_fmt", "yuv420p",
            str(out_clip)
        ]
        
    subprocess.run(cmd, check=True)
    shot_paths.append(out_clip)
    print(f"✓ Talking Shot {idx} ready: {out_clip.name}")

print("\n🎉 ALL 8 TALKING SHOTS READY! Stitching into final master...")

concat_txt = clips_dir / "concat_talking.txt"
with open(concat_txt, "w") as f:
    for sp in shot_paths:
        f.write(f"file '{os.path.abspath(sp)}'\n")

raw_video = output_dir / "raw_talking_video.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_txt),
    "-c", "copy",
    str(raw_video)
], check=True)

# Mix gentle background music
bgm_path = "video_output/shop_digital_dukaan_3d/audio/bgm_indian_commercial.wav"
final_video = output_dir / "shop_talking_characters_master.mp4"
export_video = exports_dir / "shop_talking_characters_master.mp4"

subprocess.run([
    "ffmpeg", "-y",
    "-i", str(raw_video),
    "-i", bgm_path,
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.22[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "0:v",
    "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(final_video)
], check=True)

import shutil
shutil.copy2(final_video, export_video)
print(f"\n🏆 TALKING CHARACTERS MASTER READY! Size: {round(os.path.getsize(final_video)/1024/1024, 2)} MB")
