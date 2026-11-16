# 🎬 Universal Video Creation & Scripting Rule (Audience Empathy, Hypnotic Visuals & Dedicated Storage)

Whenever a request is made to create, script, plan, or direct a video (commercials, reels, ads, storytelling videos, AI avatar videos, HyperFrames compositions, or explainer videos), the AI MUST strictly follow these three non-negotiable principles:

---

## 1. 🎯 Target Persona Emotional Resonance (Dil Ko Chhoone Wala Content & Words)
> **Core Rule:** Jis specific insaan / audience ke liye video ban rahi hai, usko har ek shabd aur baat dil se feel honi chahiye — jaise hum uske andar ki aawaaz bol rahe hon.

* **Audience Reality Mapping:**
  - Video banane se pehle target viewer ka exact profile samjho: Unki daily life, unke unkahe darr (insecurities), unki problems, unke sapne aur unka daily self-talk kya hai.
* **Deep Empathy & Relatable Words (No Generic AI Tone):**
  - Script aur dialogue me kabhi bhi robotic, formal, corporate ya generic baatein mat likho.
  - Aise relatable, emotive aur powerful words use karo jo viewer ko instant hit karein aur wo soche: *"Yeh toh bilkul meri hi kahani hai! Isko meri exact situation kaise pata chali?"*
* **Tone & Dialect Alignment:**
  - Target audience ke according natural conversational tone (natural Hindi, relatable Hinglish, local nuances) use karo. Bhasha me honesty, sincerity aur natural human feel honi chahiye.
* **Emotional Arc:**
  - **Hook (Relatable Shock / Emotional Trigger)** ➔ **Validation & Empathy (Unka struggle feel karwana)** ➔ **Transformation / Solution (Relief & Excitement)** ➔ **Clear Actionable CTA**.

---

## 2. 👁️ Compelling Mental Simulation & Hypnotic Imagery (Imagine Karne Par Majboor Karne Wale Visuals)
> **Core Rule:** Video ke visuals, b-rolls, images, clips aur metaphors aise hone chahiye jo viewer ke dimaag me chhap jayein aur usko scenario vivid roop se imagine karne par majboor kar dein.

* **Show, Don't Just Tell:**
  - Sirf facts ya lines nahi bolni — screen par aur viewer ke dimaag me ek jeeta-jaagta visual picture create karna hai.
* **Sensory & Micro-Moment Visuals:**
  - Har line ke sath exact real-life micro-moments dikhao (e.g. raat ko 10 baje dukan ka shutter girate waqt thaka hua chehra, phone screen par notification ki ghanti, khali dukan me intezaar karna, achanak customers ki bheed ka aana).
* **Viewer as the Protagonist (Hero):**
  - Visual composition aur camera angles aise choose karo jisse viewer video ko bahar se na dekhe, balki khud ko us scene ke andar mehsus kare.
* **Hypnotic Scene-by-Scene Direction:**
  - Har audio line ke sath exact visual prompt / b-roll direction / camera angle / visual metaphor provide karo taaki video dekhne wala visualize karne se khud ko rok hi na sake.

---

## 3. 📁 Dedicated Video Project Isolation (`video_output/` Mandatory Architecture)
> **Core Rule:** Jab bhi koi new video banegi, uska saara data (code, images, audio, video output, metadata) `video_output/<video_name_or_slug>/` ke andar ek dedicated separate folder me hi rahega. Koi bhi files root me ya idhar-udhar scatter nahi karni hain.

* **Mandatory Directory Structure:**
  Har video ke liye `video_output/` ke andar ek unique folder banega:
  ```
  video_output/
  └── <video_project_name>/
      ├── assets/          # Images, background, character cutouts, badges, graphics
      ├── audio/           # Voiceover, TTS files, SFX, background music
      ├── code/            # Scripts (Python, HyperFrames, Remotion, animation code)
      └── output/          # Final rendered video (.mp4) and preview renders
  ```
* **Asset & Execution Encapsulation:**
  - Kisi bhi video ka script/code sirf apne dedicated folder ke andar execute hoga aur assets wahin se read/write karega.
  - Video render hone ke baad final `.mp4` usi folder ke `output/` me store hoga.
  - Har video project 100% self-contained hona chahiye taaki purani aur nayi videos aapas me kabhi collide na karein.

---

## 📋 Mandatory 4-Step Execution on Every Video Request:
Jab bhi user video banane ya script likhne bole:
1. **Target Persona & Emotional Core:** Pehle 1-2 line me identify karo: *Yeh video kiske liye hai aur usko kya mehsus karwana hai.*
2. **Heart-Touching Script & Words:** Aise shabdon me script likho jo direct dil ko chhu jayein.
3. **Hypnotic Visual & Scene Direction:** Har line ke sath exact visuals, images, screen captures ya b-roll prompts do jo imagination trigger karein.
4. **Dedicated Folder Setup:** Har new video ke liye `video_output/<video_name>/` ke andar dedicated folder aur subfolders bana kar hi saara code, assets, audio aur final video save karo.

