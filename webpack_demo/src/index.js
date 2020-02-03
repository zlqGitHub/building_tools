const test = require('./test');
require('./index.css');
require('./index.less');

var fun = () => {
    console.log("我是高级语法箭头函数");
}

fun();

class A{
    // a = "我是类class"
    constructor() {
        this.a = 'a'
    }
}
