const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    webpackStream = require("webpack-stream"),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber');

const path = {
    build: {
        css: 'build/css/',
        js: 'build/js/'
    },
    src: {
        html: '*.html',
        css: 'src/css/main.scss',
        js: 'src/js/**/*.js',
    },
    watch: {
        html: '*.html',
        css: 'src/css/**/*.scss',
        js: 'src/js/**/*.js',
    }
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

gulp.task('webserver', function () {
    let config = {
        server: {
            baseDir: "./"
        },
        host: 'localhost',
        port: 9000
    };
    browserSync(config);
});

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(reload({stream: true}));
});

gulp.task('style', function () {
    gulp.src(path.src.css)
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass({
            includePaths: ['src/style/'],
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(prefixer({ browsers: ['> 1%', 'IE 11']}))
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('webpack', function(){
    let options = {
        context: __dirname + '/src/js',
        entry: {
            main: `./main`
        },
        output: {
            path: __dirname + '/build/js',
            filename: "[name].js"
        },
        watch: isDevelopment,
        devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,
        module:  {
            loaders: [{
                test:    /\.js$/,
                include: __dirname + "/src",
                loader:  'babel?presets[]=es2015'
            }]
        },
        plugins: [
            new webpack.NoErrorsPlugin()
        ]
    };

    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(webpackStream(options, null))
        .pipe(gulpIf(!isDevelopment, uglify()))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('style');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('webpack');
    });
});

gulp.task('default', ['style', 'webserver', 'watch', 'webpack']);