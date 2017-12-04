let gulp = require('gulp');
let LiveServer = require('gulp-live-server');
let browserSync = require('browser-sync');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let reactify = require('reactify');

let server;

gulp.task('live-server', function() {
    var server = new LiveServer('server/main.js');
    server.start();
})

gulp.task('bundle', ['copy'], function() {
    return browserify({
        entries: 'app/main.jsx',
        debug: true,   
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
})

gulp.task('copy', function() {
    gulp.src(['app/*.css'])
    .pipe(gulp.dest('./.tmp'))
})

gulp.task('serve', ['bundle', 'live-server'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:7777",
        port: 9000
    })    
})