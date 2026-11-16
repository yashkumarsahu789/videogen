import json

nb = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "Colab_Shop_Sofa_Duo_Conversation.ipynb",
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
                "# 🛋️ LifeSolveNow – Face-to-Face Sofa Conversation Reel (57.6s)\n",
                "### 🎬 2-Person Living Room Sofa Setup • Realistic Face-to-Face Dialogue • Phone Storefront Demo • 0% Commission\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Shop_Sofa_Duo_Conversation.ipynb)\n",
                "\n",
                "---\n",
                "\n",
                "### 🌟 Production Highlights (Inspired by Reference Video):\n",
                "- **Authentic Setting:** Two characters (Ramesh Bhaiya & Priya) sitting comfortably on a living room sofa, talking naturally across 8 cinematic camera perspectives.\n",
                "- **Relatable Emotional Core:** Speaks directly to Indian shopkeepers worried about empty shops while customers stay glued to their phones.\n",
                "- **Live Phone Screen UI:** Priya displays `shop.lifesolvenow.com` and direct WhatsApp connection right inside the phone screen.\n",
                "- **Clean & Uncluttered:** Absolutely zero lower-third boxes or messy subtitle bars. Crisp transparent link `shop.lifesolvenow.com` at the top.\n",
                "- **1-Click Cloud Execution:** 0% load on your computer. Renders in seconds on Google Colab.\n"
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
                "# Verify / install dependencies\n",
                "!apt-get update -qq && apt-get install -y ffmpeg\n",
                "!pip install -q pillow soundfile\n",
                "print('✅ Repository & Video Pipeline Ready!')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 🎬 Step 2: Render 57.6s Sofa Conversation Video"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# Run the sofa conversation render pipeline\n",
                "!python video_output/shop_sofa_duo_conversation/code/render.py\n",
                "\n",
                "import os\n",
                "out_path = 'video_output/shop_sofa_duo_conversation/output/shop_sofa_duo_master.mp4'\n",
                "if os.path.exists(out_path):\n",
                "    sz_mb = os.path.getsize(out_path) / (1024 * 1024)\n",
                "    print(f'🎉 Video Rendered Successfully! File Size: {sz_mb:.2f} MB')\n",
                "else:\n",
                "    print('⚠️ Error rendering video. Check logs.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 📺 Step 3: Interactive Video Player & 1-Click Download"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "from IPython.display import HTML, display\n",
                "import os\n",
                "\n",
                "video_path = 'video_output/shop_sofa_duo_conversation/output/shop_sofa_duo_master.mp4'\n",
                "if not os.path.exists(video_path):\n",
                "    video_path = 'exports/shop_sofa_duo_master.mp4'\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    sz_mb = os.path.getsize(video_path) / (1024 * 1024)\n",
                "    print(f'✅ Video ready for preview! Size: {sz_mb:.2f} MB')\n",
                "    \n",
                "    # Display interactive video preview\n",
                "    display(HTML(f'''\n",
                "    <div style=\"max-width: 720px; margin: 0 auto; background: #0f172a; padding: 16px; border-radius: 12px; border: 1px solid #334155; font-family: sans-serif;\">\n",
                "        <h3 style=\"color: #38bdf8; margin-top: 0;\">🛋️ Living Room Sofa Conversation Reel</h3>\n",
                "        <p style=\"color: #94a3b8; font-size: 14px;\">Duration: 57.6s | Clean Presentation | shop.lifesolvenow.com</p>\n",
                "        <video width=\"100%\" height=\"420\" controls autoplay loop style=\"border-radius: 8px; border: 1px solid #1e293b;\">\n",
                "            <source src=\"{video_path}\" type=\"video/mp4\">\n",
                "            Your browser does not support video playback.\n",
                "        </video>\n",
                "    </div>\n",
                "    '''))\n",
                "else:\n",
                "    print('❌ Video file not found.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "## 💾 Step 4: Download Video to Your Computer"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "from google.colab import files\n",
                "import os\n",
                "\n",
                "video_path = 'video_output/shop_sofa_duo_conversation/output/shop_sofa_duo_master.mp4'\n",
                "if os.path.exists(video_path):\n",
                "    print('⬇️ Downloading video to your computer...')\n",
                "    files.download(video_path)\n",
                "else:\n",
                "    print('❌ Video file not found.')"
            ]
        }
    ]
}

with open(r'c:\Users\yashk\vibdecoding\Colab_Shop_Sofa_Duo_Conversation.ipynb', 'w', encoding='utf-8') as f:
    json.dump(nb, f, indent=2)

print("Created Colab_Shop_Sofa_Duo_Conversation.ipynb successfully!")
