import asyncio
import os
import edge_tts

audio_dir = "video_output/shop_duo_reel_3d/audio"
os.makedirs(audio_dir, exist_ok=True)

dialogues = [
    {
        "id": "line1_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+2%",
        "pitch": "+0Hz",
        "text": "Priya behen, bazaar me grahak aana kam ho gaye hain... sab log phone me lage rehte hain, main kya karun?"
    },
    {
        "id": "line2_priya",
        "speaker": "Priya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+6%",
        "pitch": "+0Hz",
        "text": "Arrey Ramesh Bhaiya! Jab grahak phone par hain, toh aapki dukan bhi toh unke phone me honi chahiye!"
    },
    {
        "id": "line3_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+0%",
        "pitch": "+0Hz",
        "text": "Lekin behen, mujhe toh koi computer ya technical kaam nahi aata..."
    },
    {
        "id": "line4_priya",
        "speaker": "Priya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+5%",
        "pitch": "+0Hz",
        "text": "Arrey koi technical kaam nahi chahiye! Bas shop.lifesolvenow.com par jao, apni dukan ke products ki photo daalo, aur WhatsApp par apni digital dukan share karo!"
    },
    {
        "id": "line5_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+3%",
        "pitch": "+0Hz",
        "text": "Aur grahak seedha mujhse judenge?"
    },
    {
        "id": "line6_priya",
        "speaker": "Priya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+6%",
        "pitch": "+0Hz",
        "text": "Haan bilkul! Seedha call ya WhatsApp par! Na koi bicholiya, na koi commission!"
    },
    {
        "id": "line7_ramesh",
        "speaker": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+3%",
        "pitch": "+0Hz",
        "text": "Wah! Matlab ab har dukan ki apni digital pehchaan!"
    },
    {
        "id": "line8_priya",
        "speaker": "Priya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+5%",
        "pitch": "+0Hz",
        "text": "Toh der kis baat ki? Aaj hi visit kijiye — shop.lifesolvenow.com!"
    }
]

async def generate():
    for d in dialogues:
        out_p = os.path.join(audio_dir, f"{d['id']}.mp3")
        tts = edge_tts.Communicate(text=d['text'], voice=d['voice'], rate=d['rate'], pitch=d['pitch'])
        await tts.save(out_p)
        print(f"Generated {d['id']} ({d['speaker']})")

if __name__ == '__main__':
    asyncio.run(generate())
