import subprocess
import os
from pathlib import Path

clips_dir = Path("video_output/shop_digital_dukaan_3d/clips")
clips = [clips_dir / f"clip{i}.mp4" for i in range(1, 7)]
audio_master = "video_output/shop_digital_dukaan_3d/audio/commercial_audio_master.mp3"
output_dir = Path("video_output/shop_digital_dukaan_3d/output")
output_dir.mkdir(parents=True, exist_ok=True)
final_master = output_dir / "shop_digital_dukaan_commercial_master.mp4"

# 5 Continuous Broadcast Cartoon Transitions:
# 1->2: Smooth Action Slide (slideleft 0.4s at 8.0s)
# 2->3: Storefront Glow Reveal (wipeleft 0.4s at 18.0s)
# 3->4: Dynamic Directional Pan (slideright 0.4s at 26.0s)
# 4->5: Match Cut Delivery Wipe (wipeup 0.4s at 37.0s)
# 5->6: Celebratory Iris-Out Circle Crop (circlecrop 0.4s at 47.0s)

filter_str = (
    "[0:v][1:v]xfade=transition=slideleft:duration=0.4:offset=8.0[v01];"
    "[v01][2:v]xfade=transition=wipeleft:duration=0.4:offset=18.0[v02];"
    "[v02][3:v]xfade=transition=slideright:duration=0.4:offset=26.0[v03];"
    "[v03][4:v]xfade=transition=wipeup:duration=0.4:offset=37.0[v04];"
    "[v04][5:v]xfade=transition=circlecrop:duration=0.4:offset=47.0[vfinal]"
)

cmd = [
    "ffmpeg", "-y",
    "-i", str(clips[0]),
    "-i", str(clips[1]),
    "-i", str(clips[2]),
    "-i", str(clips[3]),
    "-i", str(clips[4]),
    "-i", str(clips[5]),
    "-i", audio_master,
    "-filter_complex", filter_str,
    "-map", "[vfinal]",
    "-map", "6:a",
    "-c:v", "libx264",
    "-preset", "fast",
    "-crf", "19",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    "-pix_fmt", "yuv420p",
    str(final_master)
]

print("⚡ Assembling Full 3D Cartoon Commercial Masterpiece with Broadcast Transitions & Theatrical Audio...")
subprocess.run(cmd, check=True)
print(f"\n🏆 COMMERCIAL MASTER READY! Path: {final_master} | Size: {round(os.path.getsize(final_master)/1024/1024, 2)} MB")
