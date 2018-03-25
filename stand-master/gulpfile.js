var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    csso = require('gulp-csso');


gulp.task('sass', function () {
    return gulp.src('app/sass/*.sass')
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

gulp.task('scripts', function () {
    return gulp.src('app/css/*.css',['!app/css/all.css'])
        .pipe(concat('all.css'))

        .pipe(gulp.dest('app/allcss'))
        .pipe(browserSync.reload({
            stream: true
        }))
});


gulp.task('watch',['browserSync', 'scripts'],  function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/css/**/*.css', ['scripts']);
//    gulp.watch('dist/css/all.css', ['csso']);
})


gulp.task('csso', function () {
    return gulp.src('app/allcss/all.css')
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});