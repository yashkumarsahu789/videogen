import subprocess
import os

assets = 'video_output/shop_digital_dukaan_3d/assets'
clips_dir = 'video_output/shop_digital_dukaan_3d/clips'
os.makedirs(clips_dir, exist_ok=True)

clip_configs = [
    (
        'scene1_morning_market.jpg',
        'clip1.mp4',
        8.4,
        "zoompan=z='min(zoom+0.0006,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=252:s=1280x720:fps=30"
    ),
    (
        'scene2_smartphone_concern.jpg',
        'clip2.mp4',
        10.4,
        "zoompan=z='min(zoom+0.0008,1.20)':x='iw/2-(iw/zoom/2)':y='ih*0.6-(ih/zoom*0.6)':d=312:s=1280x720:fps=30"
    ),
    (
        'scene3_storefront_reveal.jpg',
        'clip3.mp4',
        8.4,
        "zoompan=z='if(lte(zoom,1.0),1.18,max(1.001,zoom-0.0007))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=252:s=1280x720:fps=30"
    ),
    (
        'scene4_catalog_share.jpg',
        'clip4.mp4',
        11.4,
        "zoompan=z='1.08':x='if(lte(on,1),(iw-iw/zoom)*0.1,min((iw-iw/zoom)*0.9,x+0.7))':y='ih/2-(ih/zoom/2)':d=342:s=1280x720:fps=30"
    ),
    (
        'scene5_customer_connection.jpg',
        'clip5.mp4',
        10.4,
        "zoompan=z='min(zoom+0.0006,1.15)':x='iw*0.48-(iw/zoom*0.48)':y='ih*0.45-(ih/zoom*0.45)':d=312:s=1280x720:fps=30"
    ),
    (
        'scene6_brand_finale.jpg',
        'clip6.mp4',
        13.0,
        "zoompan=z='if(lte(zoom,1.0),1.15,max(1.001,zoom-0.0004))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=390:s=1280x720:fps=30"
    )
]

for idx, (img_name, clip_name, dur, zp_filter) in enumerate(clip_configs):
    img_path = os.path.join(assets, img_name)
    out_path = os.path.join(clips_dir, clip_name)
    print(f'🎬 Rendering Clip {idx+1}/6 ({clip_name}, {dur}s)...')
    cmd = [
        'ffmpeg', '-y',
        '-loop', '1',
        '-i', img_path,
        '-vf', zp_filter,
        '-t', str(dur),
        '-c:v', 'libx264',
        '-preset', 'fast',
        '-crf', '18',
        '-pix_fmt', 'yuv420p',
        out_path
    ]
    subprocess.run(cmd, check=True)
    print(f'✓ Clip {idx+1} ready: {os.path.getsize(out_path)} bytes')

print('\n🎉 All 6 Motion Clips Generated Successfully!')
