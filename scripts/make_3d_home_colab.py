import json
from pathlib import Path

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "Colab_Shop_3D_Home_Conversation.ipynb",
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
                "# 🛋️ LifeSolveNow – 3D Pixar Cartoon: Home Conversation (57.6s)\n",
                "### 🎬 3D Pixar Animated Storyboard • Living Room Sofa Setting • Phone Screen Storefront UI • Clean Top Watermark\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Shop_3D_Home_Conversation.ipynb)\n",
                "\n",
                "---\n",
                "\n",
                "### 🌟 3D Production Highlights:\n",
                "- **3D Pixar Visual Aesthetic:** High-end 3D animated scene inside an Indian living room with warm lighting, sofa couch, and recognizable character styling.\n",
                "- **Natural Storyboard Choreography:** 8 cinematic camera setups (Wide two-shot, Ramesh close-up, Priya reaction, Smartphone 3D insert with live UI, and celebratory finale).\n",
                "- **Clean Presentation:** Absolutely ZERO subtitle clutter or lower-third boxes. Only a clean transparent watermark at the top: `shop.lifesolvenow.com`.\n",
                "- **Live UI in Phone Screen:** The website digital storefront and WhatsApp catalog connection appear directly inside Priya's smartphone as she demonstrates it to Ramesh Bhaiya.\n",
                "- **Cloud Execution:** 0% load on your computer. Fully executable in Google Colab with 1-click download.\n"
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
                "print('✅ Repository & 3D Video Pipeline Ready!')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 🎬 Step 2: Render 57.6s 3D Pixar Home Conversation Video"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# Run the 3D home conversation render pipeline\n",
                "!python video_output/shop_3d_home_conversation/code/render.py\n",
                "\n",
                "import os\n",
                "out_path = 'video_output/shop_3d_home_conversation/output/shop_3d_home_conversation_master.mp4'\n",
                "if os.path.exists(out_path):\n",
                "    sz_mb = os.path.getsize(out_path) / (1024 * 1024)\n",
                "    print(f'🎉 3D Video Rendered Successfully! Size: {sz_mb:.2f} MB')\n",
                "else:\n",
                "    print('⚠️ Error rendering video. Check logs.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 📺 Step 3: Preview 3D Cartoon Video & 1-Click Download"
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
                "video_path = 'video_output/shop_3d_home_conversation/output/shop_3d_home_conversation_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    video_bytes = open(video_path, 'rb').read()\n",
                "    b64 = base64.b64encode(video_bytes).decode()\n",
                "    \n",
                "    html_card = f'''\n",
                "    <div style=\"font-family: Arial, sans-serif; max-width: 680px; padding: 20px; border-radius: 12px; background: #0f172a; color: #f8fafc; text-align: center;\">\n",
                "        <h2 style=\"color: #38bdf8; margin: 0 0 10px 0;\">🛋️ 3D Pixar Cartoon: Home Conversation</h2>\n",
                "        <p style=\"color: #94a3b8; font-size: 14px; margin-bottom: 15px;\">Ramesh Bhaiya & Priya on Couch • Phone Screen UI • 57.6s Master</p>\n",
                "        <video width=\"640\" height=\"360\" controls autoplay muted style=\"border-radius: 8px; border: 1px solid #334155;\">\n",
                "            <source src=\"data:video/mp4;base64,{b64}\" type=\"video/mp4\">\n",
                "            Your browser does not support the video tag.\n",
                "        </video>\n",
                "    </div>\n",
                "    '''\n",
                "    display(HTML(html_card))\n",
                "    \n",
                "    print('⬇️ Downloading final 3D master video to your computer...')\n",
                "    files.download(video_path)\n",
                "else:\n",
                "    print('❌ Video not found. Please run Step 2 first.')"
            ]
        }
    ]
}

colab_path = Path("Colab_Shop_3D_Home_Conversation.ipynb")
with open(colab_path, "w", encoding="utf-8") as f:
    json.dump(notebook, f, indent=2)

print(f"✅ Generated {colab_path.resolve()}")
