import asyncio
import edge_tts
import soundfile as sf
import os
import subprocess
import json

script_text = (
    "दुकान आपकी, 14 घंटे की हाड़-तोड़ मेहनत आपकी... तो कमाई पर हक़ किसी तीसरे का क्यों? "
    "डिलीवरी ऐप्स हर ऑर्डर पर बीस से तीस परसेंट कमीशन काट लेते हैं, और आपका पुराना ग्राहक भी आपसे छीन लेते हैं! "
    "अब अपनी दुकान को आज़ाद करो! shop.lifesolvenow.com पर पाओ फ़्लैट ज़ीरो परसेंट सेल्स कमीशन—आपकी कमाई का एक-एक रुपया सिर्फ़ आपका! "
    "ना कोई लंबा झंझट—बस फोन से प्रोडक्ट का फ़ोटो खींचो, और मिनटों में आपकी ऑनलाइन दुकान लाइव। "
    "ग्राहक का ऑर्डर सीधा आपके व्हाट्सएप पर, और पूरा पैसा बिना किसी कट के सीधा आपके बैंक UPI में! "
    "गूगल सर्च में आपकी दुकान सबसे ऊपर दिखेगी, और रिपेयर शॉप्स के लिए लाइव जॉब ट्रैकिंग भी! "
    "स्टार्टर प्लान बिल्कुल मुफ़्त, और प्रो सिर्फ़ निन्यानवे रुपये महीना। "
    "आज ही shop.lifesolvenow.com पर जाएं और अपना फ़्री ट्रायल क्लेम करें। अपनी दुकान, अपनी तरक्की!"
)

async def main():
    audio_dir = "video_output/shop_avatar_ad/audio"
    output_mp3 = os.path.join(audio_dir, "voiceover.mp3")
    script_txt = os.path.join(audio_dir, "script.txt")
    
    with open(script_txt, "w", encoding="utf-8") as f:
        f.write(script_text)
        
    voice = "hi-IN-MadhurNeural"
    comm = edge_tts.Communicate(script_text, voice, rate="+25%", pitch="+0Hz")
    await comm.save(output_mp3)
    
    data, sr = sf.read(output_mp3)
    duration = len(data) / sr
    fps = 30
    total_frames = int(round(duration * fps))
    print(f"✅ Voiceover generated: {output_mp3}")
    print(f"📊 Duration: {duration:.2f} seconds ({total_frames} frames @ {fps}fps)")
    
    # Generate Visemes
    visemes_out = "video_output/shop_avatar_ad/code/src/visemes.json"
    cmd = [
        "python", "brandkit/characters/engine/audio_to_visemes.py",
        "-i", output_mp3,
        "-o", visemes_out,
        "--fps", str(fps)
    ]
    print("🎬 Generating frame-by-frame visemes...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✅ Visemes saved to {visemes_out}")
    else:
        print(f"❌ Error generating visemes: {res.stderr}")

if __name__ == "__main__":
    asyncio.run(main())
