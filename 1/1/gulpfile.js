var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    csso = require('gulp-csso'),
    del = require('del');


gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
    })
})


//['clean'],

gulp.task('scripts', function () {
    return gulp.src('app/css/*.css')
        .pipe(concat('all.css'))

        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});



gulp.task('csso', function () {
    return gulp.src('dist/css/all.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css/min'));
});



gulp.task('watch', ['browserSync', 'scripts'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/css/**/*.css', ['scripts']);
    gulp.watch('dist/css/all.css', ['csso']);
})


gulp.task('clean', function () {
    return del.sync('dist/css'); // Удаляем папку dist перед сборкой
});
