import asyncio
import json
import subprocess
from pathlib import Path
import edge_tts

AUDIO_DIR = Path(__file__).resolve().parent

# Segments definition
segments = [
    {
        "id": "intro",
        "speaker": "announcer",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+12%",
        "pitch": "-1Hz",
        "text": "लेडीज़ एंड जेंटलमैन! वेलकम टू टून टसल! रेड कॉर्नर में 30% कमीशन ऐप, और ब्लू कॉर्नर में हमारा लोकल हीरो: स्मार्ट दुकानदार!"
    },
    {
        "id": "round1_villain",
        "speaker": "villain",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+15%",
        "pitch": "+10Hz",
        "text": "हाहाहा! दुकान तुम्हारी, मेहनत तुम्हारी, पर हर आर्डर पर 30% मलाई मेरी!"
    },
    {
        "id": "round1_hero",
        "speaker": "hero",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+10%",
        "pitch": "+0Hz",
        "text": "गलतफहमी में मत रहो! LifeSolveNow पर 0% कमीशन है! पूरा मुनाफा सीधे दुकानदार का!"
    },
    {
        "id": "round2_villain",
        "speaker": "villain",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+15%",
        "pitch": "+10Hz",
        "text": "पर कस्टमर का नंबर तो मेरे पास रहेगा, ग्राहक सिर्फ मेरा है!"
    },
    {
        "id": "round2_hero",
        "speaker": "hero",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+10%",
        "pitch": "+0Hz",
        "text": "LifeSolveNow पर हर आर्डर डायरेक्ट दुकानदार के व्हाट्सएप पर आता है! ग्राहक हमेशा के लिए हमारा!"
    },
    {
        "id": "knockout",
        "speaker": "announcer",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+14%",
        "pitch": "+1Hz",
        "text": "और ये पड़ा 0 रुपये का फ्री प्लान और 99 रुपये का गूगल बूस्ट! टोटल नॉकआउट!"
    },
    {
        "id": "cta",
        "speaker": "hero",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "दुकान को आज ही डिजिटल बनाओ 0% कमीशन पर! विजिट करें shop.lifesolvenow.com!"
    }
]

async def build_audio():
    seg_files = []
    cues = []
    current_time = 0.0

    print("🎙️ Synthesizing battle dialogue tracks...")
    for idx, seg in enumerate(segments):
        seg_file = AUDIO_DIR / f"seg_{idx}_{seg['id']}.mp3"
        comm = edge_tts.Communicate(seg["text"], seg["voice"], rate=seg["rate"], pitch=seg["pitch"])
        await comm.save(str(seg_file))
        
        # Get duration
        probe = subprocess.run(
            ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(seg_file)],
            stdout=subprocess.PIPE, text=True, check=True
        )
        dur = float(probe.stdout.strip())
        cues.append({
            "id": seg["id"],
            "speaker": seg["speaker"],
            "start": round(current_time, 2),
            "end": round(current_time + dur, 2),
            "duration": round(dur, 2),
            "text": seg["text"]
        })
        current_time += dur + 0.35  # short pause between lines
        seg_files.append((seg_file, dur))

    # Save timeline cues
    with open(AUDIO_DIR / "timeline_cues.json", "w", encoding="utf-8") as f:
        json.dump(cues, f, indent=2, ensure_ascii=False)
    print(f"✓ Saved {len(cues)} timeline cues! Total spoken duration: {current_time:.2f}s")

    # Generate master voiceover audio using ffmpeg concat with short silence
    concat_list_file = AUDIO_DIR / "concat_list.txt"
    silence_file = AUDIO_DIR / "silence_035.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", "0.35",
        "-q:a", "9", "-acodec", "libmp3lame", str(silence_file)
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)

    with open(concat_list_file, "w", encoding="utf-8") as f:
        for idx, (sf, _) in enumerate(seg_files):
            f.write(f"file '{sf.name}'\n")
            if idx < len(seg_files) - 1:
                f.write(f"file '{silence_file.name}'\n")

    master_mp3 = AUDIO_DIR / "voiceover.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(concat_list_file),
        "-c", "copy", str(master_mp3)
    ], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    print(f"✓ Master voiceover generated: {master_mp3}")

    # Generate visemes
    visemes_path = AUDIO_DIR / "visemes.json"
    print("👄 Generating frame-accurate visemes for master battle audio...")
    subprocess.run([
        "python", "brandkit/characters/engine/audio_to_visemes.py",
        "-i", str(master_mp3),
        "-o", str(visemes_path),
        "--fps", "30"
    ], check=True)
    print(f"✓ Visemes saved to {visemes_path}!")

if __name__ == "__main__":
    asyncio.run(build_audio())
