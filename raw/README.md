# 📹 Raw Footage & Input Video Staging (`raw/`)

This directory is your **production intake hopper**. Every single video you want edited or produced gets its own dedicated subfolder here.

---

## 🚨 Cardinal Rule: One Dedicated Folder Per Video!

**Never drop loose video or audio files directly into the root of `raw/`.**  
Every video project MUST have its own isolated subfolder named by date and slug.

### 🏷️ Subfolder Naming Pattern:
```
raw/
└── YYYY-MM-DD_<project-slug>/
```
**Examples:**
* `raw/2026-11-12_building-first-ai-app/`
* `raw/2026-11-14_talking-avatar-reel/`
* `raw/2026-11-18_saas-explainer/`

---

## 🗂️ Standard Project Subfolder Structure

Inside each video's dedicated folder, use this recommended layout:

```
raw/<project-name>/
├── footage/          # Raw A-Roll (camera recordings, OBS captures, screen recordings)
├── audio/            # Dedicated high-quality mic recordings (WAV, M4A, voice memos)
├── broll/            # Supplemental video clips, screen walkthroughs, UI recordings
├── assets/           # Project-specific screenshots, graphs, diagrams, guest images
└── notes.md          # Script, edit instructions, timestamps, cut list, music vibe
```

---

## 📝 Example `notes.md` Template to Include in Your Project Folder:

```markdown
# Project: <Project Name>
- **Target Platform:** YouTube / Instagram Reel (9:16) / LinkedIn (1:1)
- **Target Audience:** Developers, Founders, Creators
- **Hook Idea:** "Most people waste 10 hours editing..."
- **Pacing:** Fast-paced, punchy, zoom-ins every 2 seconds
- **BGM Mood:** Energetic lofi / upbeat electronic tech
- **Special Instructions:** Blur API keys in screen recording; highlight code block at 00:45.
```

---

## 🔄 Studio Workflow Lifecycle

1. **Intake:** Create `raw/<project-name>/` and drop your raw files + `notes.md`.
2. **Processing:** The AI editing pipeline / script processes assets and generates the edit inside `video_output/<project-name>/`.
3. **Delivery:** The rendered video is delivered to `exports/<project-name>_v1.mp4`.
4. **Approval:** Once you review and approve it, the final master moves to `approved videos/`!

