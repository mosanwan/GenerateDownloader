import * as uuid from 'node-uuid'
import * as events from 'events'
class DownloadMission{
    status:string; //任务状态 DOWNLOADING 、WAITTING、PAUSED
    url:string;
    des:string;
    id:string;
    constructor(url,des){
        this.status = "WAITING";
        this.url=url;
        this.des=des;
        this.id = uuid.v1();
    }
}
class DownloadManager extends events.EventEmitter implements ICommandHandler{
    static _ins:DownloadManager;
    static getInstance():DownloadManager{
        if(!this._ins){this._ins=new DownloadManager();}
        return this._ins;
    }
    missions=[];
    constructor(){
        super()
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
            console.log("添加任务 "+ms.id)
        }else{
            console.log("重复任务 ")
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
export {DownloadManager}