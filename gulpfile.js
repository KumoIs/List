//引入模块
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');//压缩HTML写法
var uglify = require('gulp-uglify');//压缩JS写法
var babel = require('gulp-babel');//将ES6转换为ES5：gulp-babel 主要是在JS任务中修改
var connect = require('gulp-connect');//开始服务器的代码
var sass = require('gulp-sass');//压缩sass写法
var cleanCss = require('gulp-clean-css');//压缩CSS写法


//定制任务
//'defualt'任务名 在控制面板启动时需要用到的
//列如 gulp default 或者是下面css的就是 gulp css
gulp.task('default',function(){
	console.log('gulp启动成功');
})

//编译sass
//压缩CSS
gulp.task('css',function(){
	//抓取index.css文件路径
	//  /**列如指的是CSS文件夹下的所有文件(包括文件夹里) /*所有的文件
	gulp.src('src/scss/**/*.scss')
		//pipe管道 沿着管道到cleanCss()把代码压缩到下面
		.pipe(sass())
		.pipe(cleanCss())
		//在通过管道保存到dest目的地
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
})

//但环境搭建好以后需要两个文件夹 代码需要卸载src 而以后成品就是dist 
//项目上线的时候则dist以外的文件则都不需要了

gulp.task('html',function(){
	//抓取index.html文件路径
	gulp.src('src/**/*.html')
	//pipe管道 沿着管道到htmlmin()把代码压缩到下面
		.pipe(htmlmin({
			removeComments: true,//清除HTML注释
               collapseWhitespace: true,//压缩HTML
               collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
               removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
               removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
               removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
               minifyJS: true,//压缩页面JS
               minifyCSS: true//压缩页面CSS 
		}))
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload())
})

gulp.task('js',function(){
	//抓取index.js文件路径
	gulp.src('src/js/**/*.js')
	//因为上面引入了 babel 主要用法是 把ES6的语法准换成ES5
	//如果不写的话 在管道沿线uglify()时候压缩代码时 会报错
		.pipe(babel({
			//预设值
			presets:['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload())
})

	//server 服务器任务
gulp.task('server',function(){
	//开启服务器 方法()开启服务器
	connect.server({
		//端口号
		port:9527,
		//表示如果代码更改了那么服务器会自动刷新
		livereload:true,
		//打开时默认路径
		root:'dist'
	})
})

//监听文件的变化执行对应的任务
//每次改动保存代码时 自动执行刷新页面 connect.reload();
gulp.task('watch',function(){
	gulp.watch('src/**/*.html',['html']);
	gulp.watch('src/scss/**/*.scss',['css']);
	gulp.watch('src/js/**/*.js',['js']);
})

gulp.task('static',()=>{
	gulp.src('src/static/**/*')
		.pipe(gulp.dest('dist/static'))
		.pipe(connect.reload());
})

gulp.task("libs", () => {
	gulp.src("src/libs/**/*")
		.pipe(gulp.dest("dist/libs"))
		.pipe(connect.reload())
})


gulp.task('img',function(){
	gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/images'))
		.pipe(connect.reload());
})

gulp.task('default',['css','html','js','server','watch','img',
'static','libs']);