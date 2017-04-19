
import * as async from 'async'

let i = 100;
async.parallel([
    function(cb){
        console.log(i)
        i = 9;
    },
    function(cb){
        console.log(i)
        i = 10
    },
    function(){
        console.log(i)
        i = 1
    }
],function(err,result){

});