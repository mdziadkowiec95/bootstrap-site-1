'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var uncss = require('gulp-uncss');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var gutil = require('gulp-util')
var ftp = require('vinyl-ftp');
var replace = require('gulp-replace');



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
  gulp.watch('app/**/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);

});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

gulp.task('uncss', function () {
  return gulp.src([
    'app/css/app.css'
  ])
    .pipe(uncss({
      html: [
        'app/**/*.html'
      ],
      ignore: [
        /\.fade/,
        /\.collapse/,
        /\.collapsed/,
        /\.fade-out/,
        /\.show/
      ]
    }))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('replace-css-url', function () {
  return gulp.src('dist/css/app.min.css')
    .pipe(replace('../../images/', '../images/'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('useref', function () {
  return gulp.src('app/*.html') // scan html's
    .pipe(useref())  // szukaj komentarza build
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist')) // wyrzuć go w 'dist'
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

/** Configuration **/
var user = process.env.FTP_USER
var password = process.env.FTP_PWD
var host = 'ftp.hrmdrum.vot.pl'
var port = 21
var localFilesGlob = ['dist/**/*']
var remoteFolder = '/domains/michaldziadkowiec.pl/public_html/carfix'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  return ftp.create({
    host: host,
    port: port,
    user: user,
    password: password,
    parallel: 5,
    log: gutil.log,
  })
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function () {
  var conn = getFtpConnection()

  return gulp
    .src(localFilesGlob, { base: './dist', buffer: false })
    .pipe(conn.newer(remoteFolder)) // only upload newer files
    .pipe(conn.dest(remoteFolder))
})

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function () {
  var conn = getFtpConnection()

  gulp.watch(localFilesGlob).on('change', function (event) {
    console.log(
      'Changes detected! Uploading file "' + event.path + '", ' + event.type
    )

    return gulp
      .src([event.path], { base: '.', buffer: false })
      .pipe(conn.newer(remoteFolder)) // only upload newer files
      .pipe(conn.dest(remoteFolder))
  })
});

