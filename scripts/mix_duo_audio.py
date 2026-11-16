import subprocess
import os

audio_dir = "video_output/shop_duo_reel_3d/audio"
bgm = "video_output/shop_digital_dukaan_3d/audio/bgm_indian_commercial.wav"
out_master = os.path.join(audio_dir, "duo_reel_audio_master.mp3")

# Lines list
lines = [
    os.path.join(audio_dir, f"line{i}_ramesh.mp3" if i in (1,3,5,7) else f"line{i}_priya.mp3")
    for i in range(1, 9)
]

concat_txt = os.path.join(audio_dir, "dialogue_concat.txt")
with open(concat_txt, "w") as f:
    for lp in lines:
        f.write(f"file '{os.path.abspath(lp)}'\n")

dialogue_merged = os.path.join(audio_dir, "dialogue_all.wav")
cmd1 = [
    "ffmpeg", "-y",
    "-f", "concat",
    "-safe", "0",
    "-i", concat_txt,
    "-c:a", "pcm_s16le",
    dialogue_merged
]
subprocess.run(cmd1, check=True)
print("Merged all dialogue lines into dialogue_all.wav")

# Now mix with BGM with sidechain ducking or balanced volume
cmd2 = [
    "ffmpeg", "-y",
    "-i", dialogue_merged,
    "-i", bgm,
    "-filter_complex",
    "[0:a]volume=1.35[vo];[1:a]volume=0.30[bgm];[vo][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]",
    "-map", "[aout]",
    "-c:a", "libmp3lame",
    "-b:a", "192k",
    out_master
]
subprocess.run(cmd2, check=True)
print(f"Generated duo_reel_audio_master.mp3: {os.path.getsize(out_master)} bytes")
