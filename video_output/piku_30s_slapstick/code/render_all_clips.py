import os
import time
import shutil
import subprocess
from pathlib import Path
from gradio_client import Client, handle_file

print("🚀 Connecting to Lightricks LTX-Video Cloud Engine...")
client = Client("Lightricks/ltx-video-distilled")
print("✅ Connected to Cloud GPU!")

assets_path = Path("video_output/piku_30s_slapstick/assets")
output_dir = Path("video_output/piku_30s_slapstick/output")
output_dir.mkdir(parents=True, exist_ok=True)

clips = [
    ("scene1_chase_leaf_slide.jpg", "clip1.mp4", "Three panicked spotted hyenas sliding fast on giant green leaves downhill wide eyed screaming, cheeky baby monkey laughing"),
    ("scene2_banana_peel_slip.jpg", "clip2.mp4", "Three goofy hyenas slipping wildly on giant yellow banana peels spinning like tops in panic, baby monkey Piku pointing laughing"),
    ("scene3_armadillo_bowling.jpg", "clip3.mp4", "Cheeky baby monkey rolling spiky armadillo bowling ball downhill knocking into hyenas sliding on giant leaf"),
    ("scene4_spiderweb_catapult.jpg", "clip4.mp4", "Three hyenas crashing into glowing giant elastic spiderweb trampoline stretching back and slingshotting them into sky"),
    ("scene5_crocodile_belly_crash.jpg", "clip5.mp4", "Three terrified hyenas falling from sky face-planting on sleeping giant green crocodile squishy belly riverbank"),
    ("scene6_victory_mango_laugh.jpg", "clip6.mp4", "Baby monkey Piku eating juicy mango winking double thumbs up, three hyenas stuck upside down in tree branches dizzy stars")
]

clip_paths = []
for idx, (img_name, out_name, prompt) in enumerate(clips):
    out_file = output_dir / out_name
    img_file = assets_path / img_name
    
    if out_file.exists() and out_file.stat().st_size > 100000:
        print(f"⏩ Clip {idx+1}/6 already exists: {out_name}")
        clip_paths.append(str(out_file))
        continue
        
    print(f"\n🎬 Rendering Clip {idx+1}/6: {img_name}...")
    t0 = time.time()
    
    for attempt in range(6):
        try:
            res = client.predict(
                prompt=prompt,
                negative_prompt="blurry, low quality, jittery, distorted",
                input_image_filepath=handle_file(str(img_file)),
                input_video_filepath=None,
                height_ui=512,
                width_ui=704,
                mode="image-to-video",
                duration_ui=5.0,
                ui_frames_to_use=9,
                seed_ui=50 + idx,
                randomize_seed=False,
                ui_guidance_scale=1,
                improve_texture_flag=True,
                api_name="/image_to_video"
            )
            break
        except Exception as err:
            if attempt < 5:
                print(f"⏳ Queue busy ({err}). Waiting 25s to retry ({attempt+2}/6)...")
                time.sleep(25)
            else:
                raise err
                
    video_res = res[0]
    raw_path = video_res["video"] if isinstance(video_res, dict) and "video" in video_res else video_res
    shutil.copyfile(raw_path, str(out_file))
    clip_paths.append(str(out_file))
    print(f"✓ Clip {idx+1} completed in {round(time.time() - t0, 1)}s -> {out_name}")

print("\n🎉 ALL 6 CLIPS RENDERED ON CLOUD GPU!")

# Step 3: Concat & Merge with 30s master voiceover
concat_txt = output_dir / "concat_30s.txt"
with open(concat_txt, "w") as f:
    for cp in clip_paths:
        f.write(f"file '{os.path.abspath(cp)}'\n")

audio_path = "video_output/piku_30s_slapstick/audio/voiceover_30s_master.mp3"
final_master = output_dir / "piku_30s_slapstick_cartoon_master.mp4"

merge_cmd = f'ffmpeg -y -f concat -safe 0 -i "{concat_txt}" -i "{audio_path}" -c:v libx264 -c:a aac -shortest -pix_fmt yuv420p "{final_master}"'
print(f"⚡ Merging into Final Master Movie: {final_master.name}...")
subprocess.run(merge_cmd, shell=True, check=True)

print(f"\n🏆 MASTERPIECE READY! Size: {round(os.path.getsize(final_master)/1024/1024, 2)} MB")
