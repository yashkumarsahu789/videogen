#!/usr/bin/env python3
"""
Generates the 1-Click Google Colab Notebook for VIBDECODING Studio.
Updated with:
- Target: shop_intro_video (Grand Introduction Video for shop.lifesolvenow.com).
- Support for shop_repair_ad, shop_30s_ad, dukandar_ad_v1.
- In-player manual download button (auto-download OFF).
- Force fetch latest Git commits.
"""

import json
from pathlib import Path

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "colab": {
            "name": "VIBDECODING Cloud Video Studio",
            "provenance": [],
            "authorship_tag": "VIBDECODING"
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
            "metadata": {"id": "header_md"},
            "source": [
                "# 🎬 VIBDECODING Studio — Cloud Video Renderer\n",
                "### **Google Colab Cloud Engine (12 GB RAM · Zero Queue · Instant Play)**\n",
                "\n",
                "> 💡 **Zero Laptop Load:** Saara heavy video rendering Google ke cloud servers par hoga. Laptop ka fan bilkul silent rahega!\n",
                "\n",
                "**Kaise Chalana Hai:**\n",
                "1. **Step 1 (▶ Play):** GitHub se latest video project code pull karein.\n",
                "2. **Step 2 (▶ Play):** One-time cloud setup (~20s).\n",
                "3. **Step 3 (▶ Play):** `shop_intro_video` render karein — exact video screen par play hogi (Auto-download band hai, download button provided).\n"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "step1_clone"},
            "outputs": [],
            "source": [
                "# @title 📥 Step 1: Connect & Force-Pull Latest Studio Code\n",
                "# @markdown Run this cell to fetch the newest video projects from GitHub.\n",
                "import os\n",
                "\n",
                "GITHUB_USERNAME = \"yashkumarsahu789\"\n",
                "REPO_NAME = \"videogen\"\n",
                "\n",
                "# If your GitHub repository is Private, enter a Personal Access Token below.\n",
                "# If your repository is Public, leave it completely blank!\n",
                "GITHUB_TOKEN = \"\" # @param {type:\"string\"}\n",
                "\n",
                "token_clean = GITHUB_TOKEN.strip()\n",
                "if token_clean:\n",
                "    clone_url = f\"https://{GITHUB_USERNAME}:{token_clean}@github.com/{GITHUB_USERNAME}/{REPO_NAME}.git\"\n",
                "else:\n",
                "    clone_url = f\"https://github.com/{GITHUB_USERNAME}/{REPO_NAME}.git\"\n",
                "\n",
                "if not os.path.exists(REPO_NAME):\n",
                "    print(f\"🚀 Connecting to {REPO_NAME} from GitHub...\")\n",
                "    !git clone $clone_url\n",
                "    %cd $REPO_NAME\n",
                "else:\n",
                "    %cd /content/$REPO_NAME\n",
                "    print(\"🔄 Force-fetching latest code from GitHub...\")\n",
                "    !git fetch origin\n",
                "    !git reset --hard origin/main\n",
                "\n",
                "print(\"\\n✅ Repository successfully updated with latest video projects!\")\n"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "step2_deps"},
            "outputs": [],
            "source": [
                "# @title ⚙️ Step 2: Install Cloud Dependencies (One-Time Setup ~20s)\n",
                "# @markdown Installs Remotion, FFmpeg, and Voice/Lip-Sync packages in Google Cloud.\n",
                "import os\n",
                "\n",
                "print(\"📦 1/3 Installing Linux display and media libraries...\")\n",
                "!apt-get update -qq && apt-get install -y -qq ffmpeg libnss3 libatk-bridge2.0-0 libdrm2 libxkbcommon0 libgbm1 fonts-noto-color-emoji > /dev/null\n",
                "\n",
                "print(\"📦 2/3 Installing Python voice and lip-sync packages...\")\n",
                "!pip install -q edge-tts numpy soundfile scipy requests\n",
                "\n",
                "print(\"📦 3/3 Installing Remotion rendering engine...\")\n",
                "!npm install -q --no-audit\n",
                "if os.path.exists(\"video_output/shop_intro_video/code\"):\n",
                "    !cd video_output/shop_intro_video/code && npm install -q --no-audit\n",
                "if os.path.exists(\"video_output/shop_repair_ad/code\"):\n",
                "    !cd video_output/shop_repair_ad/code && npm install -q --no-audit\n",
                "if os.path.exists(\"video_output/shop_30s_ad/code\"):\n",
                "    !cd video_output/shop_30s_ad/code && npm install -q --no-audit\n",
                "\n",
                "print(\"\\n🚀 Cloud environment fully optimized and ready to render at full speed!\")\n"
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {"id": "step3_render"},
            "outputs": [],
            "source": [
                "# @title 🎬 Step 3: Render Video in Cloud & Watch Preview\n",
                "# @markdown Select which project you want to render:\n",
                "\n",
                "target_project = \"shop_intro_video\" # @param [\"shop_intro_video\", \"shop_repair_ad\", \"shop_30s_ad\", \"dukandar_ad_v1\"]\n",
                "auto_download = False # @param {type:\"boolean\"}\n",
                "show_preview = True # @param {type:\"boolean\"}\n",
                "\n",
                "import os\n",
                "import glob\n",
                "from IPython.display import HTML, display\n",
                "from google.colab import files\n",
                "\n",
                "print(f\"🎬 Rendering target: '{target_project}' on Google Cloud VM...\")\n",
                "!python scripts/cloud_render.py --target \"$target_project\"\n",
                "\n",
                "# Target video path strictly matching the requested project\n",
                "video_path = f\"exports/{target_project}.mp4\"\n",
                "if not os.path.exists(video_path):\n",
                "    video_path = f\"video_output/{target_project}/output/{target_project}.mp4\"\n",
                "\n",
                "if os.path.exists(video_path):\n",
                "    file_size_mb = os.path.getsize(video_path) / (1024 * 1024)\n",
                "    print(f\"\\n🎉 VIDEO RENDERED SUCCESSFULLY IN CLOUD!\")\n",
                "    print(f\"📹 Master Video: {video_path} ({file_size_mb:.2f} MB)\")\n",
                "\n",
                "    if show_preview:\n",
                "        print(\"\\n🎥 Live Preview (Auto-download is OFF - Use the green button to download):\")\n",
                "        from base64 import b64encode\n",
                "        with open(video_path, \"rb\") as f:\n",
                "            mp4_b64 = b64encode(f.read()).decode()\n",
                "        html_code = f'''\n",
                "        <div style=\"display:flex; flex-direction:column; align-items:center; gap:16px; margin:20px 0;\">\n",
                "          <video width=\"360\" height=\"640\" controls autoplay style=\"border-radius:18px; box-shadow:0 12px 36px rgba(0,0,0,0.6);\">\n",
                "            <source src=\"data:video/mp4;base64,{mp4_b64}\" type=\"video/mp4\">\n",
                "            Your browser does not support video playback.\n",
                "          </video>\n",
                "          <a href=\"data:video/mp4;base64,{mp4_b64}\" download=\"{target_project}.mp4\" style=\"background:#10B981; color:#ffffff; padding:12px 28px; border-radius:30px; text-decoration:none; font-weight:800; font-size:16px; box-shadow:0 6px 20px rgba(16,185,129,0.4); display:inline-block;\">\n",
                "            📥 Download {target_project}.mp4 ({file_size_mb:.1f} MB)\n",
                "          </a>\n",
                "        </div>\n",
                "        '''\n",
                "        display(HTML(html_code))\n",
                "\n",
                "    if auto_download:\n",
                "        print(\"\\n📥 Auto-downloading video to your computer...\")\n",
                "        files.download(video_path)\n",
                "else:\n",
                "    print(f\"\\n❌ ERROR: Video file '{video_path}' was not generated! Please check the render output logs above.\")\n"
            ]
        }
    ]
}

Path("colab_render.ipynb").write_text(json.dumps(notebook, indent=2), encoding="utf-8")
print("colab_render.ipynb regenerated successfully!")