---

## 4. 🎭 Permanent Voice & Character Face Binding Rule (Strict Non-Negotiable)
> **Core Rule:** Jab bhi koi video banegi, har voice ke sath uska specific fixed character face (100% Code-Driven Vector Puppet) hi use hoga. Kabhi bhi mismatch ya generic avatar use nahi karna hai.

* **Fixed Voice ➔ Character Matrix:**
  1. **Voice: `aarav` (Hinglish/Hindi Tech)** ➔ **Character Face: `Alex`** (`brandkit/characters/alex/AlexCharacter.tsx`)
     - Slate hoodie, cyan drawstrings, stylish glasses, vibe coder aesthetic.
  2. **Voice: `ananya` (Hinglish/Hindi Energetic)** ➔ **Character Face: `Maya`** (`brandkit/characters/maya/MayaCharacter.tsx`)
     - Cyber jacket, magenta trim, sleek violet haircut, AI director aesthetic.
  3. **Voice: `kabir` (Hindi/English Deep Explainer)** ➔ **Character Face: `Kabir`** (`brandkit/characters/kabir/KabirCharacter.tsx`)
     - Charcoal turtleneck & blazer, chiseled beard, mature podcast host aesthetic.
  4. **Voice: `riya` (Hindi/English Friendly Creator)** ➔ **Character Face: `Riya`** (`brandkit/characters/riya/RiyaCharacter.tsx`)
     - Mustard sweater, white collar, wavy chestnut hair, rosy cheeks, vlogger aesthetic.
  5. **Voice: `dev` (Hinglish/English Speed Coder)** ➔ **Character Face: `Dev`** (`brandkit/characters/dev/DevCharacter.tsx`)
     - Techwear bomber, gaming headphones around neck, spiky hair with green streak, speed coder aesthetic.

* **Lip-Sync Enforcement:**
  - Character hamesha `brandkit/characters/engine/audio_to_visemes.py` se generate hue frame-accurate visemes (`rest`, `open_small`, `open_wide`, `o_shape`, `e_shape`, `smile`), procedural eye-blinks aur head-bobs ke sath hi animate hoga.

---

## 5. 🛍️ Master Mission & Brand Core: shop.lifesolvenow.com
> **Core Rule:** Is studio ka primary focus **shop LifeSolveNow** (`https://shop.lifesolvenow.com/`) ke liye high-converting, viral ad videos aur reels banana hai.

* **Actual Brand Nature & Role:**
  - **Website:** `https://shop.lifesolvenow.com/`
  - **What it is:** Local Multi-Store Marketplace & Digital Storefront platform that connects neighbourhood shops (Kirana, Medical, Repair, Salon, Local Services) with nearby customers.
  - **Sales / Payments Boundary:** Platform customer aur shopkeeper ke **sales, payments ya middleman transactions se related koi kaam nahi karta**. (No payment processing, no commission cuts, no money holding).
  - **What it actually provides to Dukandar / Local Businesses:**
    1. **Digital Storefront / Online Presence:** Apni local dukan ka online catalog banana, products/services list karna, aur aasan link se share karna.
    2. **Direct Customer Connection:** Grahak bina kisi complex app ke dukan ko discover karte hain aur direct WhatsApp / Call se judte hain.
    3. **Local Visibility & Discovery:** Mohalle aur city ke andar verified local shops ki discovery.
  - **Strictly Prohibited False Claims (DO NOT USE):**
    - ❌ NO ₹99/month Pro plan (does not exist).
    - ❌ NO Table QR code for cafe kitchen orders (does not exist).
    - ❌ NO comparison with Swiggy/Zomato/Blinkit 20-30% delivery commission cuts (not applicable).
    - ❌ NO handling UPI payments or holding money in wallets (sales transactions are directly between customer and shopkeeper).

---

## 6. 🛑 Mandatory User Review & Visual Approval Gate (Script Likhna Hai, Visuals Generate Karke Dikhana Hai)
> **Core Rule:** Jab bhi koi nayi video banegi, AI ko characters aur scenes ka text description likhne ke bajaye **ACTUAL IMAGES GENERATE KARKE DIKHANI HAIN**, aur script ko clean dialogs/scenes me likhna hai.

* **Strict Protocol:**
  1. **Script in Clean Text:** Script ko scene-by-scene clean text me likho (bina lambe-chaude character description kiye).
  2. **Generate Actual Images (No Pure Text Visuals):** Har scene aur character ki actual image cloud AI se generate karo aur chat me user ko dikhao. Sirf text prompt ya description padhane ke bajaye real generated visual image dikhana mandatory hai.
  3. **Ask Explicit Permission:** User ko script aur actual generated images dikha kar permission maango: *"Kya ye script aur images theek hain? Kya main ise project me save karke cloud render setup karun?"*
  4. **No Git Push Without Green Signal:** Jab tak user explicitly approve ("Haan", "Go ahead", "Push kardo") na kare, tab tak GitHub par push ya render start nahi karna hai.



