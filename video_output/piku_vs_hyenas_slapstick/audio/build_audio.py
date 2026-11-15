import asyncio
import subprocess
import time
from pathlib import Path
import edge_tts

AUDIO_DIR = Path(__file__).resolve().parent

lines = [
    {
        "id": "scene1",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+28%",
        "pitch": "+15Hz",
        "text": "अरे बचाओओओ! पत्ता बहुत तेज़ फिसल रहा है! ब्रेक कहाँ है इसका?!"
    },
    {
        "id": "scene2",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+24%",
        "pitch": "+14Hz",
        "text": "हाहाहाहा! पीकू का सुपर स्ट्राइक! ये लो आर्मडिलो बॉलिंग बॉल!"
    },
    {
        "id": "scene3",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+22%",
        "pitch": "+8Hz",
        "text": "धड़ाम! अरे बाप रे ये तो मगरमच्छ का पेट है! भागो भाई!"
    },
    {
        "id": "scene4",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+30%",
        "pitch": "+18Hz",
        "text": "अरे इतनी बड़ी मकड़ी! मम्मीईईई! हम तो हवा में उड़ गए!"
    },
    {
        "id": "scene5",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+18%",
        "pitch": "+12Hz",
        "text": "हाहाहाहा! पेड़ से उल्टे लटक गए ना? पीकू बंदर से पंगा कभी मत लेना!"
    }
]

async def synthesize_one(sc):
    out_f = AUDIO_DIR / f"{sc['id']}.mp3"
    if out_f.exists() and out_f.stat().st_size > 5000:
        print(f"⏩ {sc['id']}.mp3 already exists. Skipping.")
        return out_f
    for attempt in range(4):
        try:
            print(f"🎙️ Synthesizing {sc['id']} (attempt {attempt+1})...")
            comm = edge_tts.Communicate(sc["text"], sc["voice"], rate=sc["rate"], pitch=sc["pitch"])
            await comm.save(str(out_f))
            print(f"✓ Generated {sc['id']}.mp3")
            return out_f
        except Exception as e:
            print(f"Warning attempt {attempt+1} failed: {e}. Retrying in 2s...")
            await asyncio.sleep(2)
    raise RuntimeError(f"Failed to generate {sc['id']}")

async def main():
    scene_files = []
    for sc in lines:
        f = await synthesize_one(sc)
        scene_files.append(f)
        await asyncio.sleep(1)

    print("\n⏳ Aligning and padding each audio scene to 2.5s...")
    padded_files = []
    for sf in scene_files:
        pad_out = AUDIO_DIR / f"padded_{sf.name}"
        cmd = [
            "ffmpeg", "-y", "-i", str(sf),
            "-af", "apad=whole_dur=2.5",
            "-t", "2.5",
            "-c:a", "libmp3lame",
            str(pad_out)
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        padded_files.append(pad_out)

    concat_txt = AUDIO_DIR / "concat_audio.txt"
    with open(concat_txt, "w") as f:
        for pf in padded_files:
            f.write(f"file '{pf.resolve().as_posix()}'\n")

    master_audio = AUDIO_DIR / "piku_vs_hyenas_voiceover_master.mp3"
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
        "-i", str(concat_txt),
        "-c:a", "libmp3lame",
        str(master_audio)
    ], check=True)

    print(f"\n🎉 MASTER SOUNDTRACK CREATED: {master_audio}")

if __name__ == "__main__":
    asyncio.run(main())
