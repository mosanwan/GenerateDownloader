import * as Async from 'async'
import {ConfigManager} from './ConfigManager'
import * as process from 'process'
class Main{
    manager:ConfigManager;
    operation:RegExp = /^[A-Z]+\s/;
    constructor(){
        this.manager = ConfigManager.getInstance();
        this.manager.Init();
        this.manager.on("onCommand",(cmd)=>{
            console.log(this.operation.test(cmd))
            console.log(this.operation.exec(cmd))
        })
    }
    protected start(){

    }
}
let main = new Main();

