var gulp       = require('gulp'),
    livereload = require('gulp-livereload'),
    sass       = require('gulp-sass');

var PATHS = {
        toWatch: ['components/**/*.*','src/**/*.ts','src/**/*.scss','index.html']
    }


gulp.task('clean', function (done) {
    var del = require('del');
    del(['dist'], done);
});

gulp.task('sass', function(){
     return gulp.src('./src/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./css'))
            .pipe(livereload());
})

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    var tscConfig = require('./tsconfig.json');

    var tsResult = gulp
        .src(['src/**/*.ts', 'node_modules/angular2/typings/browser.d.ts'])
        .pipe(typescript(tscConfig.compilerOptions));

    return tsResult
            .js
            .pipe(gulp.dest('./dist'))
            .pipe(livereload());
});

gulp.task('play', ['ts2js'], function () {
    var server = livereload.listen({ basePath: 'dist' });
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 9000, app;

    gulp.watch(PATHS.toWatch, ['ts2js', 'sass']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

gulp.task('default', ['play']);
