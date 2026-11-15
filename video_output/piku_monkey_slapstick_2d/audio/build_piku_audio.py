import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

AUDIO_DIR = Path(__file__).resolve().parent

dialogues = [
    {
        "id": "scene1_piku",
        "speaker": "piku",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+20%",
        "pitch": "+12Hz",
        "text": "वाह! इतना मीठा और रसीला आम! मज़ा आ गया!"
    },
    {
        "id": "scene1_leopard",
        "speaker": "chitu",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+12%",
        "pitch": "+4Hz",
        "text": "भालू देख! आज आम के साथ इस बंदर का भी शिकार करेंगे!"
    },
    {
        "id": "scene1_bear",
        "speaker": "bhalu",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-2%",
        "pitch": "-8Hz",
        "text": "हाहाहा! चल चुपके से झपट्टा मारते हैं!"
    },
    {
        "id": "scene2_launch",
        "speaker": "both",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+25%",
        "pitch": "+10Hz",
        "text": "अरे नहीं! ये बांस की डाल तो हवा में उछल गयी! बचाओओओ!"
    },
    {
        "id": "scene2_piku_laugh",
        "speaker": "piku",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+22%",
        "pitch": "+14Hz",
        "text": "हाहाहाहा! टाटा बाय बाय!"
    },
    {
        "id": "scene3_beehive",
        "speaker": "bhalu",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+15%",
        "pitch": "-4Hz",
        "text": "अरे बाप रे! मधुमक्खियों का छत्ता मेरे सिर पर फंस गया! भागो!"
    },
    {
        "id": "scene4_slip",
        "speaker": "chitu",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+22%",
        "pitch": "+6Hz",
        "text": "केले का छिलका! मेरा पैर फिसल रहा है! रास्ते से हटो भालू!"
    },
    {
        "id": "scene5_splash_win",
        "speaker": "piku",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+10%",
        "pitch": "+10Hz",
        "text": "छपाक! पानी ठंडा लगा ना? पीकू से पंगा मत लेना दोस्तों!"
    }
]

async def build():
    seg_files = []
    cues = []
    current_time = 0.0

    print("🎙️ Synthesizing comedy dialogue clips...")
    for idx, d in enumerate(dialogues):
        seg_file = AUDIO_DIR / f"d_{idx}_{d['id']}.mp3"
        comm = edge_tts.Communicate(d["text"], d["voice"], rate=d["rate"], pitch=d["pitch"])
        await comm.save(str(seg_file))

        # Get duration
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(seg_file)],
            stdout=subprocess.PIPE, text=True, check=True
        )
        dur = float(probe.stdout.strip())
        cues.append({
            "id": d["id"],
            "speaker": d["speaker"],
            "start": round(current_time, 2),
            "end": round(current_time + dur, 2),
            "duration": round(dur, 2),
            "text": d["text"]
        })
        current_time += dur + 0.25
        seg_files.append((seg_file, dur))

    with open(AUDIO_DIR / "timeline_cues.json", "w", encoding="utf-8") as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    print(f"✓ Saved {len(cues)} timeline cues! Duration: {current_time:.2f}s")

    # Generate silence separator
    silence = AUDIO_DIR / "silence_025.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", "0.25",
        "-q:a", "9", "-acodec", "libmp3lame", str(silence)
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    concat_txt = AUDIO_DIR / "concat.txt"
    with open(concat_txt, "w", encoding="utf-8") as f:
        for idx, (sf, _) in enumerate(seg_files):
            f.write(f"file '{sf.name}'\n")
            if idx < len(seg_files) - 1:
                f.write(f"file '{silence.name}'\n")

    master_mp3 = AUDIO_DIR / "voiceover.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_txt),
        "-c", "copy", str(master_mp3)
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"✓ Master dialogue audio saved: {master_mp3}")

    # Visemes
    visemes_path = AUDIO_DIR / "visemes.json"
    subprocess.run([
        "python", "brandkit/characters/engine/audio_to_visemes.py",
        "-i", str(master_mp3),
        "-o", str(visemes_path),
        "--fps", "30"
    ], check=True)
    print("✓ Frame-accurate visemes generated successfully!")

if __name__ == "__main__":
    asyncio.run(build())
