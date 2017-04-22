import * as events from 'events'
import * as http from "http"
import {DownloadManager,DownloadMission} from "./DownloadManager"

class DownloadAgent extends events.EventEmitter {
    manager:DownloadManager;
    isBusy:boolean = false;
    constructor(manager:DownloadManager){
        super();
        this.manager=manager;
        this.manager.on('post-mission',this.HandleNewMission);
    }
    private HandleNewMission(){
        if(!this.isBusy){
            
        }
    }
    private findMission(){

    }
    AssignMission(mission){

    }
}
export {DownloadAgent}