import os
import subprocess
from pathlib import Path

sprites_dir = Path("video_output/animated_face_to_face_dialogue/assets/sprites")
sprites_dir.mkdir(parents=True, exist_ok=True)

# SVG templates from interactive_studio.html
def get_mouth_path(mouth, stroke_color, fill_color):
    if mouth == 'open_wide':
        return f'<path d="M 272 350 Q 300 346 328 350 Q 332 390 300 392 Q 268 390 272 350 Z" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/><rect x="284" y="348" width="32" height="6" fill="#FFF"/><ellipse cx="300" cy="382" rx="14" ry="7" fill="#F43F5E"/>'
    elif mouth == 'open_small':
        return f'<ellipse cx="300" cy="362" rx="20" ry="11" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/><rect x="288" y="356" width="24" height="6" fill="#FFF"/>'
    elif mouth == 'o_shape':
        return f'<circle cx="300" cy="364" r="14" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/><ellipse cx="300" cy="370" rx="8" ry="4" fill="#F43F5E"/>'
    elif mouth == 'e_shape':
        return f'<rect x="274" y="357" width="52" height="14" rx="7" fill="{fill_color}" stroke="{stroke_color}" stroke-width="4"/><rect x="280" y="359" width="40" height="6" fill="#FFF"/>'
    elif mouth == 'smile':
        return f'<path d="M 276 358 Q 300 376 324 358" stroke="{stroke_color}" stroke-width="5" stroke-linecap="round" fill="none"/>'
    else: # rest
        return f'<path d="M 282 360 Q 300 362 318 360" stroke="{stroke_color}" stroke-width="5" stroke-linecap="round" fill="none"/>'

def get_eyes_path(eyes, stroke_color, iris_color, is_female=False):
    if eyes == 'blink':
        return f'<path d="M 225 272 Q 250 284 275 272" stroke="{stroke_color}" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M 325 272 Q 350 284 375 272" stroke="{stroke_color}" stroke-width="5" stroke-linecap="round" fill="none"/>'
    else: # open
        wing = f'<path d="M 228 262 Q 250 252 272 262" stroke="{stroke_color}" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M 328 262 Q 350 252 372 262" stroke="{stroke_color}" stroke-width="4" stroke-linecap="round" fill="none"/>' if is_female else ''
        return f'{wing}<circle cx="248" cy="268" r="14" fill="{iris_color}"/><circle cx="245" cy="265" r="4.5" fill="#FFF"/><circle cx="352" cy="268" r="14" fill="{iris_color}"/><circle cx="349" cy="265" r="4.5" fill="#FFF"/>'

def get_dev_svg(mouth, eyes):
    m = get_mouth_path(mouth, '#1A1715', '#7F1D1D')
    e = get_eyes_path(eyes, '#1A1715', '#1A1715', is_female=False)
    return f'''
    <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 140 610 C 140 480, 210 455, 300 455 C 390 455, 460 480, 460 610 L 490 800 L 110 800 Z" fill="#1E293B" />
        <path d="M 260 455 C 260 495, 340 495, 340 455 Z" fill="#F8FAFC" />
        <path d="M 235 455 L 270 515 L 255 530" stroke="#334155" stroke-width="3" fill="#1E293B" />
        <path d="M 365 455 L 330 515 L 345 530" stroke="#334155" stroke-width="3" fill="#1E293B" />
        <line x1="300" y1="510" x2="300" y2="780" stroke="#0F172A" stroke-width="3.5" />
        <circle cx="300" cy="545" r="3" fill="#CBD5E1" />
        <circle cx="300" cy="590" r="3" fill="#CBD5E1" />
      </g>
      <g transform="translate(0, 0)">
        <path d="M 262 350 L 262 470 L 338 470 L 338 350 Z" fill="#C5855A" />
        <path d="M 262 350 C 275 372, 325 372, 338 350 L 338 382 L 262 382 Z" fill="#B06E44" opacity="0.6" />
        <circle cx="178" cy="310" r="26" fill="#C5855A" /><circle cx="422" cy="310" r="26" fill="#C5855A" />
        <path d="M 188 230 C 188 130, 412 130, 412 230 C 412 360, 365 418, 300 418 C 235 418, 188 360, 188 230 Z" fill="#E8A779" />
        <path d="M 194 310 C 194 380, 240 418, 300 418 C 360 418, 406 380, 406 310 C 406 345, 385 405, 300 405 C 215 405, 194 345, 194 310 Z" fill="#1C1815" opacity="0.45" />
        <path d="M 268 340 Q 300 334 332 340 Q 300 350 268 340 Z" fill="#1C1815" opacity="0.4" />
        <path d="M 175 190 C 185 110, 255 85, 335 90 C 410 95, 425 140, 418 190 C 395 140, 345 130, 295 142 C 245 154, 205 160, 175 190 Z" fill="#1C1917" />
        <path d="M 182 170 C 210 90, 280 75, 355 82 C 405 88, 420 120, 415 165 C 385 110, 330 102, 280 115 C 230 128, 200 135, 182 170 Z" fill="#292524" />
        <path d="M 172 210 C 172 170, 185 145, 200 135 L 188 220 Z" fill="#1C1917" opacity="0.85" />
        <path d="M 428 210 C 428 170, 415 145, 400 135 L 412 220 Z" fill="#1C1917" opacity="0.85" />
        <path d="M 212 226 Q 246 214 278 223" stroke="#1A1715" stroke-width="6.5" stroke-linecap="round" fill="none" />
        <path d="M 322 223 Q 354 214 388 226" stroke="#1A1715" stroke-width="6.5" stroke-linecap="round" fill="none" />
        {e}
        <path d="M 300 265 L 294 306 L 306 310" stroke="#A8653C" stroke-width="4" stroke-linecap="round" fill="none" />
        {m}
      </g>
    </svg>
    '''

