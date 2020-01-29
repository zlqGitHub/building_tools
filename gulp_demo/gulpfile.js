// gulp 相关配置
// 本次使用了gulp@3.9.1 的版本，更高版本有所改动
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 使用gulp-util 打印错误，进行排查
var gutil = require('gulp-util');

// 引入babel
var babel = require('gulp-babel')

// 注册一个任务
// gulp.task("任务名", function() {
//     // 配置任务的操作

// });

// 注册合并js任务
gulp.task("js", function() {
    // return gulp.src('src/js/**/*.js');   表示读取js下所有的 .js 文件
    return gulp.src('src/js/*.js')   // 找到目标文件，将其读到gulp的内存中 , 所有的文件都在管道中操作
        .pipe(concat('build.js'))    //合并文件
        .pipe(gulp.dest('dist/js/'))  // 临时输出文件到本地
        // babel 将es6语法进行转换
        .pipe(babel())
        .pipe(uglify())              // 压缩
        // 打印错误日志，排查错误 
        .on('error', function(err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        .pipe(rename('build.min.js'))   // 重命名
        // .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js/'));
});

// 注册默认任务
gulp.task('default', []);
