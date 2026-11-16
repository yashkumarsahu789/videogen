import asyncio
import edge_tts

async def list_v():
    voices = await edge_tts.list_voices()
    indian = [v for v in voices if 'IN' in v['Locale']]
    for v in indian:
        print(f"{v['ShortName']} ({v['Gender']}) - {v['Locale']}")

if __name__ == '__main__':
    asyncio.run(list_v())
