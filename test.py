from youtube_search import YoutubeSearch
import youtube_dl
import yt_dlp
from yt_dlp import download_range_func

results = YoutubeSearch('die with a smile', max_results=3).to_dict()
# video = pafy.new(url=f'https://www.youtube.com{results[0]['url_suffix']}')
# bestaudio = video.getbestaudio()
# bestaudio.download(filepath='/')
for res in results:
    for k, v in res.items():
        print(f'{k}: {v}')
    print()
# print(res['title'], f'https://www.youtube.com{res['url_suffix']}')
# ydl_opts = {
#         'format': 'bestaudio/best',
#         'postprocessors': [{
#             'key': 'FFmpegExtractAudio',
#             'preferredcodec': 'mp3',
#             'preferredquality': '192',
#         }],
#         'download_ranges': download_range_func(None, [(30, 60)]),
#         'force_keyframes_at_cuts': True,
#     }
# with yt_dlp.YoutubeDL(ydl_opts) as ydl:
#     ydl.download([f'https://www.youtube.com{results[0]['url_suffix'].split('&')[0]}'])
    # ydl

