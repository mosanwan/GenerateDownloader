# GenerateDownloader
一个Python写的资源下载。上传工具
### 操作指令
ADD [DOWNLOAD/UPLOAD] 任务名 任务地址 下载到本地路径 MD5    例如： ADD DOWNLOAD 测试任务名1 http://127.0.0.1/ubuntu16.iso c:\downloads\ubuntu16.iso s3d234s445a22e32324daf88
DEL  任务名                                                      例如： DEL   测试任务名1


### 任务状态



注意：
1、任务名是唯一值，相当于id. 如果尝试添加一个已经存在的任务，则会忽略此次操作


ADD DOWNLOAD 测试任务名1 http://192.168.1.7:8099/ubuntu16.iso d:/downloads/ubuntu16.iso
ADD DOWNLOAD 测试任务名2 http://192.168.1.7:8099/ubuntu16.iso d:/downloads/ubuntu17.iso
ADD DOWNLOAD 测试任务名3 http://192.168.1.7:8099/ubuntu16.iso d:/downloads/ubuntu18.iso
ADD DOWNLOAD 测试任务名4 http://192.168.1.7:8099/ubuntu16.iso d:/downloads/ubuntu17.iso