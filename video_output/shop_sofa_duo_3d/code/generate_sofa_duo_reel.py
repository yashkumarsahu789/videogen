import subprocess
import os
from pathlib import Path

base_dir = Path("video_output/shop_sofa_duo_3d")
assets_dir = base_dir / "assets"
audio_dir = base_dir / "audio"
clips_dir = base_dir / "clips"
output_dir = base_dir / "output"

clips_dir.mkdir(parents=True, exist_ok=True)
output_dir.mkdir(parents=True, exist_ok=True)

# 8 Sofa Conversation Shots:
# (idx, base_scene_img, audio_file, speaker, subtitle_text, broll_overlay_or_none, camera_motion)
shots = [
    (
        1,
        "sofa_living_room_duo.jpg",
        "line1_ramesh.mp3",
        "Ramesh Bhaiya",
        "Priya behen, bazaar me grahak aana kam ho gaye hain... main kya karun?",
        None,
        "zoompan=z='min(zoom+0.0006,1.15)':x='iw*0.2-(iw/zoom*0.2)':y='ih/2-(ih/zoom/2)':d=228:s=1280x720:fps=30"
    ),
    (
        2,
        "sofa_living_room_duo.jpg",
        "line2_priya.mp3",
        "Priya",
        "Arrey Ramesh Bhaiya! Jab grahak phone par hain, toh dukan bhi online honi chahiye!",
        None,
        "zoompan=z='min(zoom+0.0006,1.18)':x='iw*0.75-(iw/zoom*0.75)':y='ih*0.45-(ih/zoom*0.45)':d=240:s=1280x720:fps=30"
    ),
    (
        3,
        "char_ramesh.jpg",
        "line3_ramesh.mp3",
        "Ramesh Bhaiya",
        "Lekin behen, mujhe toh koi computer ya technical kaam nahi aata...",
        None,
        "zoompan=z='min(zoom+0.0008,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=162:s=1280x720:fps=30"
    ),
    (
        4,
        "sofa_living_room_duo.jpg",
        "line4_priya.mp3",
        "Priya",
        "Koi technical kaam nahi! shop.lifesolvenow.com par photo daalo aur WhatsApp par link share karo!",
        "broll_storefront.jpg",
        "zoompan=z='1.08':x='iw*0.6-(iw/zoom*0.6)':y='ih/2-(ih/zoom/2)':d=390:s=1280x720:fps=30"
    ),
    (
        5,
        "char_ramesh.jpg",
        "line5_ramesh.mp3",
        "Ramesh Bhaiya",
        "Aur grahak seedha mujhse judenge?",
        None,
        "zoompan=z='min(zoom+0.0006,1.10)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=96:s=1280x720:fps=30"
    ),
    (
        6,
        "char_priya.jpg",
        "line6_priya.mp3",
        "Priya",
        "Haan bilkul! Seedha WhatsApp ya call par! Na koi bicholiya, na koi commission!",
        "broll_whatsapp.jpg",
        "zoompan=z='min(zoom+0.0006,1.12)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=243:s=1280x720:fps=30"
    ),
    (
        7,
        "sofa_living_room_duo.jpg",
        "line7_ramesh.mp3",
        "Ramesh Bhaiya",
        "Wah! Matlab ab har dukan ki apni digital pehchaan!",
        "broll_customer.jpg",
        "zoompan=z='if(lte(zoom,1.0),1.15,max(1.001,zoom-0.0005))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=162:s=1280x720:fps=30"
    ),
    (
        8,
        "broll_finale.jpg",
        "line8_priya.mp3",
        "LifeSolveNow",
        "Toh der kis baat ki? Aaj hi visit kijiye — shop.lifesolvenow.com!",
        None,
        "zoompan=z='if(lte(zoom,1.0),1.12,max(1.001,zoom-0.0004))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=211:s=1280x720:fps=30"
    )
]

shot_files = []

for idx, scene_img, aud_file, speaker, sub_text, broll, motion_filter in shots:
    out_clip = clips_dir / f"sofa_shot{idx}.mp4"
    aud_path = audio_dir / aud_file
    scene_path = assets_dir / scene_img
    
    # Get audio duration
    ffprobe_cmd = ["ffprobe", "-v", "quiet", "-show_entries", "format=duration", "-of", "csv=p=0", str(aud_path)]
    res = subprocess.run(ffprobe_cmd, capture_output=True, text=True)
    dur = float(res.stdout.strip())
    
    print(f"🎬 Rendering Sofa Shot {idx}/8: {speaker} ({dur:.2f}s)...")
    
    clean_sub = sub_text.replace("'", "").replace(":", "-").replace(",", "")
    clean_speaker = speaker.upper()
    
    if broll:
        broll_path = assets_dir / broll
        filter_str = (
            f"[0:v]{motion_filter}[bg];"
            f"[1:v]scale=460:260,drawbox=t=4:c=0x38bdf8@0.9[pip];"
            f"[bg][pip]overlay=W-w-50:H/2-h/2-25:enable='between(t,0.8,{dur-0.5})'[ov];"
            f"[ov]drawbox=y=ih-120:color=black@0.65:width=iw:height=100:t=fill,"
            f"drawtext=text='{clean_speaker}':fontcolor=0x38bdf8:fontsize=22:x=60:y=h-105,"
            f"drawtext=text='{clean_sub}':fontcolor=white:fontsize=24:x=60:y=h-68[v]"
        )
        cmd = [
            "ffmpeg", "-y",
            "-loop", "1", "-i", str(scene_path),
            "-loop", "1", "-i", str(broll_path),
            "-i", str(aud_path),
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
    print(f"✓ Sofa Shot {idx} ready: {out_clip.name}")

print("\n🎉 ALL 8 SOFA SHOTS READY! Concatenating...")

# Step 2: Concat all 8 shots
concat_list = base_dir / "concat_sofa.txt"
with open(concat_list, "w") as f:
    for sf in shot_files:
        f.write(f"file '{os.path.abspath(sf)}'\n")

raw_master = output_dir / "raw_sofa_reel.mp4"
concat_cmd = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", str(concat_list),
    "-c", "copy",
    str(raw_master)
]
subprocess.run(concat_cmd, check=True)

# Step 3: Mix background music under the full video
bgm_path = "video_output/shop_digital_dukaan_3d/audio/bgm_indian_commercial.wav"
final_master = output_dir / "shop_sofa_duo_reel_master.mp4"

mix_cmd = [
    "ffmpeg", "-y",
    "-i", str(raw_master),
    "-i", bgm_path,
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.25[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "0:v",
    "-map", "[aout]",
    "-c:v", "copy",
    "-c:a", "aac",
    "-b:a", "192k",
    "-shortest",
    str(final_master)
]
subprocess.run(mix_cmd, check=True)

print(f"\n🏆 SOFA DUO REEL MASTER READY! Path: {final_master} | Size: {round(os.path.getsize(final_master)/1024/1024, 2)} MB")
