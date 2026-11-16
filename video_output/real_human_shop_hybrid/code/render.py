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

# 8 Hybrid Photorealistic Shots (9:16 Vertical: 1080x1920):
# Combines authentic Indian shopkeeper portraits, customer interactions, phone UI, and digital storefront
shots = [
    {
        "id": 1,
        "image": "ramesh_bhaiya_counter.jpg",
        "audio": "line1_ramesh.mp3",
        "desc": "Ramesh at counter expressing concern",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0003,1.06)':x='iw/2-(iw/zoom/2)':y='ih*0.35-(ih/zoom*0.35)':d=228:s=1080x1920:fps=30"
    },
    {
        "id": 2,
        "image": "digital_store.jpg",
        "audio": "line2_priya.mp3",
        "desc": "Priya advises taking shop online to phone",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0003,1.07)':x='iw/2-(iw/zoom/2)':y='ih*0.40-(ih/zoom*0.40)':d=239:s=1080x1920:fps=30"
    },
    {
        "id": 3,
        "image": "ramesh_bhaiya_counter.jpg",
        "audio": "line3_ramesh.mp3",
        "desc": "Ramesh hesitates on tech knowledge",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0004,1.08)':x='iw/2-(iw/zoom/2)':y='ih*0.32-(ih/zoom*0.32)':d=162:s=1080x1920:fps=30"
    },
    {
        "id": 4,
        "image": "broll_storefront.jpg",
        "audio": "line4_priya.mp3",
        "desc": "Live digital storefront demo on phone",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0003,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=389:s=1080x1920:fps=30"
    },
    {
        "id": 5,
        "image": "digital_store.jpg",
        "audio": "line5_ramesh.mp3",
        "desc": "Ramesh asks about direct customer connect",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0004,1.08)':x='iw/2-(iw/zoom/2)':y='ih*0.35-(ih/zoom*0.35)':d=95:s=1080x1920:fps=30"
    },
    {
        "id": 6,
        "image": "broll_whatsapp.jpg",
        "audio": "line6_priya.mp3",
        "desc": "Direct WhatsApp orders & zero commission",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='min(zoom+0.0003,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=243:s=1080x1920:fps=30"
    },
    {
        "id": 7,
        "image": "shop_customer_interaction.jpg",
        "audio": "line7_ramesh.mp3",
        "desc": "Customer connects directly at counter",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='if(lte(zoom,1.0),1.06,max(1.001,zoom-0.0002))':x='iw/2-(iw/zoom/2)':y='ih*0.42-(ih/zoom*0.42)':d=162:s=1080x1920:fps=30"
    },
    {
        "id": 8,
        "image": "digital_store.jpg",
        "audio": "line8_priya.mp3",
        "desc": "Call to action - visit shop.lifesolvenow.com",
        "filter": "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,zoompan=z='if(lte(zoom,1.0),1.06,max(1.001,zoom-0.0002))':x='iw/2-(iw/zoom/2)':y='ih*0.38-(ih/zoom*0.38)':d=211:s=1080x1920:fps=30"
    }
]

# Typography setup
if sys.platform == "win32" and os.path.exists("C:/Windows/Fonts/segoeuib.ttf"):
    font_clause = ":fontfile='C\\:/Windows/Fonts/segoeuib.ttf'"
elif os.path.exists("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"):
    font_clause = ":fontfile='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'"
else:
    font_clause = ""

# Clean transparent top branding in 9:16 vertical
top_watermark = (
    f"drawtext=text='shop.lifesolvenow.com'{font_clause}:fontcolor=0x38bdf8:fontsize=40:x=(w-text_w)/2:y=120:shadowcolor=black@0.9:shadowx=3:shadowy=3"
)

shot_files = []

for s in shots:
    idx = s["id"]
    scene_path = assets_dir / s["image"]
    aud_path = audio_dir / s["audio"]
    out_clip = clips_dir / f"real_shot_{idx}.mp4"
    
    # Get audio duration
    ffprobe_cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", str(aud_path)]
    res = subprocess.run(ffprobe_cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip())
    
    print(f"🎬 Assembling Shot {idx}/8: {s['desc']} ({dur:.2f}s)...")
    
    vf = f"{s['filter']},{top_watermark}"
    
    cmd = [
        "ffmpeg", "-y",
        "-loop", "1",
        "-i", str(scene_path),
        "-i", str(aud_path),
        "-vf", vf,
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

print("🔗 Concatenating 8 shots into 9:16 vertical master...")
concat_list = base_dir / "concat_list.txt"
with open(concat_list, "w", encoding="utf-8") as f:
    for sf in shot_files:
        f.write(f"file '{sf.as_posix()}'\n")

unmixed_video = output_dir / "temp_unmixed.mp4"
subprocess.run([
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_list),
    "-c", "copy",
    str(unmixed_video)
], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

# Audio mixing with warm background music
bgm_path = audio_dir / "bgm_indian_commercial.wav"
final_video = output_dir / "real_human_shop_hybrid_master.mp4"
export_video = exports_dir / "real_human_shop_hybrid_master.mp4"

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
print(f"✅ 9:16 REAL HUMAN HYBRID MASTER COMPILED! Output: {final_video} ({size_mb:.2f} MB)")
