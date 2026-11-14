import asyncio
import edge_tts
import soundfile as sf
import os

script_text = (
    "दुकान आपकी, मेहनत आपकी... तो कमाई किसकी? "
    "डिलीवरी ऐप्स हर ऑर्डर पर बीस से तीस परसेंट कमीशन काट लेते हैं, और कस्टमर भी उनका हो जाता है। "
    "अब आया है शॉप लाइफ़ सॉल्व नाउ! सिर्फ़ ज़ीरो परसेंट कमीशन! "
    "फ़ोटो खींचो, प्रोडक्ट डालो, कुछ ही मिनट में ऑनलाइन स्टोर रेडी। "
    "ऑर्डर सीधा आपके व्हाट्सएप पर, पैसा सीधा आपके यूपीआई या कैश में। "
    "गूगल पर भी दिखें, और रिपेयर शॉप हो तो लाइव जॉब ट्रैकिंग भी! "
    "फ़्री स्टार्टर प्लान से शुरू करो। प्रो प्लान सिर्फ़ निन्यानवे रुपये महीना। "
    "आज ही शॉप डॉट लाइफ़ सॉल्व नाउ डॉट कॉम पर जाओ, फ़्री ट्रायल क्लेम करो!"
)

async def main():
    voice = "hi-IN-MadhurNeural"
    output_mp3 = "video_output/shop_30s_ad/audio/voiceover.mp3"
    # rate +10% for punchy energetic reel delivery
    communicate = edge_tts.Communicate(script_text, voice, rate="+10%", pitch="+0Hz")
    await communicate.save(output_mp3)
    
    # check duration
    data, samplerate = sf.read(output_mp3)
    duration = len(data) / samplerate
    fps = 30
    total_frames = int(round(duration * fps))
    print(f"Generated voiceover: {output_mp3}")
    print(f"Duration: {duration:.2f} seconds ({total_frames} frames @ {fps}fps)")
    
    with open("video_output/shop_30s_ad/audio/script.txt", "w", encoding="utf-8") as f:
        f.write(script_text)

if __name__ == "__main__":
    asyncio.run(main())

