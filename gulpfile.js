'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

var path = {
    build: {
        css: 'css/',
    },
    src: {
        html: '*.html',
        css: 'src/css/main.scss',
    },
    watch: {
        html: '*.html',
        css: 'src/css/**/*.scss',
    },
};

gulp.task('webserver', function () {
    var config = {
        server: {
            baseDir: "./"
        },
        host: 'localhost',
        port: 9000,
    };
    browserSync(config);
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(reload({stream: true}));
});

gulp.task('style', function () {
    gulp.src(path.src.css)
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'expanded',
            errLogToConsole: true
        }))
        .pipe(prefixer({ browsers: ['> 1%', 'IE 10']}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('style');
    });
});

gulp.task('default', ['style', 'webserver', 'watch']);