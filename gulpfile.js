const gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    handlebars = require("gulp-handlebars"),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpIf = require('gulp-if'),
    webpackStream = require("webpack-stream"),
    webpack = webpackStream.webpack,
    plumber = require('gulp-plumber'),
    svgstore = require('gulp-svgstore'),
    svg2string = require('gulp-svg2string');

const path = {
    build: {
        css: 'build/css/',
        js: 'build/js/'
    },
    src: {
        html: '*.html',
        htmlTmpl: 'src/templates/*.handlebars',
        css: 'src/css/main.scss',
        js: 'src/js/**/*.js',
        svg: 'src/svg/*.svg',
    },
    watch: {
        html: '*.html',
        htmlTmpl: 'src/templates/*.handlebars',
        css: 'src/css/**/*.scss',
        js: 'src/js/**/*.js',
        svg: 'src/svg/*.svg',
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

gulp.task('templates', function(){
    gulp.src(path.src.htmlTmpl)
        .pipe(handlebars({
            handlebars: require('handlebars')
        }))
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: 'ScheduleApp.templates',
            noRedeclare: true
        }))
        .pipe(concat('templates.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
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

gulp.task('svg', function () {
    return gulp.src(path.src.svg)
        .pipe(svgstore())
        .pipe(svg2string())
        .pipe(gulp.dest(path.build.js));
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
    watch([path.watch.htmlTmpl], function(event, cb) {
        gulp.start('templates');
    });
    watch([path.watch.svg], function(event, cb) {
        gulp.start('svg');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('webpack');
    });
});

gulp.task('default', ['style', 'webserver', 'watch', 'svg', 'templates', 'webpack']);