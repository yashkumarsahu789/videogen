import asyncio
import edge_tts
import soundfile as sf
import os
import subprocess
import json

# Energetic Hindi script
script_text = (
    "दुकान आपकी, मेहनत आपकी... तो कमाई किसकी? "
    "डिलीवरी ऐप्स हर ऑर्डर पर बीस से तीस परसेंट कमीशन काट लेते हैं, और ग्राहक भी उनका! "
    "अब आया है शॉप लाइफ़ सॉल्व नाउ, सिर्फ़ ज़ीरो परसेंट कमीशन! "
    "फ़ोटो खींचो, प्रोडक्ट डालो, कुछ ही मिनट में ऑनलाइन स्टोर रेडी। "
    "ऑर्डर सीधा आपके व्हाट्सएप पर, पैसा सीधा आपके यूपीआई में! "
    "गूगल पर भी दिखें, और रिपेयर शॉप के लिए लाइव जॉब ट्रैकिंग भी! "
    "फ़्री स्टार्टर प्लान, और प्रो सिर्फ़ निन्यानवे रुपये महीना। "
    "आज ही शॉप डॉट लाइफ़ सॉल्व नाउ डॉट कॉम पर जाओ, फ़्री ट्रायल क्लेम करो!"
)

async def generate():
    voice = "hi-IN-MadhurNeural"
    output_mp3 = "video_output/shop_30s_ad/audio/voiceover.mp3"
    
    # Generate MP3 with edge_tts at +25% rate for crisp energetic delivery
    comm = edge_tts.Communicate(script_text, voice, rate="+25%", pitch="+0Hz")
    await comm.save(output_mp3)
    
    data, sr = sf.read(output_mp3)
    duration = len(data) / sr
    fps = 30
    total_frames = int(round(duration * fps))
    print(f"✅ Voiceover generated: {output_mp3}")
    print(f"📊 Duration: {duration:.2f} seconds ({total_frames} frames @ {fps}fps)")
    
    # Save script text
    with open("video_output/shop_30s_ad/audio/script.txt", "w", encoding="utf-8") as f:
        f.write(script_text)
        
    # Generate Visemes using engine
    visemes_out = "video_output/shop_30s_ad/code/src/visemes.json"
    os.makedirs(os.path.dirname(visemes_out), exist_ok=True)
    cmd = [
        "python", "brandkit/characters/engine/audio_to_visemes.py",
        "-i", output_mp3,
        "-o", visemes_out,
        "--fps", str(fps)
    ]
    print(f"🎬 Running visemes generator...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✅ Visemes successfully generated at {visemes_out}")
    else:
        print(f"❌ Error generating visemes:\n{res.stderr}")

if __name__ == "__main__":
    asyncio.run(generate())
