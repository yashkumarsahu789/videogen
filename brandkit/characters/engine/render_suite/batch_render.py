import os
import sys
import subprocess
from pathlib import Path

ROSTER = [
    {
        "id": "alex",
        "comp": "AlexSample",
        "audio": "brandkit/characters/alex/alex_sample_5s.mp3"
    },
    {
        "id": "maya",
        "comp": "MayaSample",
        "audio": "brandkit/characters/maya/maya_sample_5s.mp3"
    },
    {
        "id": "kabir",
        "comp": "KabirSample",
        "audio": "brandkit/characters/kabir/kabir_sample_5s.mp3"
    },
    {
        "id": "riya",
        "comp": "RiyaSample",
        "audio": "brandkit/characters/riya/riya_sample_5s.mp3"
    },
    {
        "id": "dev",
        "comp": "DevSample",
        "audio": "brandkit/characters/dev/dev_sample_5s.mp3"
    }
]

def render_character(item):
    char_id = item["id"]
    comp_id = item["comp"]
    audio_path = Path(item["audio"]).resolve()
    
    print(f"\n==================================================")
    print(f"🎬 RENDERING CHARACTER: {char_id.upper()} ({comp_id})")
    print(f"==================================================")
    
    temp_video = Path(f"brandkit/characters/engine/render_suite/temp_{char_id}.mp4").resolve()
    char_output = Path(f"brandkit/characters/{char_id}/{char_id}_sample_5s.mp4").resolve()
    export_output = Path(f"exports/{char_id}_sample_5s.mp4").resolve()
    
    export_output.parent.mkdir(parents=True, exist_ok=True)
    char_output.parent.mkdir(parents=True, exist_ok=True)
    
    # 1. Remotion Render
    npx_bin = "npx.cmd" if os.name == "nt" else "npx"
    cmd_remotion = [
        npx_bin, "remotion", "render",
        "src/index.ts", comp_id,
        str(temp_video),
        "--concurrency=4"
    ]
    subprocess.run(cmd_remotion, cwd=str(Path("brandkit/characters/engine/render_suite").resolve()), check=True)
    
    # 2. Multiplex with audio
    cmd_ffmpeg = [
        "ffmpeg", "-y",
        "-i", str(temp_video),
        "-i", str(audio_path),
        "-c:v", "copy",
        "-c:a", "aac", "-b:a", "192k",
        "-movflags", "+faststart",
        str(char_output)
    ]
    subprocess.run(cmd_ffmpeg, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    
    # 3. Copy to exports
    import shutil
    shutil.copy2(str(char_output), str(export_output))
    
    # Cleanup temp
    if temp_video.exists():
        temp_video.unlink()
        
    print(f"✓ {char_id.upper()} completed!")
    print(f"  Character Master: {char_output}")
    print(f"  Export: {export_output}")

def main():
    for item in ROSTER:
        render_character(item)
    print("\n🎉 ALL 5 CHARACTER VIDEOS RENDERED SUCCESSFULLY!")

if __name__ == "__main__":
    main()

