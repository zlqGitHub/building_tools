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

// less相关
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');

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

// 编译转换less为css的任务
gulp.task("less", function() {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css/'))
});

// 合并并压缩css文件
// 任务通过return返回，默认情况下是异步的，可以同去电return将其变为同步的，
// 第二个参数可有可无，可以解决任务间的依赖关系，如下：表示先执行less的任务，在执行css任务
gulp.task('css', ['less'], function() {
    return gulp.src('src/css/*.css')
        .pipe(concat('build.css'))
        .pipe(rename({suffix: '.min'}))
        // 压缩合并后的css文件
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'))
});

// 注册默认任务
gulp.task('default', ['js', 'less', 'css']);
