'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

gulp.task('sass', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'sass'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);

  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('useref', function () {
  return gulp.src('app/*.html') // scan html's
    .pipe(useref())  // szukaj komentarza build
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify())) // jeśli plik ma rozszerzenie JS to go minifikuj
    .pipe(gulp.dest('dist')) // wyrzuć go w 'dist'
});
