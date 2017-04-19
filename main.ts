import * as Async from 'async'
import {ConfigManager} from './ConfigManager'
import * as process from 'process'
class Main{
    manager:ConfigManager;
    constructor(){
        this.manager = ConfigManager.getInstance();
        this.manager.Init();
    }
    protected start(){

    }
}
let main = new Main();

