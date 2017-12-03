let gulp = require('gulp');
let LiveServer = require('gulp-live-server');
let browserSync = require('browser-sync');
let browserify = require('browserify');
let source = require('vinyl-source-stream');
let reactify = require('reactify');


gulp.task('live-server', function() {
    var server = new LiveServer('server/main.js');
    server.start();
})

gulp.task('bundle', function() {
    return browserify({
        entries: 'app/main.jsx',
        debug: true,   
    })
    .transform(reactify)
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./.tmp'));
})

gulp.task('serve', ['bundle', 'live-server'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:8080",
        port: 9000
    })    
})