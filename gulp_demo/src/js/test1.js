// 注意函数必须使用严格模式
(function() {
    function foo(num1, num2) {
        return num1 + num2;
    }
    // console.log(foo(22,23));
    // 压缩后，将不会把没有使用的放进去
})();