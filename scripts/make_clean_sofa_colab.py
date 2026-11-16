import json
from pathlib import Path

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "Colab_Shop_LivingRoom_Phone_Duo.ipynb",
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
                "# 🛋️ LifeSolveNow – Ramesh Bhaiya & Priya Living Room Sofa Dialogue (Clean Video)\n",
                "### 🎬 3D Pixar-Style Talking Reel • Living Room Couch • Clean Screen (Top URL Only) • Phone Screen UI\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Shop_LivingRoom_Phone_Duo.ipynb)\n",
                "\n",
                "---\n",
                "\n",
                "### 🌟 Video Highlights:\n",
                "- **Setting:** Ramesh Bhaiya and Priya both sitting comfortably together on the living room sofa.\n",
                "- **Clean Screen:** Absolutely ZERO subtitle bars, ZERO lower-third boxes, and ZERO floating image stickers. Only a clean transparent watermark at the top: `shop.lifesolvenow.com`.\n",
                "- **SmartPhone UI:** The website catalog & direct WhatsApp connection of `shop.lifesolvenow.com` are displayed clearly right inside Priya's smartphone as she demonstrates it to Ramesh Bhaiya.\n",
                "- **Cloud Execution:** 0% load on your laptop. Runs entirely in Google Colab with 1-click download.\n"
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
                "# Install/Verify ffmpeg\n",
                "!apt-get update -qq && apt-get install -y ffmpeg\n",
                "!pip install pillow\n",
                "print('✅ Environment & Repository Ready!')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 🎬 Step 2: Render Clean Living Room Sofa Dialogue Video (~57.6s)"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# Run the dedicated assembly script\n",
                "!python video_output/shop_livingroom_phone_duo/code/generate_clean_sofa_duo.py\n",
                "\n",
                "import os\n",
                "out_path = 'video_output/shop_livingroom_phone_duo/output/shop_livingroom_clean_duo_master.mp4'\n",
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
                "## 📺 Step 3: Preview Video & 1-Click Download"
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
                "video_path = 'video_output/shop_livingroom_phone_duo/output/shop_livingroom_clean_duo_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    video_bytes = open(video_path, 'rb').read()\n",
                "    b64 = base64.b64encode(video_bytes).decode()\n",
                "    \n",
                "    html_card = f'''\n",
                "    <div style=\"font-family: Arial, sans-serif; max-width: 680px; padding: 20px; border-radius: 12px; background: #0f172a; color: #f8fafc; text-align: center;\">\n",
                "        <h2 style=\"color: #38bdf8; margin: 0 0 10px 0;\">🎬 Living Room Sofa Dialogue (Clean Video)</h2>\n",
                "        <p style=\"color: #94a3b8; font-size: 14px; margin-bottom: 15px;\">Clean Screen • Transparent Top URL • Phone Screen UI • 57.6s Master</p>\n",
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

colab_path = Path("Colab_Shop_LivingRoom_Phone_Duo.ipynb")
with open(colab_path, "w", encoding="utf-8") as f:
    json.dump(notebook, f, indent=2)

print(f"✅ Generated {colab_path.resolve()}")
