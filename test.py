from contextlib import closing
import requests

downloaded = 0
total_size = 0

with closing(requests.get("http://127.0.0.1/ubuntu16.iso", stream=True)) as response:
	total_size = int(response.headers['content-length'])
	with open('d:/downloads/ubuntu16.iso', "wb") as file:
		for data in response.iter_content(chunk_size=1024):
			file.write(data)
			downloaded += len(data)
			#print(downloaded, total_size, downloaded/total_size)
			if downloaded == total_size:
				print("mission downloaded")
				file.close()