def get_riya_svg(mouth, eyes):
    m = get_mouth_path(mouth, '#23170F', '#991B1B')
    e = get_eyes_path(eyes, '#23170F', '#3D2314', is_female=True)
    return f'''
    <svg width="600" height="800" viewBox="0 0 600 800" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M 150 610 C 150 490, 215 460, 300 460 C 385 460, 450 490, 450 610 L 480 800 L 120 800 Z" fill="#0F766E" />
        <path d="M 245 460 L 300 545 L 355 460 Z" fill="#134E4A" />
        <path d="M 245 460 L 300 545 L 355 460" stroke="#F59E0B" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <line x1="300" y1="545" x2="300" y2="780" stroke="#F59E0B" stroke-width="2.5" />
      </g>
      <g transform="translate(0, 0)">
        <path d="M 268 355 L 268 475 L 332 475 L 332 355 Z" fill="#E29B63" />
        <path d="M 268 355 C 280 375, 320 375, 332 355 L 332 385 L 268 385 Z" fill="#C97E4A" opacity="0.5" />
        <circle cx="182" cy="312" r="5" fill="#F59E0B" />
        <circle cx="418" cy="312" r="5" fill="#F59E0B" />
        <path d="M 192 235 C 192 135, 408 135, 408 235 C 408 360, 355 412, 300 412 C 245 412, 192 360, 192 235 Z" fill="#F4C7A5" />
        <ellipse cx="228" cy="308" rx="20" ry="11" fill="#F87171" opacity="0.32" />
        <ellipse cx="372" cy="308" rx="20" ry="11" fill="#F87171" opacity="0.32" />
        <path d="M 140 210 C 140 70, 460 70, 460 210 C 472 335, 440 425, 395 445 C 418 315, 395 120, 300 120 C 205 120, 182 315, 205 445 C 160 425, 128 335, 140 210 Z" fill="#1F1610" />
        <path d="M 165 200 C 180 95, 255 80, 340 85 C 420 90, 435 150, 425 215 C 395 150, 355 150, 315 172 C 275 194, 218 172, 165 200 Z" fill="#2E1C13" />
        <path d="M 165 230 C 175 320, 195 380, 210 420" stroke="#2E1C13" stroke-width="7" stroke-linecap="round" fill="none" />
        <path d="M 435 230 C 425 320, 405 380, 390 420" stroke="#2E1C13" stroke-width="7" stroke-linecap="round" fill="none" />
        <path d="M 218 228 Q 248 215 276 224" stroke="#23170F" stroke-width="4.5" stroke-linecap="round" fill="none" />
        <path d="M 324 224 Q 352 215 382 228" stroke="#23170F" stroke-width="4.5" stroke-linecap="round" fill="none" />
        {e}
        <path d="M 298 275 L 295 305 L 305 308" stroke="#C97E4A" stroke-width="3" stroke-linecap="round" fill="none" />
        {m}
      </g>
    </svg>
    '''

chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
mouths = ['rest', 'open_small', 'open_wide', 'o_shape', 'e_shape', 'smile']
eyes_list = ['open', 'blink']

def render_sprite(char_name, svg_content, filename):
    out_png = sprites_dir / filename
    temp_html = sprites_dir / f"temp_{filename}.html"
    
    html = f"""<!DOCTYPE html>
<html>
<body style="margin:0; padding:0; background:transparent; overflow:hidden;">
  {svg_content}
</body>
</html>"""
    with open(temp_html, "w", encoding="utf-8") as f:
        f.write(html)
        
    cmd = [
        chrome_path,
        "--headless=new",
        f"--screenshot={str(out_png.resolve())}",
        "--default-background-color=00000000",
        "--window-size=600,800",
        str(temp_html.resolve().as_uri())
    ]
    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    if temp_html.exists():
        temp_html.unlink()
    print(f"✓ Sprite generated: {filename} ({round(out_png.stat().st_size/1024, 1)} KB)")

print("🎨 Pre-rendering all 24 character vector sprites with Chrome...")
for m in mouths:
    for e in eyes_list:
        # Dev
        dev_svg = get_dev_svg(m, e)
        render_sprite("dev", dev_svg, f"dev_{e}_{m}.png")
        
        # Riya
        riya_svg = get_riya_svg(m, e)
        render_sprite("riya", riya_svg, f"riya_{e}_{m}.png")

print(f"\n🎉 ALL 24 SPRITES READY IN: {sprites_dir.resolve()}")
