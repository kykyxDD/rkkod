'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

const webpack  = require('webpack');
const gutil    = require('gulp-util');
const notifier = require('node-notifier');
let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
  colors: true,
  reasons: true
};
gulp.task('scripts', (done) => {
  // run webpack
  webpack(webpackConfig, onComplete);
  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if ( stats.hasErrors() ) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError( stats.toString(statsLog) );
    } else {
      onSuccess( stats.toString(statsLog) );
    }
  }
  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }
  function onSuccess(detailInfo) {
    gutil.log(detailInfo);
    // done();
  }
});

var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: './'
    },
    src: { //Пути откуда брать исходники
        html: ['./template/*.html']
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: [
          './template/*.html',
          './template/path/*.html',
          './template/path/*/*.html']
    },
    clean: './html'
};
gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);  // Watch all the .less files, then run the less task
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('default', ['watch', 'scripts']);