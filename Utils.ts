
let url_option_path:RegExp = /\/.+$/;
let urlReg:RegExp= /^[http https].+/

export function ConvertURLToOptions(url:string):object{
    url = url.replace("http://","");
    url = url.replace("https://","");
    let _path = url_option_path.exec(url)[0];
    let _host = url.replace(url_option_path,"");
    return {
        host:_host,
        path:_path,
        method:"GET",
        protocol:"http:",
        port:80,
        callback:null,
        auth:"",
        headers:{
            
        }
    }
}