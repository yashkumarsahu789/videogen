import json
from pathlib import Path

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "Colab_Face_To_Face_Animated_Dialogue.ipynb",
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
        "accelerator": "GPU"
    },
    "cells": [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# 🎭 LifeSolveNow – Face-to-Face Animated Characters Dialogue (57.7s)\n",
                "### 🎬 Two Original Characters • Real Synchronized Lip-Sync • Natural Listening Acting • Stable Fixed Camera\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Face_To_Face_Animated_Dialogue.ipynb)\n",
                "\n",
                "---\n",
                "\n",
                "### 🌟 Strict Character Animation Architecture:\n",
                "- **Two Original Characters:** Dev (Male / Left) and Riya (Female / Right) facing each other in conversation.\n",
                "- **Real Frame-Accurate Lip-Sync:**\n",
                "  - When **Dev speaks**, his mouth moves to viseme phonemes (`open_wide`, `open_small`, `o_shape`, `e_shape`), while **Riya's mouth is strictly closed** with natural listening eye-blinks and breathing.\n",
                "  - When **Riya speaks**, her mouth moves to her spoken words, while **Dev's mouth is strictly closed** listening attentively.\n",
                "  - Both characters NEVER move their mouths simultaneously.\n",
                "- **Stable Camera:** Fixed camera framing both characters clearly — zero zoom in/out, zero panning, zero shaking, zero zig-zags.\n",
                "- **Zero Static Image Slide:** 100% genuine vector character puppet animation.\n"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## ⚙️ Step 1: Clone Repository & Setup Environment"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# Clone the repository\n",
                "!git clone https://github.com/yashkumarsahu789/videogen.git /content/videogen\n",
                "%cd /content/videogen\n",
                "\n",
                "# Install dependencies\n",
                "!apt-get update -qq && apt-get install -y ffmpeg\n",
                "!pip install -q pillow soundfile edge-tts\n",
                "print('✅ Repository & Animation Engine Ready!')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 🎬 Step 2: Render 57.7s Face-to-Face Animated Video"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# Run the frame-accurate animation pipeline\n",
                "!python video_output/animated_face_to_face_dialogue/code/render_face_to_face_animation.py\n",
                "\n",
                "import os\n",
                "out_path = 'video_output/animated_face_to_face_dialogue/output/face_to_face_animated_dialogue_master.mp4'\n",
                "if os.path.exists(out_path):\n",
                "    sz_mb = os.path.getsize(out_path) / (1024 * 1024)\n",
                "    print(f'🎉 Video Rendered Successfully! Size: {sz_mb:.2f} MB')\n",
                "else:\n",
                "    print('⚠️ Error rendering video. Check logs.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 📺 Step 3: Preview Animated Video & 1-Click Download"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "from IPython.display import HTML, display\n",
                "from google.colab import files\n",
                "import base64\n",
                "import os\n",
                "\n",
                "video_path = 'video_output/animated_face_to_face_dialogue/output/face_to_face_animated_dialogue_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    video_bytes = open(video_path, 'rb').read()\n",
                "    b64 = base64.b64encode(video_bytes).decode()\n",
                "    \n",
                "    html_card = f'''\n",
                "    <div style=\"font-family: Arial, sans-serif; max-width: 680px; padding: 20px; border-radius: 12px; background: #0f172a; color: #f8fafc; text-align: center;\">\n",
                "        <h2 style=\"color: #38bdf8; margin: 0 0 10px 0;\">🎭 Face-to-Face Animated Characters Dialogue</h2>\n",
                "        <p style=\"color: #94a3b8; font-size: 14px; margin-bottom: 15px;\">Real Lip-Sync • Natural Listening • Stable Camera • 57.7s Master</p>\n",
                "        <video width=\"640\" height=\"360\" controls autoplay muted style=\"border-radius: 8px; border: 1px solid #334155;\">\n",
                "            <source src=\"data:video/mp4;base64,{b64}\" type=\"video/mp4\">\n",
                "            Your browser does not support the video tag.\n",
                "        </video>\n",
                "    </div>\n",
                "    '''\n",
                "    display(HTML(html_card))\n",
                "    \n",
                "    print('⬇️ Downloading final video to your computer...')\n",
                "    files.download(video_path)\n",
                "else:\n",
                "    print('❌ Video not found. Please run Step 2 first.')"
            ]
        }
    ]
}

colab_path = Path("Colab_Face_To_Face_Animated_Dialogue.ipynb")
with open(colab_path, "w", encoding="utf-8") as f:
    json.dump(notebook, f, indent=2)

print(f"✅ Generated {colab_path.resolve()}")
