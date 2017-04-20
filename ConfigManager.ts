
import * as fs from 'fs'
import * as schedule from 'node-schedule'
import * as events from 'events'

class ConfigManager extends events.EventEmitter{
    private commandFilePath:string = "./Commands.cfg";
    private statusFilePath:string = "./Status.cfg";
    static _ins:ConfigManager;
    constructor(){
        super()
    }
    public Init():void{
        this.CheckFileExist();
        this.startReadCommndSchedule();
    }
    static getInstance():ConfigManager{
        if(this._ins){
            return this._ins;
        }else{
            this._ins=new ConfigManager();
            return this._ins;
        }
    }
    private ReadCommand():void{
        fs.readFile(this.commandFilePath,'utf-8',(err,data)=>{
            if(data.length>0){
                var commands= data.split('\r\n');
                for(let i=0;i<commands.length;i++){
                    this.emit("onCommand",commands[i]);
                }
                
                //fs.writeFile(this.commandFilePath,"",()=>{});
            }
        })
    }
    private SaveStatus():boolean{
        return true;
    }

    private CheckFileExist():boolean{
        //检查配置文件是否存在
       let cmdfileExists = fs.existsSync(this.commandFilePath);
       let cfgFileExists = fs.existsSync(this.statusFilePath);
       if(cmdfileExists&&cfgFileExists){return true}
       if(!cmdfileExists){
           fs.writeFileSync(this.commandFilePath,"");
       }
       if(!cfgFileExists){
           fs.writeFileSync(this.statusFilePath,"");
       }
    }
    private startReadCommndSchedule() {
        var times = []
        for (var i=0;i<60;i++){
            times.push(i);
        }
        var rule = new schedule.RecurrenceRule();
        rule.second = times;
        schedule.scheduleJob(rule,()=>{
            this.ReadCommand()
        })
    }
}
export {ConfigManager}