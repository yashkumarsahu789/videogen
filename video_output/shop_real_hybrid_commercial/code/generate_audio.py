import asyncio
import os
import edge_tts
import subprocess
from pathlib import Path

audio_dir = Path(__file__).resolve().parent.parent / "audio"
audio_dir.mkdir(parents=True, exist_ok=True)

dialogues = [
    {
        "id": "scene1_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+6%",
        "pitch": "+0Hz",
        "text": "Bazaar me ab grahak aana kam ho gaye hain... sab mobile me lage hain, main kya karun?"
    },
    {
        "id": "scene2_maya",
        "speaker": "Maya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "Ramesh Bhaiya! Jab grahak phone par hain, toh aapki dukan bhi unke phone me honi chahiye — LifeSolveNow ke sath!"
    },
    {
        "id": "scene3_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+5%",
        "pitch": "+0Hz",
        "text": "Lekin mujhe koi computer ya technical website banana nahi aata!"
    },
    {
        "id": "scene4_maya",
        "speaker": "Maya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "Koi technical kaam nahi chahiye! Bas shop.lifesolvenow.com par 2 minute me apni dukan ka digital catalog banaiye!"
    },
    {
        "id": "scene5_maya",
        "speaker": "Maya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "Apni digital dukan ka link WhatsApp groups aur grahakon ko aasaani se share kijiye."
    },
    {
        "id": "scene6_maya",
        "speaker": "Maya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "Grahak aapke products dekhenge aur bina kisi extra app ke, seedha WhatsApp ya Call par order denge!"
    },
    {
        "id": "scene7_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+6%",
        "pitch": "+0Hz",
        "text": "Wah! Matlab grahak seedha mujhse judenge, meri apni dukan ki pehchaan ke sath!"
    },
    {
        "id": "scene8_both",
        "speaker": "Maya & Ramesh",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+8%",
        "pitch": "+0Hz",
        "text": "Bilkul! Aaj hi visit kijiye — shop.lifesolvenow.com. Ab Har Dukaan Ki Digital Pehchaan!"
    }
]

async def generate():
    total_dur = 0
    for d in dialogues:
        out_p = audio_dir / f"{d['id']}.mp3"
        tts = edge_tts.Communicate(text=d['text'], voice=d['voice'], rate=d['rate'], pitch=d['pitch'])
        await tts.save(str(out_p))
        res = subprocess.run(['ffprobe', '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(out_p)], capture_output=True, text=True)
        dur = float(res.stdout.strip())
        total_dur += dur
        print(f"🎙️ {d['id']} ({d['speaker']}): {dur:.2f}s")
    print(f"\n✅ Total Video Duration: {total_dur:.2f}s (Target: 45–60s)!")

if __name__ == '__main__':
    asyncio.run(generate())
