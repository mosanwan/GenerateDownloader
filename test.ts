import * as http from "http"
import * as axel from 'axel-js'
import * as fs from 'fs'
import * as schedule from 'node-schedule'
var options = {
    host:'electron-ltsp.oss-cn-hangzhou.aliyuncs.com',
    path:'/lantusupei/lantusupei_0.0.1.zip',
    method:'GET',
    headers:{

    }
};

var imageData = "";
var prelen = 0;
var req = http.request(options,function(res){
    let len = Number(res.headers['content-length'])
    res.setEncoding('binary');
    res.on('data',function(chunk):void{
        imageData+=chunk;
        console.log(imageData.length/len)
    })
    res.on('end',function(){
        console.log('enmd')
        fs.writeFileSync
    })
})
req.end()

var rule = new schedule.RecurrenceRule();
rule.seconds = [1,2,3,4,5,6,7,8,9,10]
var job = schedule.scheduleJob(rule,function(){
    console.log(1)
})