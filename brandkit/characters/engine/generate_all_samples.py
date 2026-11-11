import asyncio
import sys
from pathlib import Path

# Add voices path
sys.path.append(str(Path('brandkit/voices').resolve()))
from tts_engine import synthesize_async
import subprocess

chars = [
    {
        "id": "alex",
        "voice": "aarav",
        "text": "Namaste dosto! Main hu Alex, aapka vibe coding aur tech creator partner.",
        "rate": "+15%"
    },
    {
        "id": "maya",
        "voice": "ananya",
        "text": "Hey creators! Main hu Maya, aur main direct karungi aapke AI videos.",
        "rate": "+15%"
    },
    {
        "id": "kabir",
        "voice": "kabir",
        "text": "Greetings. Main Kabir hu, deep explainers aur complex topics ko simple banane ke liye.",
        "rate": "+8%"
    },
    {
        "id": "riya",
        "voice": "riya",
        "text": "Hello friends! Main hu Riya, lifestyle aur creative video ideas share karne.",
        "rate": "+12%"
    },
    {
        "id": "dev",
        "voice": "dev",
        "text": "Yo coders! Main Dev hu, 30-second speed code aur rapid tech hacks ke liye.",
        "rate": "+20%"
    }
]

async def run_all():
    for c in chars:
        char_dir = Path(f"brandkit/characters/{c['id']}")
        char_dir.mkdir(parents=True, exist_ok=True)
        audio_path = char_dir / f"{c['id']}_sample_5s.mp3"
        visemes_path = char_dir / f"{c['id']}_sample_5s_visemes.json"
        
        print(f"Generating audio for {c['id'].upper()} ({c['voice']})...")
        dur = await synthesize_async(c['voice'], c['text'], str(audio_path), rate=c['rate'])
        
        print(f"Generating visemes for {c['id'].upper()}...")
        subprocess.run([
            "python", "brandkit/characters/engine/audio_to_visemes.py",
            "-i", str(audio_path),
            "-o", str(visemes_path),
            "--fps", "30"
        ], check=True)
        print(f"? {c['id'].upper()} ready!\n")

asyncio.run(run_all())
