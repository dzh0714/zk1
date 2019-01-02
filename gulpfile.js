var gulp = require('gulp');

var server = require('gulp-webserver');

var sass = require('gulp-sass');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var minCss = require('gulp-clean-css');

//开发环境
gulp.task('scss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true
        }))
})

gulp.task('minjs', function() {
    return gulp.src(['./src/js/*.js', '!./src/js/lib/*.js'])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/lib'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('scss'));
    return gulp.watch('./src/js/*.js', gulp.series('minjs'));
})

gulp.task('default', gulp.series('scss', 'minjs', 'server', 'watch'));


//打包环境
gulp.task('bcss', function() {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('bjs', function() {
    return gulp.src('./src/js/lib/all.js')
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('html', function() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dist'))
})

gulp.task('build', gulp.parallel('bcss', 'bjs', 'html'))