

class MyClass{
    area:number;
    color:string;
    constructor(name:string,width:number,height:number){
        this.area = width*height;
        this.color = name;
    }
    soutdout(){
        console.log(this.color,this.area)
    }
}
var a = new MyClass("haha",100,200);
a.soutdout()