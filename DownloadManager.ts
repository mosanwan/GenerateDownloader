class DownloadManager implements ICommandHandler{
    static _ins:DownloadManager;
    static getInstance():DownloadManager{
        if(!this._ins){
             this._ins=new DownloadManager();
        }
        return this._ins;
       
    }
    HandleCommand(command:string):void{
        /*
        let cmdlist = command.split(" ");
        if(cmdlist.length<3){
            throw("Download Command args error");
        } 
        let url = cmdlist[1];
        let des = cmdlist[2];*/
    }
    constructor(){}

}