import os
import sys
import json
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

base_dir = Path(__file__).resolve().parent.parent
root_dir = base_dir.parent.parent
assets_dir = base_dir / "assets"
sprites_dir = assets_dir / "sprites"
audio_dir = base_dir / "audio"
output_dir = base_dir / "output"
exports_dir = root_dir / "exports"

output_dir.mkdir(parents=True, exist_ok=True)
exports_dir.mkdir(parents=True, exist_ok=True)

timeline_file = audio_dir / "master_timeline.json"
audio_master = audio_dir / "face_to_face_master_audio.mp3"
bg_path = assets_dir / "stage_background.jpg"
final_video = output_dir / "face_to_face_animated_dialogue_master.mp4"
export_video = exports_dir / "face_to_face_animated_dialogue_master.mp4"

print("🎬 Loading master timeline & pre-rendering stage...")
with open(timeline_file, "r", encoding="utf-8") as f:
    timeline = json.load(f)

total_frames = timeline["total_frames"]
fps = timeline["fps"]
print(f"Total frames to animate: {total_frames} ({timeline['duration_seconds']}s @ {fps} FPS)")

# 1. Prepare base background with clean top watermark
bg = Image.open(bg_path).convert("RGB")
draw_bg = ImageDraw.Draw(bg)

# Try loading font or default
font = None
for font_name in ["arialbd.ttf", "arial.ttf", "DejaVuSans-Bold.ttf", "segoeui.ttf"]:
    try:
        font = ImageFont.truetype(font_name, 28)
        break
    except:
        continue
if not font:
    font = ImageFont.load_default()

# Clean top watermark - NO background color box!
watermark_text = "shop.lifesolvenow.com"
# Subtle drop shadow for crisp readability
draw_bg.text((642, 42), watermark_text, fill=(0, 0, 0, 180), font=font, anchor="mm")
draw_bg.text((640, 40), watermark_text, fill=(56, 189, 248), font=font, anchor="mm")

# 2. Pre-load all character sprites into memory
print("⚡ Loading character sprites into memory cache...")
dev_cache = {}
riya_cache = {}

mouths = ['rest', 'open_small', 'open_wide', 'o_shape', 'e_shape', 'smile']
eyes_list = ['open', 'blink']

for m in mouths:
    for e in eyes_list:
        dev_file = sprites_dir / f"dev_{e}_{m}.png"
        riya_file = sprites_dir / f"riya_{e}_{m}.png"
        
        dev_im = Image.open(dev_file).convert("RGBA")
        riya_im = Image.open(riya_file).convert("RGBA")
        
        # Scale to 480x640
        dev_scaled = dev_im.resize((480, 640), Image.Resampling.LANCZOS)
        riya_scaled = riya_im.resize((480, 640), Image.Resampling.LANCZOS).transpose(Image.FLIP_LEFT_RIGHT)
        
        dev_cache[(e, m)] = dev_scaled
        riya_cache[(e, m)] = riya_scaled

print("✓ All 24 sprites cached!")

# 3. Setup FFmpeg pipe for high-speed rawvideo streaming
ffmpeg_log_file = open(base_dir / "ffmpeg_render.log", "w")
ffmpeg_cmd = [
    "ffmpeg", "-y",
    "-loglevel", "error",
    "-f", "rawvideo",
    "-vcodec", "rawvideo",
    "-s", "1280x720",
    "-pix_fmt", "rgb24",
    "-r", str(fps),
    "-i", "-", # stdin raw frames
    "-i", str(audio_master),
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "18",
    "-pix_fmt", "yuv420p",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(final_video)
]

print("\n🚀 Starting frame-accurate character animation render pipeline...")
proc = subprocess.Popen(ffmpeg_cmd, stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=ffmpeg_log_file)

bg_w, bg_h = bg.size
frame_bytes_list = []

for idx, frame_info in enumerate(timeline["frames"]):
    # Create frame from base background
    frame_img = bg.copy()
    
    # Dev state
    d_eyes = frame_info["dev"]["eyes"]
    d_mouth = frame_info["dev"]["mouth"]
    d_bob = frame_info["dev"]["bob"]
    
    dev_sprite = dev_cache.get((d_eyes, d_mouth), dev_cache[("open", "rest")])
    # Dev position on left
    dev_x = 100
    dev_y = 100 + int(d_bob)
    frame_img.paste(dev_sprite, (dev_x, dev_y), dev_sprite)
    
    # Riya state
    r_eyes = frame_info["riya"]["eyes"]
    r_mouth = frame_info["riya"]["mouth"]
    r_bob = frame_info["riya"]["bob"]
    
    riya_sprite = riya_cache.get((r_eyes, r_mouth), riya_cache[("open", "rest")])
    # Riya position on right facing left
    riya_x = 700
    riya_y = 100 + int(r_bob)
    frame_img.paste(riya_sprite, (riya_x, riya_y), riya_sprite)
    
    # Pipe raw RGB bytes to ffmpeg
    raw_bytes = frame_img.tobytes()
    proc.stdin.write(raw_bytes)
    
    if (idx + 1) % 150 == 0 or (idx + 1) == total_frames:
        pct = (idx + 1) / total_frames * 100
        sec = (idx + 1) / fps
        turn = frame_info["turn"]
        speaker = frame_info["speaker"].upper()
        print(f"  Frame {idx+1}/{total_frames} ({sec:.1f}s - {pct:.1f}%) | Turn {turn} ({speaker}) [Dev mouth: {d_mouth} | Riya mouth: {r_mouth}]")

proc.stdin.close()
proc.wait()
ffmpeg_log_file.close()

if proc.returncode != 0:
    with open(base_dir / "ffmpeg_render.log", "r") as lf:
        err = lf.read()
    print(f"❌ FFmpeg error:\n{err}")
    sys.exit(proc.returncode)

# Copy to exports
import shutil
shutil.copy2(final_video, export_video)

file_sz_mb = round(os.path.getsize(final_video) / (1024 * 1024), 2)
print(f"\n🏆 ANIMATED FACE-TO-FACE MASTER VIDEO READY!")
print(f"  Master File: {final_video}")
print(f"  Export File: {export_video}")
print(f"  Duration: {timeline['duration_seconds']}s")
print(f"  Size: {file_sz_mb} MB")
print(f"  Characters: Dev (Male / Left) & Riya (Female / Right)")
print(f"  Animation: Frame-accurate lip-sync, blinking & natural body bobbing")
