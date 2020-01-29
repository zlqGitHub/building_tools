(function(){
    // 在js环境中，es5的环境中不支持es6/7，需要进行babel转换
    var result = [1,2,3,4,5].map(function(item, index) {
        return item + 10;
    }); 
    console.log(result);
})();