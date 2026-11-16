import subprocess
import os
import sys
from pathlib import Path

base_dir = Path(__file__).resolve().parent.parent
root_dir = base_dir.parent.parent
assets_dir = base_dir / "assets"
audio_dir = base_dir / "audio"
clips_dir = base_dir / "clips"
output_dir = base_dir / "output"
exports_dir = root_dir / "exports"

clips_dir.mkdir(parents=True, exist_ok=True)
output_dir.mkdir(parents=True, exist_ok=True)
exports_dir.mkdir(parents=True, exist_ok=True)

# 8 Storyboard Shots Architecture:
# Shot 1: Wide 3D Two-Shot on Sofa - Ramesh expresses concern (0 - 7.61s)
# Shot 2: Medium Shot on Priya on Sofa - Reassurance (7.61 - 15.55s)
# Shot 3: Close-up on Ramesh on Sofa - Technical fear (15.55 - 20.93s)
# Shot 4: 3D Smartphone View in Hand - Live shop.lifesolvenow.com UI demo (20.93 - 33.89s)
# Shot 5: Reaction Close-up on Ramesh on Sofa - Wonder (33.89 - 37.03s)
# Shot 6: 3D Smartphone View - Direct WhatsApp catalog demo (37.03 - 45.12s)
# Shot 7: Warm Two-Shot on Sofa - Discovery (45.12 - 50.52s)
# Shot 8: Grand Celebratory Finale on Sofa - Confident Thumbs-up (50.52 - 57.55s)

shots = [
    (
        1,
        "sofa_living_room_duo.jpg",
        "line1_ramesh.mp3",
        "zoompan=z='min(zoom+0.0005,1.12)':x='iw*0.20-(iw/zoom*0.20)':y='ih*0.42-(ih/zoom*0.42)':d=228:s=1280x720:fps=30"
    ),
    (
        2,
        "sofa_living_room_duo.jpg",
        "line2_priya.mp3",
        "zoompan=z='min(zoom+0.0005,1.14)':x='iw*0.75-(iw/zoom*0.75)':y='ih*0.40-(ih/zoom*0.40)':d=239:s=1280x720:fps=30"
    ),
    (
        3,
        "sofa_living_room_duo.jpg",
        "line3_ramesh.mp3",
        "zoompan=z='min(zoom+0.0006,1.20)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=162:s=1280x720:fps=30"
    ),
    (
        4,
        "broll_storefront.jpg", # 3D perspective camera on the smartphone screen showing shop.lifesolvenow.com
        "line4_priya.mp3",
        "zoompan=z='min(zoom+0.0004,1.15)':x='iw*0.48-(iw/zoom*0.48)':y='ih*0.50-(ih/zoom*0.50)':d=389:s=1280x720:fps=30"
    ),
    (
        5,
        "sofa_living_room_duo.jpg",
        "line5_ramesh.mp3",
        "zoompan=z='min(zoom+0.0005,1.18)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=95:s=1280x720:fps=30"
    ),
    (
        6,
        "broll_whatsapp.jpg", # 3D perspective camera on phone showing direct WhatsApp connection
        "line6_priya.mp3",
        "zoompan=z='min(zoom+0.0005,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=243:s=1280x720:fps=30"
    ),
    (
        7,
        "sofa_living_room_duo.jpg",
        "line7_ramesh.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.12,max(1.001,zoom-0.0004))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=162:s=1280x720:fps=30"
    ),
    (
        8,
        "sofa_living_room_duo.jpg",
        "line8_priya.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.10,max(1.001,zoom-0.0003))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=211:s=1280x720:fps=30"
    )
]

shot_files = []

# Clean transparent top URL watermark - NO background color box!
top_watermark = (
    "drawtext=text='shop.lifesolvenow.com':fontcolor=0x38bdf8:fontsize=28:x=(w-text_w)/2:y=35:shadowcolor=black@0.85:shadowx=2:shadowy=2"
)

for idx, scene_img, aud_file, motion_filter in shots:
    out_clip = clips_dir / f"3d_shot{idx}.mp4"
    aud_path = audio_dir / aud_file
    scene_path = assets_dir / scene_img
    
    # Get exact duration
    ffprobe_cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", str(aud_path)]
    res = subprocess.run(ffprobe_cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip())
    
    print(f"🎬 Assembling 3D Cartoon Shot {idx}/8 ({dur:.2f}s)...")
    
    filter_str = f"{motion_filter},{top_watermark}"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", str(scene_path),
        "-i", str(aud_path),
        "-vf", filter_str,
        "-t", str(dur),
        "-c:v", "libx264",
        "-preset", "fast",
        "-crf", "18",
        "-c:a", "aac",
        "-pix_fmt", "yuv420p",
        str(out_clip)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    shot_files.append(out_clip)
    print(f"✓ Shot {idx} ready: {out_clip.name}")

print("\n🎉 ALL 8 3D SHOTS READY! Concatenating...")

# Step 2: Concat
concat_list = base_dir / "concat_3d.txt"
with open(concat_list, "w", encoding="utf-8") as f:
    for sf in shot_files:
        f.write(f"file '{sf.resolve()}'\n")

raw_master = output_dir / "raw_3d_video.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_list),
    "-c", "copy",
    str(raw_master)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Step 3: Mix audio with BGM
bgm_path = audio_dir / "bgm_indian_commercial.wav"
final_master = output_dir / "shop_3d_home_conversation_master.mp4"
final_export = exports_dir / "shop_3d_home_conversation_master.mp4"

subprocess.run([
    "ffmpeg", "-y",
    "-i", str(raw_master),
    "-i", str(bgm_path),
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.20[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "0:v",
    "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(final_master)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

import shutil
shutil.copy2(final_master, final_export)

print(f"\n🏆 3D HOME CONVERSATION MASTER READY!")
print(f"  Master File: {final_master}")
print(f"  Export File: {final_export}")
print(f"  Size: {round(os.path.getsize(final_master)/(1024*1024), 2)} MB")
