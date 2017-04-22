import * as uuid from 'node-uuid'
import * as events from 'events'
import * as http from "http"
import {ConvertURLToOptions} from './Utils'
import {DownloadAgent} from "./DownloadAgent"
const mission_chunk_size:number = (1024*1024*10);//单个任务长度
class DownloadMission{
    status:string; //任务状态 DOWNLOADING 、WAITTING、PAUSED
    url:string;
    des:string;
    id:string;
    contentSize:number;
    downloadedSize:number = 0;
    sliceStatus = [];
    constructor(url,des){
        this.status = "WAITING";
        this.url=url;
        this.des=des;
        this.id = uuid.v1();
    }
    sliceMission(){
        let mission_num = Math.ceil(this.contentSize/ mission_chunk_size)
        console.log(" 数量 "+mission_num);
    }
}
class DownloadManager extends events.EventEmitter implements ICommandHandler{
    static _ins:DownloadManager;
    static getInstance():DownloadManager{
        if(!this._ins){this._ins=new DownloadManager();}
        return this._ins;
    }
    missions=[];
    agents = [];
    constructor(){
        super();
        for(let i =0;i<10;i++){
            this.agents.push(new DownloadAgent(this));
        }
    }
    HandleCommand(command:string):void{
        let cmdlist = command.split(" ");
        if(cmdlist.length<3){
            throw("Download Command args error");
        } 
        let url = cmdlist[1];
        let des = cmdlist[2];
        //console.log("开始下载文件 url "+url +"  "+des);
        if(this.findMissionByUrl(url)==null){
            let ms = new DownloadMission(url,des);
            this.missions.push(ms);
            console.log("添加任务 "+ms.id);
            let op:any =  ConvertURLToOptions(url);
            var lengthReq = http.request(op,(res)=>{
                if(res.statusCode!=200){
                    console.log('资源出错'+url)
                }
                res.setEncoding('utf8');
                res.on('data',(chunk)=>{
                    ms.contentSize=parseInt(res.headers['content-length']);
                    lengthReq.abort()
                    this.emit('post-mission');
                })
                res.on('error',(err)=>{
                    console.log("请求资源大小失败"+url)
                })
                res.on('end',()=>{
                    console.log('end')
                    ms.sliceMission();
                })
            });
            lengthReq.setTimeout(5000,()=>{
                console.log('请求超时')
            })
            lengthReq.end();
        }else{
            console.log("重复任务")
        }
    }
    findMissionById(id:string):DownloadMission{
        for(var i = 0;i<this.missions.length;i++){
            if(this.missions[i].id == id){
                return this.missions[i];
            }
        }
        return null
    }
    findMissionByUrl(url:string):DownloadMission{
        for(var i = 0;i<this.missions.length;i++){
            if(this.missions[i].url == url){
                return this.missions[i];
            }
        }
        return null;
    }
    

}
export {DownloadManager,DownloadMission}