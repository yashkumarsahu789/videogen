#!/usr/bin/env python3
"""
🎬 Universal Cloud & Local Video Renderer for VIBDECODING Studio.
Renders Remotion / Python video projects across GitHub Actions and Local environments.
"""

import os
import sys
import re
import shutil
import argparse
import subprocess
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parent.parent

def get_npx():
    return "npx.cmd" if os.name == "nt" else "npx"

def render_samples():
    script_path = ROOT_DIR / "brandkit" / "characters" / "engine" / "render_suite" / "batch_render.py"
    if not script_path.exists():
        print(f"❌ Error: {script_path} not found!")
        return False
    print("\n🚀 Executing Sample Renders for all 5 characters...")
    res = subprocess.run([sys.executable, str(script_path)], cwd=str(ROOT_DIR))
    return res.returncode == 0

def find_composition_id(root_tsx: Path) -> str:
    if not root_tsx.exists():
        return "MainComposition"
    content = root_tsx.read_text(encoding="utf-8")
    match = re.search(r'id=["\']([^"\']+)["\']', content)
    if match:
        return match.group(1)
    return "MainComposition"

def render_single_project(project_dir: Path):
    project_dir = project_dir.resolve()
    project_name = project_dir.name
    print(f"\n=======================================================")
    print(f"🎬 PROCESSING PROJECT: {project_name}")
    print(f"📁 Path: {project_dir}")
    print(f"=======================================================")

    code_dir = project_dir / "code"
    audio_dir = project_dir / "audio"
    output_dir = project_dir / "output"
    exports_dir = ROOT_DIR / "exports"

    output_dir.mkdir(parents=True, exist_ok=True)
    exports_dir.mkdir(parents=True, exist_ok=True)

    # 1. Check if custom python render script exists
    custom_render = code_dir / "render.py"
    if custom_render.exists():
        print(f"▶ Running custom script: {custom_render}")
        res = subprocess.run([sys.executable, str(custom_render)], cwd=str(code_dir))
        return res.returncode == 0

    # 2. Check for Remotion structure
    src_index = code_dir / "src" / "index.ts"
    root_tsx = code_dir / "src" / "Root.tsx"

    if not src_index.exists():
        print(f"⚠️ No src/index.ts found in {code_dir}. Skipping.")
        return False

    # Find main audio file if available
    audio_file = None
    if audio_dir.exists():
        audio_candidates = list(audio_dir.glob("*.mp3")) + list(audio_dir.glob("*.wav"))
        if audio_candidates:
            audio_file = audio_candidates[0]
            print(f"🎵 Found audio: {audio_file.name}")

    # Check if visemes.json exists, if not generate it
    visemes_json = code_dir / "src" / "visemes.json"
    if not visemes_json.exists() and audio_file:
        viseme_gen = ROOT_DIR / "brandkit" / "characters" / "engine" / "audio_to_visemes.py"
        if viseme_gen.exists():
            print(f"🔄 Auto-generating visemes from {audio_file.name}...")
            subprocess.run([
                sys.executable, str(viseme_gen),
                "-i", str(audio_file),
                "-o", str(visemes_json)
            ], check=True)

    # Determine Composition ID
    comp_id = find_composition_id(root_tsx)
    print(f"🎯 Target Composition ID: {comp_id}")

    temp_video = output_dir / f"_temp_{project_name}.mp4"
    final_output = output_dir / f"{project_name}.mp4"
    export_output = exports_dir / f"{project_name}.mp4"

    # Ensure dependencies if package.json exists in code_dir
    npm_bin = "npm.cmd" if os.name == "nt" else "npm"
    if (code_dir / "package.json").exists() and not (code_dir / "node_modules").exists():
        print(f"📦 Ensuring dependencies in {code_dir.name}...")
        subprocess.run([npm_bin, "install", "--prefer-offline", "--no-audit"], cwd=str(code_dir), check=True)

    # Run Remotion render
    npx_bin = get_npx()
    render_cmd = [
        npx_bin, "remotion", "render",
        "src/index.ts", comp_id,
        str(temp_video),
        "--concurrency=2"
    ]
    if os.name != "nt":
        render_cmd.extend(["--gl=angle", "--enable-multiprocess-on-linux"])

    print(f"⚡ Rendering frames with Remotion (cmd: {' '.join(render_cmd)})...")
    try:
        subprocess.run(render_cmd, cwd=str(code_dir), check=True)
    except subprocess.CalledProcessError as e:
        print(f"⚠️ Primary render attempt failed (exit code {e.returncode}). Retrying with software OpenGL (swiftshader)...")
        if os.name != "nt":
            fallback_cmd = [
                npx_bin, "remotion", "render",
                "src/index.ts", comp_id,
                str(temp_video),
                "--concurrency=1",
                "--gl=swiftshader",
                "--enable-multiprocess-on-linux"
            ]
            subprocess.run(fallback_cmd, cwd=str(code_dir), check=True)
        else:
            raise

    # Multiplex with Audio if audio exists
    if audio_file and audio_file.exists():
        print(f"🔀 Multiplexing video with {audio_file.name}...")
        ffmpeg_cmd = [
            "ffmpeg", "-y",
            "-i", str(temp_video),
            "-i", str(audio_file),
            "-c:v", "copy",
            "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart",
            str(final_output)
        ]
        subprocess.run(ffmpeg_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
        if temp_video.exists():
            temp_video.unlink()
    else:
        if temp_video.exists():
            shutil.move(str(temp_video), str(final_output))

    # Copy to exports
    shutil.copy2(str(final_output), str(export_output))

    print(f"✅ SUCCESSFULLY RENDERED:")
    print(f"   📹 Master Video: {final_output}")
    print(f"   📤 Export Copy:  {export_output}")
    return True

def get_latest_project() -> Path:
    video_output = ROOT_DIR / "video_output"
    if not video_output.exists():
        return None

    # 1. Try finding latest project from git commit history
    try:
        git_res = subprocess.run(
            ["git", "log", "-n", "1", "--pretty=format:", "--name-only", "video_output/"],
            cwd=str(ROOT_DIR), capture_output=True, text=True
        )
        if git_res.returncode == 0 and git_res.stdout.strip():
            for line in git_res.stdout.strip().splitlines():
                line = line.strip().replace("\\", "/")
                if line.startswith("video_output/"):
                    parts = line.split("/")
                    if len(parts) >= 2:
                        candidate = video_output / parts[1]
                        if candidate.is_dir() and (candidate / "code").exists():
                            return candidate
    except Exception:
        pass

    # 2. Fallback to filesystem modification time
    projects = [p for p in video_output.iterdir() if p.is_dir() and (p / "code").exists()]
    if not projects:
        return None
    projects.sort(key=lambda p: p.stat().st_mtime, reverse=True)
    return projects[0]

def main():
    parser = argparse.ArgumentParser(description="VIBDECODING Cloud & Local Video Renderer")
    parser.add_argument("--target", default="latest", help="'latest', 'all', 'samples', or project name/path")
    args = parser.parse_args()

    target = args.target.strip()
    print(f"🎬 Initiating Cloud Render Pipeline | Target: '{target}'")

    if target == "samples":
        success = render_samples()
        sys.exit(0 if success else 1)

    video_output = ROOT_DIR / "video_output"

    if target == "latest":
        latest = get_latest_project()
        if not latest:
            print("❌ No projects found in video_output/ to render!")
            sys.exit(1)
        success = render_single_project(latest)
        sys.exit(0 if success else 1)

    if target == "all":
        projects = [p for p in video_output.iterdir() if p.is_dir() and (p / "code").exists()]
        if not projects:
            print("❌ No projects found in video_output/ to render!")
            sys.exit(1)
        all_ok = True
        for p in projects:
            ok = render_single_project(p)
            if not ok:
                all_ok = False
        sys.exit(0 if all_ok else 1)

    # Specific project name or path passed
    candidate = video_output / target
    if not candidate.exists():
        candidate = Path(target)
    
    if candidate.exists() and candidate.is_dir():
        success = render_single_project(candidate)
        sys.exit(0 if success else 1)
    else:
        print(f"❌ Project '{target}' could not be found!")
        sys.exit(1)

if __name__ == "__main__":
    main()

