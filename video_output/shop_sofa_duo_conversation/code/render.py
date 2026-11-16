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

# 8 Cinematic Storyboard Shots for Living Room Sofa Conversation:
shots = [
    (
        1,
        "sofa_living_room_duo.jpg",
        "line1_ramesh.mp3",
        "zoompan=z='min(zoom+0.0004,1.10)':x='iw*0.20-(iw/zoom*0.20)':y='ih*0.42-(ih/zoom*0.42)':d=228:s=1280x720:fps=30"
    ),
    (
        2,
        "sofa_living_room_duo.jpg",
        "line2_priya.mp3",
        "zoompan=z='min(zoom+0.0004,1.12)':x='iw*0.75-(iw/zoom*0.75)':y='ih*0.40-(ih/zoom*0.40)':d=239:s=1280x720:fps=30"
    ),
    (
        3,
        "sofa_living_room_duo.jpg",
        "line3_ramesh.mp3",
        "zoompan=z='min(zoom+0.0005,1.18)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=162:s=1280x720:fps=30"
    ),
    (
        4,
        "broll_storefront.jpg",
        "line4_priya.mp3",
        "zoompan=z='min(zoom+0.0004,1.14)':x='iw*0.48-(iw/zoom*0.48)':y='ih*0.50-(ih/zoom*0.50)':d=389:s=1280x720:fps=30"
    ),
    (
        5,
        "sofa_living_room_duo.jpg",
        "line5_ramesh.mp3",
        "zoompan=z='min(zoom+0.0005,1.15)':x='iw*0.22-(iw/zoom*0.22)':y='ih*0.38-(ih/zoom*0.38)':d=95:s=1280x720:fps=30"
    ),
    (
        6,
        "broll_whatsapp.jpg",
        "line6_priya.mp3",
        "zoompan=z='min(zoom+0.0004,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=243:s=1280x720:fps=30"
    ),
    (
        7,
        "sofa_living_room_duo.jpg",
        "line7_ramesh.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.10,max(1.001,zoom-0.0003))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=162:s=1280x720:fps=30"
    ),
    (
        8,
        "sofa_living_room_duo.jpg",
        "line8_priya.mp3",
        "zoompan=z='if(lte(zoom,1.0),1.08,max(1.001,zoom-0.0003))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=211:s=1280x720:fps=30"
    )
]

shot_files = []

# Clean transparent top URL watermark - zero lower-third clutter
if sys.platform == "win32" and os.path.exists("C:/Windows/Fonts/segoeuib.ttf"):
    font_clause = ":fontfile='C\\:/Windows/Fonts/segoeuib.ttf'"
elif os.path.exists("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
    font_clause = ":fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'"
else:
    font_clause = ""

top_watermark = (
    f"drawtext=text='shop.lifesolvenow.com'{font_clause}:fontcolor=0x38bdf8:fontsize=32:x=(w-text_w)/2:y=35:shadowcolor=black@0.9:shadowx=2:shadowy=2"
)

for idx, scene_img, aud_file, motion_filter in shots:
    out_clip = clips_dir / f"shot_{idx}.mp4"
    aud_path = audio_dir / aud_file
    scene_path = assets_dir / scene_img
    
    # Measure audio duration
    ffprobe_cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", str(aud_path)]
    res = subprocess.run(ffprobe_cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip())
    
    print(f"🎬 Assembling Sofa Dialogue Shot {idx}/8 ({dur:.2f}s)...")
    
    filter_str = f"{motion_filter},{top_watermark}"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(scene_path),
        "-i", str(aud_path),
        "-vf", filter_str,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-tune", "stillimage",
        "-crf", "18",
        "-c:a", "aac",
        "-b:a", "192k",
        "-pix_fmt", "yuv420p",
        "-t", str(dur),
        str(out_clip)
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    shot_files.append(out_clip)

print("🔗 Concatenating all 8 shots...")
concat_list_file = base_dir / "concat_list.txt"
with open(concat_list_file, "w", encoding="utf-8") as f:
    for sf in shot_files:
        f.write(f"file '{sf.as_posix()}'\n")

unmixed_video = output_dir / "temp_unmixed.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_list_file),
    "-c", "copy",
    str(unmixed_video)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Audio mixing with warm background music
bgm_path = audio_dir / "bgm_indian_commercial.wav"
final_video = output_dir / "shop_sofa_duo_master.mp4"
export_video = exports_dir / "shop_sofa_duo_master.mp4"

print("🎵 Mixing dialogue audio with background score (-22dB ducked)...")
if bgm_path.exists():
    mix_cmd = [
        "ffmpeg", "-y",
        "-i", str(unmixed_video),
        "-stream_loop", "-1",
        "-i", str(bgm_path),
        "-filter_complex",
        "[1:a]volume=0.12[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
        "-map", "0:v",
        "-map", "[aout]",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        str(final_video)
    ]
    subprocess.run(mix_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
else:
    import shutil
    shutil.copy(unmixed_video, final_video)

if unmixed_video.exists():
    os.remove(unmixed_video)

import shutil
shutil.copy(final_video, export_video)

size_mb = os.path.getsize(final_video) / (1024 * 1024)
print(f"✅ RENDER COMPLETE! Output: {final_video} ({size_mb:.2f} MB)")
