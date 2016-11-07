import requests
import threading
import os
import Utilites
from contextlib import closing
from hashlib import md5


class DownloaderThread(threading.Thread):
    def __init__(self, thread_name, manager):
        threading.Thread.__init__(self, name=thread_name)
        self.mission_content_length = 0  # 任务总量
        self.mission_download_length = 0  # 已经下载
        self.mission_url = ""
        self.mission_file_path = ""
        self.mission_md5str = ""
        self.isBusy = False
        self.manager = manager
        self.control_type = ""
        self.current_mission = None

    def exec(self, mission):
        self.current_mission = mission

    def run(self):
        while True:
            if not self.isBusy:
                if self.current_mission is not None:
                    if self.current_mission.control_type == "DOWNLOAD":
                        self.start_download()
                    elif self.current_mission.control_type == "UPLOAD":
                        self.start_upload()

    def start_upload(self):
        pass

    def start_download(self):
        self.isBusy = True
        self.current_mission.status = "DOWNLOADING"
        with closing(requests.get(self.current_mission.url, stream=True)) as response:
            self.current_mission.content_length = int(response.headers['content-length'])
            print(self.getName() + "开始下载"+str(self.current_mission.content_length))
            try:
                with open(self.current_mission.file_path + ".temp", "wb+") as file:
                    for data in response.iter_content(chunk_size=4096):
                        file.write(data)
                        self.current_mission.content_download += len(data)
                    if self.current_mission.content_download == self.current_mission.content_length:
                        print("mission downloaded")
                        file.close()
                        if self.validate_content():
                            os.rename(self.current_mission.file_path+".temp", self.current_mission.file_path)
                            self.current_mission.status = "COMPLETED"
                        else:
                            os.remove(self.current_mission.file_path+".temp")
                        self.end_download()
            except Exception as ex:
                print(ex)
                self.current_mission.status = "ERROR-183"
                self.end_download()

    def end_download(self):
        self.current_mission = None
        self.isBusy = False

    def validate_content(self):
        if len(self.mission_md5str) == 0:
            return True
        else:
            m = md5()
            f = open(self.mission_file_path+".temp", "rb")
            m.update(f.read())
            f.close()
            temp_md5 = m.hexdigest()
            print(temp_md5)
            if temp_md5 == self.mission_md5str:
                return True
            else:
                return False

