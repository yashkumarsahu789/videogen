import asyncio
import edge_tts
import soundfile as sf
import numpy as np
import os
import subprocess

script_text = (
    "सुबह से शाम तक मेहनत, हर ग्राहक अपना, हर सामान अपना। लेकिन आज के बदलते ज़माने में, क्या आपकी दुकान भी उतनी ही आगे बढ़ रही है? "
    "आज ग्राहक मोबाइल पर दुकान ढूंढता है, सामान देखता है, और कई बार आपकी दुकान तक पहुंचने से पहले ही कहीं और चला जाता है। "
    "लेकिन अब वक्त है अपनी दुकान को भी डिजिटल पहचान देने का। मिलिए शॉप लाइफ़ सॉल्व नाउ से! "
    "अब अपनी दुकान का डिजिटल कैटलॉग बनाइए। अपने प्रोडक्ट्स, कीमतें और दुकान की जानकारी, सब एक ही जगह! "
    "ग्राहक आपके प्रोडक्ट्स देखें और सीधे व्हाट्सएप पर आपसे जुड़ें। रिश्ता भी आपका, ग्राहक भी आपका! "
    "अपने ग्राहकों से सीधा संपर्क रखिए। ऑर्डर और पेमेंट की प्रक्रिया पर अपना नियंत्रण बनाए रखिए। "
    "क्योंकि आपकी दुकान भी डिजिटल दुनिया में अपनी पहचान बना सकती है। शुरुआत आज से हो सकती है! "
    "तो देर किस बात की? आज ही अपनी डिजिटल दुकान शुरू कीजिए। शॉप लाइफ़ सॉल्व नाउ – अपनी दुकान, अपनी पहचान!"
)

async def build():
    audio_dir = "video_output/apni_dukaan_anime/audio"
    os.makedirs(audio_dir, exist_ok=True)
    
    raw_mp3 = os.path.join(audio_dir, "raw_voiceover.mp3")
    final_wav = os.path.join(audio_dir, "voiceover.wav")
    final_mp3 = os.path.join(audio_dir, "voiceover.mp3")
    script_txt = os.path.join(audio_dir, "script.txt")
    
    with open(script_txt, "w", encoding="utf-8") as f:
        f.write(script_text)
        
    print("🎙️ Generating Edge-TTS Madhur Neural voiceover...")
    comm = edge_tts.Communicate(script_text, "hi-IN-MadhurNeural", rate="+20%", pitch="+0Hz")
    await comm.save(raw_mp3)
    
    data, sr = sf.read(raw_mp3)
    if len(data.shape) > 1:
        data = data.mean(axis=1)
        
    # Energy analysis for natural pause condensation
    win = int(sr * 0.05)
    energy = np.array([np.sqrt(np.mean(data[i:i+win]**2)) for i in range(0, len(data)-win, win)])
    times = np.arange(len(energy)) * 0.05
    threshold = 0.015
    is_speech = energy > threshold
    
    chunks = []
    chunk_start = 0
    in_speech = False
    silence_count = 0
    
    for i, (t, speech) in enumerate(zip(times, is_speech)):
        sample_idx = int(t * sr)
        if speech and not in_speech:
            in_speech = True
            chunk_start = max(0, sample_idx - int(0.06 * sr))
            silence_count = 0
        elif in_speech and not speech:
            silence_count += 1
            if silence_count > 4: # 200ms silence
                chunk_end = min(len(data), sample_idx + int(0.06 * sr))
                chunks.append(data[chunk_start:chunk_end])
                chunks.append(np.zeros(int(0.22 * sr))) # 220ms natural breathing pause
                in_speech = False
                silence_count = 0
    if in_speech:
        chunks.append(data[chunk_start:])
        
    final_audio = np.concatenate(chunks)
    sf.write(final_wav, final_audio, sr)
    
    # Also save as final MP3
    subprocess.run(["ffmpeg", "-y", "-i", final_wav, "-c:a", "libmp3lame", "-b:a", "192k", final_mp3], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    
    dur = len(final_audio) / sr
    fps = 30
    total_frames = int(round(dur * fps))
    print(f"✅ Voiceover generated: {final_mp3}")
    print(f"📊 Duration: {dur:.2f} seconds ({total_frames} frames @ {fps}fps)")
    
    # Generate frame-accurate visemes
    visemes_out = "video_output/apni_dukaan_anime/code/src/visemes.json"
    os.makedirs(os.path.dirname(visemes_out), exist_ok=True)
    cmd = [
        "python", "brandkit/characters/engine/audio_to_visemes.py",
        "-i", final_mp3,
        "-o", visemes_out,
        "--fps", str(fps)
    ]
    print("🎬 Generating visemes for talking puppet lip-sync...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"✅ Visemes saved to {visemes_out}")
    else:
        print(f"❌ Error generating visemes:\n{res.stderr}")

if __name__ == "__main__":
    asyncio.run(build())
