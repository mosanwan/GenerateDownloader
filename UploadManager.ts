class UploadManager implements ICommandHandler{
    static _ins:UploadManager;
    static getInstance():UploadManager
    {
        if(!this._ins){
            this._ins= new UploadManager();
        }
        return this._ins;
    }
    HandleCommand(command:string):void{

    }
}
export {UploadManager}