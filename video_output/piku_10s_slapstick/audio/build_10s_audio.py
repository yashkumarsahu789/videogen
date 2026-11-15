import asyncio
import subprocess
from pathlib import Path
import edge_tts

AUDIO_DIR = Path(__file__).resolve().parent

clips_data = [
    {
        "id": "clip1",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+26%",
        "pitch": "+14Hz",
        "text": "अरे बचाओओओ! पत्ता बहुत तेज़ फिसल रहा है! हाहाहा! पीकू का सुपर स्ट्राइक! ये लो बॉलिंग बॉल!"
    },
    {
        "id": "clip2",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+20%",
        "pitch": "+10Hz",
        "text": "धड़ाम! अरे बाप रे मगरमच्छ! हाहाहाहा! पेड़ से उल्टे लटक गए ना? पीकू बंदर से पंगा कभी मत लेना!"
    }
]

async def main():
    print("🎙️ Synthesizing 2 comedy voice clips (5s each)...")
    raw_files = []
    for sc in clips_data:
        f = AUDIO_DIR / f"{sc['id']}_raw.mp3"
        comm = edge_tts.Communicate(sc["text"], sc["voice"], rate=sc["rate"], pitch=sc["pitch"])
        await comm.save(str(f))
        raw_files.append(f)
        print(f"✓ Generated {f.name}")

    padded_files = []
    for idx, rf in enumerate(raw_files):
        pad_out = AUDIO_DIR / f"padded_{idx+1}.mp3"
        # Force exactly 5.0 seconds
        cmd = [
            "ffmpeg", "-y", "-i", str(rf),
            "-af", "apad=whole_dur=5.0",
            "-t", "5.0",
            "-c:a", "libmp3lame",
            str(pad_out)
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        padded_files.append(pad_out)

    concat_txt = AUDIO_DIR / "concat_10s.txt"
    with open(concat_txt, "w") as f:
        for pf in padded_files:
            f.write(f"file '{pf.resolve().as_posix()}'\n")

    master_audio = AUDIO_DIR / "voiceover_10s_master.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_txt),
        "-c:a", "libmp3lame",
        str(master_audio)
    ], check=True)

    print(f"🎉 10-Second Master Soundtrack Created: {master_audio}")

if __name__ == "__main__":
    asyncio.run(main())
