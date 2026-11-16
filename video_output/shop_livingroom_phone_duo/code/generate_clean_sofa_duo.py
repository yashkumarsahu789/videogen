import subprocess
import os
from pathlib import Path

base_dir = Path("video_output/shop_livingroom_phone_duo")
assets_dir = base_dir / "assets"
audio_dir = base_dir / "audio"
clips_dir = base_dir / "clips"
output_dir = base_dir / "output"
exports_dir = Path("exports")

clips_dir.mkdir(parents=True, exist_ok=True)
output_dir.mkdir(parents=True, exist_ok=True)
exports_dir.mkdir(parents=True, exist_ok=True)

# 8 Dialogue Lines Sequence:
# Shot 1: Ramesh on Sofa (0 - 7.61s)
# Shot 2: Priya on Sofa (7.61 - 15.55s)
# Shot 3: Ramesh on Sofa (15.55 - 20.93s)
# Shot 4: Phone Demo on Sofa (Priya holding phone showing shop.lifesolvenow.com UI) (20.93 - 33.89s)
# Shot 5: Ramesh on Sofa (33.89 - 37.03s)
# Shot 6: Priya on Sofa with Phone (37.03 - 45.12s)
# Shot 7: Both on Sofa Happy (45.12 - 50.52s)
# Shot 8: Finale Celebratory Sofa (50.52 - 57.55s)

shots = [
    (
        1,
        "sofa_living_room_duo.jpg",
        "line1_ramesh.mp3",
        "zoompan=z='min(zoom+0.0006,1.15)':x='iw*0.18-(iw/zoom*0.18)':y='ih/2-(ih/zoom/2)':d=228:s=1280x720:fps=30"
    ),
    (
        2,
        "sofa_living_room_duo.jpg",
        "line2_priya.mp3",
        "zoompan=z='min(zoom+0.0006,1.16)':x='iw*0.78-(iw/zoom*0.78)':y='ih*0.4-(ih/zoom*0.4)':d=239:s=1280x720:fps=30"
    ),
    (
        3,
        "sofa_living_room_duo.jpg", # Ramesh close up on sofa
        "line3_ramesh.mp3",
        "zoompan=z='min(zoom+0.0006,1.24)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=162:s=1280x720:fps=30"
    ),
    (
        4,
        "broll_storefront.jpg", # Camera zooms right onto the smartphone screen showing shop.lifesolvenow.com UI
        "line4_priya.mp3",
        "zoompan=z='min(zoom+0.0005,1.18)':x='iw*0.48-(iw/zoom*0.48)':y='ih*0.5-(ih/zoom*0.5)':d=389:s=1280x720:fps=30"
    ),
    (
        5,
        "sofa_living_room_duo.jpg", # Ramesh reacting on sofa looking at phone
        "line5_ramesh.mp3",
        "zoompan=z='min(zoom+0.0006,1.20)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=95:s=1280x720:fps=30"
    ),
    (
        6,
        "broll_whatsapp.jpg", # Showing the WhatsApp catalog connection on phone
        "line6_priya.mp3",
        "zoompan=z='min(zoom+0.0006,1.14)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=243:s=1280x720:fps=30"
    ),
    (
        7,
        "sofa_living_room_duo.jpg",
        "line7_ramesh.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.14,max(1.001,zoom-0.0005))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=162:s=1280x720:fps=30"
    ),
    (
        8,
        "sofa_living_room_duo.jpg",
        "line8_priya.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.12,max(1.001,zoom-0.0004))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=211:s=1280x720:fps=30"
    )
]

shot_files = []

# Only clean top URL watermark - NO background color, NO other text!
top_watermark = (
    "drawtext=text='shop.lifesolvenow.com':fontcolor=0x38bdf8:fontsize=28:x=(w-text_w)/2:y=35:shadowcolor=black@0.8:shadowx=2:shadowy=2"
)

for idx, scene_img, aud_file, motion_filter in shots:
    out_clip = clips_dir / f"clean_shot{idx}.mp4"
    aud_path = audio_dir / aud_file
    scene_path = assets_dir / scene_img
    
    # Get exact audio duration
    ffprobe_cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", str(aud_path)]
    res = subprocess.run(ffprobe_cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip())
    
    print(f"🎬 Building Clean Living Room Shot {idx}/8 ({dur:.2f}s)...")
    
    filter_str = f"{motion_filter},{top_watermark}"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", str(scene_path),
        "-i", str(aud_path),
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
    shot_files.append(out_clip)
    print(f"✓ Shot {idx} ready: {out_clip.name}")

print("\n🎉 ALL 8 SHOTS READY! Concatenating...")

# Step 2: Concat all 8 shots
concat_list = base_dir / "concat_clean.txt"
with open(concat_list, "w") as f:
    for sf in shot_files:
        f.write(f"file '{os.path.abspath(sf)}'\n")

raw_master = output_dir / "raw_clean_video.mp4"
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_list),
    "-c", "copy",
    str(raw_master)
]
subprocess.run(concat_cmd, check=True)

# Step 3: Mix soft background music under the full video
bgm_path = audio_dir / "bgm_indian_commercial.wav"
final_master = output_dir / "shop_livingroom_clean_duo_master.mp4"
final_export = exports_dir / "shop_livingroom_clean_duo_master.mp4"

mix_cmd = [
    "ffmpeg", "-y",
    "-i", str(raw_master),
    "-i", bgm_path,
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.22[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "0:v",
    "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(final_master)
]
subprocess.run(mix_cmd, check=True)

import shutil
shutil.copy2(final_master, final_export)

print(f"\n🏆 LIVING ROOM PHONE DUO MASTER READY! Path: {final_master} | Size: {round(os.path.getsize(final_master)/1024/1024, 2)} MB")
