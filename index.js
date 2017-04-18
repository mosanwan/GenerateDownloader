var MyClass = (function () {
    function MyClass(name, width, height) {
        this.area = width * height;
        this.color = name;
    }
    MyClass.prototype.soutdout = function () {
        console.log(this.color, this.area);
    };
    return MyClass;
}());
var a = new MyClass("haha", 100, 200);
a.soutdout();
//# sourceMappingURL=index.js.map