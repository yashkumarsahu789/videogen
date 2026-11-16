import asyncio
import os
import edge_tts

audio_dir = "video_output/shop_talking_characters/audio"
os.makedirs(audio_dir, exist_ok=True)

characters = [
    {
        "id": "char1_ramesh_bhaiya",
        "name": "Ramesh Bhaiya",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+0%",
        "pitch": "+0Hz",
        "dialog": "Namaste bhaiyo! Agar aapki bhi local dukan hai, toh suno — ab hamari dukan sirf bazaar tak nahi, balki LifeSolveNow par pure shehar me online dikhegi! Seedha grahak se judo, bina kisi jhanjhat ke."
    },
    {
        "id": "char2_priya_creator",
        "name": "Priya",
        "voice": "hi-IN-SwaraNeural",
        "rate": "+5%",
        "pitch": "+0Hz",
        "dialog": "Hey everyone! Kya aapki dukan bazaar me hai aur grahak online dhoond rahe hain? Ab LifeSolveNow par apni digital dukan 2 minute me banao, products dikhao aur direct WhatsApp par local customers paao!"
    },
    {
        "id": "char3_sharma_kaka",
        "name": "Sharma Kaka",
        "voice": "hi-IN-MadhurNeural",
        "rate": "-10%",
        "pitch": "-20Hz",
        "dialog": "Bete, mera 30 saal ka dukandari ka tajurba kehta hai — naye zamane me agar dukan ko badhana hai, toh LifeSolveNow par apni dukan ki digital pehchaan banana sabse zaroori hai."
    },
    {
        "id": "char4_rohit_tech",
        "name": "Rohit",
        "voice": "hi-IN-MadhurNeural",
        "rate": "+15%",
        "pitch": "+15Hz",
        "dialog": "Arrey bhaiya, tension kyu lete ho? LifeSolveNow par apni dukan ka catalog banana super easy hai! Bas photo click karo, WhatsApp par link share karo aur customers direct call karenge!"
    }
]

async def generate_samples():
    for c in characters:
        out_file = os.path.join(audio_dir, f"{c['id']}_sample.mp3")
        tts = edge_tts.Communicate(text=c['dialog'], voice=c['voice'], rate=c['rate'], pitch=c['pitch'])
        await tts.save(out_file)
        print(f"✅ Generated {c['name']} voice sample: {out_file}")

if __name__ == '__main__':
    asyncio.run(generate_samples())
