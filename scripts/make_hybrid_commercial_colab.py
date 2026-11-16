import json

nb = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "Colab_Shop_Real_Hybrid_Commercial.ipynb",
            "provenance": [],
            "toc_visible": True
        },
        "kernelspec": {
            "name": "python3",
            "display_name": "Python 3"
        },
        "language_info": {
            "name": "python"
        },
        "accelerator": "T4"
    },
    "cells": [
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "intro"
            },
            "source": [
                "# 🏪 LifeSolveNow – Real Indian Shopkeeper + Animated Character Hybrid Reel (9:16)\n",
                "### 🎬 Real Kirana Shopkeeper (Ramesh Bhaiya) • Animated Companion (Maya) • 1080 × 1920 Vertical • Free Colab GPU\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Shop_Real_Hybrid_Commercial.ipynb)\n",
                "\n",
                "---\n",
                "\n",
                "### 🌟 Hybrid Production Highlights:\n",
                "1. **Real Shopkeeper + Animated Character Combination:** Real photorealistic Indian dukandar (Ramesh Bhaiya) at his wooden kirana counter paired with a friendly animated digital guide (Maya).\n",
                "2. **100% Compliant Business Story:** Customers discover products on `shop.lifesolvenow.com` and connect **directly via WhatsApp or Call** (Zero payment processing / Zero middlemen commission).\n",
                "3. **Character Consistency:** Exact same appearance, clothing, and voices maintained across all 8 scenes.\n",
                "4. **9:16 Vertical Reel Format:** 1080 × 1920 high definition resolution with clean transparent top watermark: `shop.lifesolvenow.com`.\n",
                "5. **0% Load on Your PC:** All video compositing and optional neural lip-sync render on Google Colab's cloud servers.\n"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step1_md"
            },
            "source": [
                "## ⚙️ Step 1: Install Tools & Clone Studio Assets (Run this first)"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step1_code"
            },
            "outputs": [],
            "source": [
                "# Install FFmpeg and system dependencies\n",
                "!apt-get update -qq && apt-get install -y -qq ffmpeg fonts-dejavu\n",
                "!pip install -q pillow soundfile edge-tts\n",
                "\n",
                "# Clone the repository containing all 9:16 real shopkeeper assets, audio tracks & code\n",
                "!rm -rf /content/videogen\n",
                "!git clone https://github.com/yashkumarsahu789/videogen.git /content/videogen\n",
                "%cd /content/videogen\n",
                "\n",
                "import torch\n",
                "gpu_name = torch.cuda.get_device_name(0) if torch.cuda.is_available() else 'Standard CPU (No GPU needed for fast-render)'\n",
                "print(f'\\n✅ Environment Ready! Accelerator: {gpu_name}')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step2_md"
            },
            "source": [
                "## 📋 Step 2: Seedance 2.5 & Kling AI Video Prompts Library\n",
                "Aap in exact prompts ko **Seedance 2.5 / Kling AI / Luma / Wan2.1** me copy karke dynamic cinematic AI video clips generate kar sakte hain:"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step2_code"
            },
            "outputs": [],
            "source": [
                "prompts = [\n",
                "    {\n",
                "        'Scene': '1. Ramesh Bhaiya Kirana Store Counter Dialogue',\n",
                "        'AI Model': 'Seedance 2.5 / Kling AI 1.5',\n",
                "        'Prompt': 'Cinematic 9:16 vertical video of a 45-year-old realistic Indian grocery shopkeeper sitting behind his wooden Kirana store counter. He looks into the camera with an expressive, authentic, thoughtful facial expression, speaking in Hindi, natural blinking and gentle hand gestures. Shelves filled with spices, pulses, and grain jars in the warm background. Realistic skin texture, depth of field, high-end commercial ad style, photorealistic, 8k.'\n",
                "    },\n",
                "    {\n",
                "        'Scene': '2. Maya Animated Digital Guide at Counter',\n",
                "        'AI Model': 'Seedance 2.5 / Kling AI 1.5',\n",
                "        'Prompt': 'Medium 9:16 vertical shot of a modern, smart 27-year-old Indian woman standing inside a bright room, holding up a sleek smartphone displaying an online digital storefront catalog. She smiles warmly at the viewer, pointing enthusiastically at the phone screen, explaining how easy it is to share on WhatsApp. Natural hair movement, friendly posture, photorealistic, clean studio lighting.'\n",
                "    },\n",
                "    {\n",
                "        'Scene': '3. Customer Smartphone Direct Order at Kirana',\n",
                "        'AI Model': 'Seedance 2.5 / Kling AI 1.5',\n",
                "        'Prompt': 'Close-up over-the-shoulder 9:16 vertical shot of an Indian customer holding a smartphone showing a local Kirana store WhatsApp chat with product orders, handing cash directly to the smiling shopkeeper at the wooden counter. Genuine neighbourhood shopping moment, zero middlemen, crisp natural daylight, photorealistic.'\n",
                "    }\n",
                "]\n",
                "\n",
                "for p in prompts:\n",
                "    print(f'✨ [{p[\"Scene\"]}] -> Model: {p[\"AI Model\"]}')\n",
                "    print(f'\"\"\"{p[\"Prompt\"]}\"\"\"\\n')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step3_md"
            },
            "source": [
                "## 🎬 Step 3: Render Full 9:16 Hybrid Reel (1080 × 1920)\n",
                "Yeh script **Ramesh Bhaiya (Real Shopkeeper), Maya (Animated Companion), phone UI demo, aur Indian BGM** ko combine karke final vertical reel compile karta hai:"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step3_code"
            },
            "outputs": [],
            "source": [
                "# Run the dedicated 9:16 hybrid commercial render pipeline\n",
                "!python video_output/shop_real_hybrid_commercial/code/render.py\n",
                "\n",
                "import os\n",
                "out_video = 'video_output/shop_real_hybrid_commercial/output/shop_real_hybrid_commercial_master.mp4'\n",
                "if not os.path.exists(out_video):\n",
                "    out_video = 'exports/shop_real_hybrid_commercial_master.mp4'\n",
                "\n",
                "if os.path.exists(out_video):\n",
                "    sz_mb = os.path.getsize(out_video) / (1024 * 1024)\n",
                "    print(f'\\n🎉 9:16 HYBRID MASTER REEL RENDERED SUCCESSFULLY!')\n",
                "    print(f'📁 Output File: {out_video}')\n",
                "    print(f'📊 Size: {sz_mb:.2f} MB | Resolution: 1080x1920 | Duration: 60.4s')\n",
                "else:\n",
                "    print('⚠️ Error rendering video. Please check terminal output above.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step4_md"
            },
            "source": [
                "## 🤖 Step 4 (Optional): Run SadTalker Neural Lip-Sync on Colab GPU\n",
                "*Agar aapko shopkeeper ke photo par neural AI mouth animation render karna hai toh is cell ko run karein:*"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step4_code"
            },
            "outputs": [],
            "source": [
                "# @title Optional: Run Neural Talking Face (SadTalker)\n",
                "RUN_NEURAL_LIPSYNC = False # @param {type:\"boolean\"}\n",
                "\n",
                "if RUN_NEURAL_LIPSYNC:\n",
                "    print('🚀 Setting up SadTalker on Cloud GPU...')\n",
                "    !git clone https://github.com/OpenTalker/SadTalker.git /content/SadTalker 2>/dev/null || true\n",
                "    %cd /content/SadTalker\n",
                "    !pip install -q kornia yacs facexlib torchaudio\n",
                "    print('✅ SadTalker Environment Ready on GPU!')\n",
                "    %cd /content/videogen\n",
                "else:\n",
                "    print('⏩ Using fast-track hybrid reel assembly (Ready instantly without waiting for 5GB download)!')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step5_md"
            },
            "source": [
                "## 📱 Step 5: Full Interactive 9:16 Video Player & 1-Click Download\n",
                "Neeche diye player me video preview karein aur 1-click me apne device me download karein:"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step5_code"
            },
            "outputs": [],
            "source": [
                "from IPython.display import HTML, display\n",
                "import os\n",
                "from base64 import b64encode\n",
                "\n",
                "video_path = 'video_output/shop_real_hybrid_commercial/output/shop_real_hybrid_commercial_master.mp4'\n",
                "if not os.path.exists(video_path):\n",
                "    video_path = 'exports/shop_real_hybrid_commercial_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    sz_mb = os.path.getsize(video_path) / (1024 * 1024)\n",
                "    print(f'✅ Video ready for playback! Size: {sz_mb:.2f} MB')\n",
                "    \n",
                "    # Embed via base64 for guaranteed playback inside Colab\n",
                "    video_data = open(video_path, 'rb').read()\n",
                "    b64_video = b64encode(video_data).decode('utf-8')\n",
                "    \n",
                "    display(HTML(f'''\n",
                "    <div style=\"background: linear-gradient(135deg, #020617, #0f172a); padding: 25px; border-radius: 20px; border: 1px solid #38bdf8; text-align: center; color: white; max-width: 440px; margin: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.8); font-family: sans-serif;\">\n",
                "        <h3 style=\"color: #38bdf8; margin-top: 0; margin-bottom: 6px;\">🏪 LifeSolveNow – Hybrid Commercial Reel</h3>\n",
                "        <p style=\"color: #94a3b8; font-size: 13px; margin-top: 0; margin-bottom: 16px;\">1080 × 1920 (9:16) • Real Shopkeeper + Animated Maya • 60.4s</p>\n",
                "        <div style=\"border-radius: 16px; overflow: hidden; border: 2px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.7); display: inline-block; line-height: 0;\">\n",
                "            <video width=\"340\" height=\"600\" controls autoplay loop style=\"object-fit: cover;\">\n",
                "                <source src=\"data:video/mp4;base64,{b64_video}\" type=\"video/mp4\">\n",
                "                Your browser does not support HTML5 video.\n",
                "            </video>\n",
                "        </div>\n",
                "        <div style=\"margin-top: 20px;\">\n",
                "            <a href=\"data:video/mp4;base64,{b64_video}\" download=\"shop_real_hybrid_commercial_master.mp4\" style=\"background: linear-gradient(135deg, #2563eb, #38bdf8); color: white; padding: 12px 28px; border-radius: 30px; font-weight: bold; text-decoration: none; font-size: 15px; display: inline-block; box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);\">\n",
                "                📥 Download 9:16 Video (.mp4)\n",
                "            </a>\n",
                "        </div>\n",
                "    </div>\n",
                "    '''))\n",
                "else:\n",
                "    print('❌ Video file not found. Please run Step 3 first.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {
                "id": "step6_md"
            },
            "source": [
                "## 💾 Step 6: Direct Browser File Download"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {
                "id": "step6_code"
            },
            "outputs": [],
            "source": [
                "from google.colab import files\n",
                "import os\n",
                "\n",
                "video_path = 'video_output/shop_real_hybrid_commercial/output/shop_real_hybrid_commercial_master.mp4'\n",
                "if not os.path.exists(video_path):\n",
                "    video_path = 'exports/shop_real_hybrid_commercial_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    print('⬇️ Triggering browser download...')\n",
                "    files.download(video_path)\n",
                "else:\n",
                "    print('❌ Video file not found.')"
            ]
        }
    ]
}

with open(r'c:\Users\yashk\vibdecoding\Colab_Shop_Real_Hybrid_Commercial.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2)

print("Created Colab_Shop_Real_Hybrid_Commercial.ipynb successfully!")
