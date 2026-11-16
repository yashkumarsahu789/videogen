import json

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
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
            "metadata": {"id": "m1"},
            "source": [
                "# 🛋️ LifeSolveNow – Ramesh Bhaiya & Priya Living Room Sofa Conversation\n",
                "### 🎬 3D Pixar-Style Talking Reel (57s) • Living Room Sofa Scene • Interactive Dialogue & Dynamic B-Roll Cards\n",
                "**⚡ 0% Load on Your Laptop: All Video Processing & Assembly Runs Free in Google Colab Cloud!**\n",
                "\n",
                "[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/yashkumarsahu789/videogen/blob/main/Colab_Shop_Sofa_Duo_Reel.ipynb)\n",
                "\n",
                "---\n",
                "### 🌟 Scene Breakdown & Setting:\n",
                "- **Setting:** A warm, cozy Indian family living room with Ramesh Bhaiya and Priya sitting together on the sofa with a tea table in front.\n",
                "- **Camera Acting:** Camera pans and zooms dynamically between Ramesh Bhaiya's worried questions and Priya's enthusiastic smartphone demonstration.\n",
                "- **Visual Demo:** Priya shows the glowing digital storefront of `shop.lifesolvenow.com` on her phone, with dynamic B-roll pop-ups for WhatsApp sharing and direct customer connection.\n",
                "- **Audio:** Authentic Hindi conversational voice acting + warm Indian acoustic commercial background music.\n"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {"id": "m2"},
            "source": [
                "## 📦 Step 1: Install Tools & Clone Studio Assets"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "c1"},
            "outputs": [],
            "source": [
                "!apt-get update -qq && apt-get install -y -qq ffmpeg\n",
                "\n",
                "# Clone the repository containing the living room sofa scene assets, audio tracks & clips\n",
                "!rm -rf videogen\n",
                "!git clone https://github.com/yashkumarsahu789/videogen.git\n",
                "\n",
                "print(\"✅ Living Room Sofa Assets & Audio Ready!\")"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {"id": "m3"},
            "source": [
                "## 🎬 Step 2: Render & Assemble Living Room Sofa Reel\n",
                "Compiles the 8 dialogue shots with living room sofa camera movements, speaker badges, subtitles, and mixed background music:"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "c2"},
            "outputs": [],
            "source": [
                "import subprocess, os\n",
                "from pathlib import Path\n",
                "\n",
                "os.chdir(\"videogen\")\n",
                "!python video_output/shop_sofa_duo_3d/code/generate_sofa_duo_reel.py\n",
                "os.chdir(\"..\")\n",
                "\n",
                "output_video = \"videogen/video_output/shop_sofa_duo_3d/output/shop_sofa_duo_reel_master.mp4\"\n",
                "!cp {output_video} shop_sofa_duo_reel_master.mp4\n",
                "\n",
                "print(f\"\\n🏆 SOFA DUO REEL COMPILED IN CLOUD! Size: {round(os.path.getsize('shop_sofa_duo_reel_master.mp4')/1024/1024, 2)} MB\")"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {"id": "m4"},
            "source": [
                "## 📺 Step 3: Full-Screen Interactive Video Player & 1-Click Download"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "c3"},
            "outputs": [],
            "source": [
                "from IPython.display import HTML\n",
                "from base64 import b64encode\n",
                "\n",
                "final_file = \"shop_sofa_duo_reel_master.mp4\"\n",
                "mp4_bytes = open(final_file, 'rb').read()\n",
                "data_url = \"data:video/mp4;base64,\" + b64encode(mp4_bytes).decode()\n",
                "\n",
                "display(HTML(f'''\n",
                "<div style=\"background: linear-gradient(135deg, #0f172a, #1e293b); padding: 25px; border-radius: 16px; border: 1px solid #38bdf8; text-align: center; color: white; max-width: 800px; margin: auto; box-shadow: 0 10px 30px rgba(0,0,0,0.5);\">\n",
                "    <h2 style=\"color: #38bdf8; margin-bottom: 8px; font-family: sans-serif;\">🛋️ LifeSolveNow – Ramesh Bhaiya & Priya Living Room Sofa Conversation</h2>\n",
                "    <p style=\"color: #94a3b8; font-size: 15px; margin-top: 0;\">3D Pixar-Style Talking Reel (57s) • Living Room Sofa Setting • Dynamic B-Roll Cards • Mixed Audio</p>\n",
                "    <video width=\"720\" height=\"405\" controls autoplay style=\"border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.6); max-width: 100%;\">\n",
                "        <source src=\"{data_url}\" type=\"video/mp4\">\n",
                "        Your browser does not support HTML5 video.\n",
                "    </video>\n",
                "    <div style=\"margin-top: 20px;\">\n",
                "        <a href=\"{final_file}\" download style=\"background: linear-gradient(135deg, #2563eb, #38bdf8); color: white; padding: 12px 28px; border-radius: 30px; font-weight: bold; text-decoration: none; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(56, 189, 248, 0.4);\">\n",
                "            📥 Download Living Room Sofa Reel (.mp4)\n",
                "        </a>\n",
                "    </div>\n",
                "</div>\n",
                "'''))"
            ]
        }
    ]
}

with open("Colab_Shop_Sofa_Duo_Reel.ipynb", "w", encoding="utf-8") as f:
    json.dump(notebook, f, indent=2)

print("✅ Colab_Shop_Sofa_Duo_Reel.ipynb created successfully!")
