var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var minCss = require('gulp-clean-css');

gulp.task('scss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true
        }))
})

gulp.task('uglify', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/lib'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('scss'));
    gulp.watch(['./src/js/*.js', '!./src/js/lib/*.js'], gulp.series('uglify'));
})

gulp.task('default', gulp.series('scss', 'uglify', 'server', 'watch'));