from Downloader import DownloaderThread
import time
import Utilites


class DownloadManager:
	def __init__(self):
		self.thread_arr = []
		self.missions = []
		self.new_missions = []
		self.missions_by_name = {}
		pass

	def serial_config_str(self, config_str):
		if len(config_str) < 2:
			return
		ca = config_str.split(" ")
		cmd_name = ca[0]  # 指令名
		del ca[0]
		if cmd_name == "ADD":
			self.add_mission(ca)
		if cmd_name == "DEL":
			self.delete_mission(ca)
		if cmd_name == "PAUSE":
			self.pause_mission(ca)

	def pause_mission(self,args):  # 暂停一个任务
		mission_name = args[0]
		try:
			m = self.missions_by_name[mission_name]
			m.command = "PAUSE"
		except Exception as ex:
			print(ex)

	def delete_mission(self, args):
		print("删除任务", args)

	def add_mission(self, args):
		print("添加任务", args)
		control_type = args[0]
		mission_name = args[1]
		mission_url = args[2]
		mission_path = args[3]
		mission_md5str = ""
		if len(args) > 4:
			mission_md5str = args[4]
		try:
			self.missions_by_name[mission_name]
			print("任务名已经存在")
		except KeyError as _:
			m = Utilites.Mission(mission_name, mission_url,
			                     mission_path, control_type, mission_md5str)
			self.missions.append(m)
			self.new_missions.append(m)
			self.missions_by_name[m.name] = m

	def distribution_mission(self):
		if len(self.new_missions) > 0:
			for thread in self.thread_arr:
				if not thread.isBusy:
					m = self.new_missions[0]
					thread.exec(m)
					m.assigned = True
					del self.new_missions[0]
					break

	def read_config_file(self):
		try:
			with open("Commands.cfg", "r", encoding="utf-8") as file:
				cmds = file.read().split("\n")
				for line in cmds:
					self.serial_config_str(line.replace("\n", ""))
				file.close()
				file = open("Commands.cfg", "w", encoding="utf-8")
				file.write("")
				file.close()
		except FileNotFoundError as _:
			with open("Commands.cfg", "w", encoding="utf-8") as file:
				file.write("")
				file.close()
		self.distribution_mission()

	def save_config_file(self):
		try:
			with open("DownloadStatus.cfg", "w", encoding='utf-8') as file:
				status = []
				for m in self.missions:
					mission_status = m.name+" "
					mission_status += m.status+" "
					mission_status += m.control_type+" "
					mission_status += str(m.content_download) + " "
					mission_status += str(m.content_length)+" "
					mission_status += str(m.content_uploaded) + " "
					mission_status += str(m.upload_size) + " "
					mission_status += str(m.url) + " "
					mission_status += str(m.file_path) + " "
					mission_status += str(m.md5str) + " "
					mission_status += "\n"
					status.append(mission_status)
				# print(m)
				file.writelines(status)
				file.close()
		except FileNotFoundError as _:
			with open("DownloadStatus.cfg", "w", encoding='utf-8') as file:
				file.close()

	def start(self):
		for x in range(1):  # 创建三个下载线程
			worker = DownloaderThread("thread" + str(x), self)
			worker.setDaemon(False)
			self.thread_arr.append(worker)
		for th in self.thread_arr:  # 启动线程
			th.start()
		while True:
			self.read_config_file()
			time.sleep(0.2)
			self.save_config_file()
			time.sleep(0.8)

	def load_pre_config(self):
		try:
			with open("DownloadStatus.cfg","r",encoding="utf-8") as file:
				status_str = file.read()
				status_str = status_str[0:len(status_str)-1]
				status = status_str.split("\n")
				for statu in status:
					sa = statu.split(" ")
					m = Utilites.Mission(sa[0], sa[7], sa[8], sa[2], sa[9])
		except FileNotFoundError as _:
			pass

	def test(self):
		pass


if __name__ == "__main__":
	import os

	print(os.getcwd())
	manager = DownloadManager()
	manager.load_pre_config()
	manager.start()
	manager.test()
