# 🐵 Piku vs 3 Hyenas — 30-Second 3D Slapstick Cartoon Project

> **Project Directory:** `video_output/piku_30s_slapstick/`  
> **Status:** 15s Master Preview Ready (`output/piku_15s_slapstick_preview.mp4`), Storyboard & All 6 Scene Assets Complete.  
> **Genre:** 3D CGI Slapstick Cartoon (Pixar / Illumination Style) with Hindi Voiceover.

---

## 🛠️ Complete Tools & AI Stack Used

1. **🎨 3D Storyboard & Keyframe Art:**
   - **Model:** Google Imagen 3 (Cloud API)
   - **Assets Generated:** 6 scenes in 16:9 cinematic widescreen (`assets/scene1_...` to `scene6_...`).

2. **⚡ 3D Motion Synthesis (Image-to-Video):**
   - **Model:** Lightricks LTX-Video Distilled (DiT - Diffusion Transformer)
   - **Platform:** Hugging Face Spaces (Cloud NVIDIA A10G 24GB GPU)
   - **Speed:** ~18-21 seconds per 5.0-second video clip!

3. **🎙️ Hindi Cartoon Voiceover & Pitch Modulation:**
   - **Engine:** Edge-TTS (`hi-IN-MadhurNeural`)
   - **Modulation:**
     - Piku (cheeky baby monkey): Pitch `+30Hz` to `+35Hz`, Rate `+15%`
     - Hyenas (panicked goofy): Pitch `-10Hz` to `-15Hz`, Rate `+20%`
   - **Track:** `audio/voiceover_30s_master.mp3` (synchronized 30.0s audio)

4. **🎛️ Audio-Visual Sync & Stitching:**
   - **Engine:** FFmpeg (`apad=whole_dur=5.0`, concat demuxer, H.264 / AAC muxing)

5. **🌐 Cloud Automation (0% Laptop Load):**
   - `gradio_client` remote API client + Google Colab turnkey notebook (`Colab_30s_Slapstick.ipynb`).

---

## 📁 Project Structure & Current Files

```
video_output/piku_30s_slapstick/
├── assets/                                   # All 6 Storyboard HD Images
│   ├── scene1_chase_leaf_slide.jpg
│   ├── scene2_banana_peel_slip.jpg
│   ├── scene3_armadillo_bowling.jpg
│   ├── scene4_spiderweb_catapult.jpg
│   ├── scene5_crocodile_belly_crash.jpg
│   └── scene6_victory_mango_laugh.jpg
├── audio/                                    # Master Cartoon Voiceover
│   └── voiceover_30s_master.mp3              # 30-second synchronized Hindi track
├── code/                                     # Execution Scripts & Notebooks
│   ├── Colab_30s_Slapstick.ipynb             # Turnkey Colab Notebook
│   └── render_all_clips.py                   # Python cloud renderer script
└── output/                                   # Rendered Videos
    ├── clip1.mp4                             # Scene 1 render (5s)
    ├── clip2.mp4                             # Scene 2 render (5s)
    ├── clip3.mp4                             # Scene 3 render (5s)
    └── piku_15s_slapstick_preview.mp4        # 15s Combined Master with Voiceover!
```

---

## 🚀 How to Resume & Finish the Remaining 3 Clips (Clips 4, 5, 6)

When returning:
1. Simply run:
   ```bash
   python video_output/piku_30s_slapstick/code/render_all_clips.py
   ```
2. The script will automatically skip Clips 1-3 (already rendered) and render Clips 4, 5, and 6 on the Cloud GPU, then concatenate all 6 clips with `voiceover_30s_master.mp3` into the final 30-second movie:
   `video_output/piku_30s_slapstick/output/piku_30s_slapstick_cartoon_master.mp4`!
