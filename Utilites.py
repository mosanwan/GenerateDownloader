class Mission:
	def __init__(self, name, url, path, control_type, md5str=""):
		self.name = name
		self.url = url
		self.file_path = path
		self.md5str = md5str
		self.content_length = -1
		self.content_download = 0
		self.upload_size = 0
		self.content_uploaded = 0
		self.assigned = False
		self.control_type = control_type
		self.command = "None"
		self.status = "WAITING"
		#  任务状态 分别有 WAITTING，DOWNLOADING，UPLOADING，PAUSED，COMPLETED, EEROR
