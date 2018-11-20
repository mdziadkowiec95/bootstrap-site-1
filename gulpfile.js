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
var del = require('del');
var runSequence = require('run-sequence');
var rename = require('gulp-rename');
var babel = require('gulp-babel');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
// var extReplace = require('gulp-ext-replace');


// gulp.task('js', () => {
//   gulp.src('./app/js/main.js')
//     .pipe(webpackStream(webpackConfig), webpack)
//     .pipe(gulp.dest('./dist/js'));
// });


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
    .pipe(replace('../../images/', '../images/'))
    .pipe(uncss({
      html: [
        'app/**/*.html'
      ],
      ignore: [/\w\.in/,
        /\.is-visible/,
        ".was-validated",
        /\:valid/,
        /\:invalid/,
        ".fade-out",
        ".flickity-viewport",
        ".flickity-slider",
        ".flickity-enabled",
        ".fade",
        ".is-selected",
        ".collapse",
        ".collapsing",
        /(#|\.)navbar(\-[a-zA-Z]+)?/,
        /(#|\.)dropdown(\-[a-zA-Z]+)?/,
        /(#|\.)(open)/,
        '.bs.carousel',
        '.slid.bs.carousel',
        '.slide.bs.carousel',
        '.fade',
        '.fade.in',
        '.collapse',
        '.collapse.in',
        '.collapsing',
        '.alert-danger',
        '.logged-in .navbar-default',
        /(#|\.)carousel-fade(\-[a-zA-Z]+)?/,
        '.carousel-inner > .next',
        '.carousel-inner > .prev',
        '.carousel-inner > .next',
        '.carousel-inner > .prev',
        '.carousel-inner > .next.left',
        '.carousel-inner > .prev.right',
        '.carousel-inner > .active.left',
        '.carousel-inner > .active.right',
        '#float-toc',
        '#float-toc a',
        '.modal-content',
        '.modal-header',
        '.modal-body',
        '.modal-dialog',
        '.modal.fade.in',
        '.modal-open',
        /(#|\.)modal(\-[a-zA-Z]+)?/,
        '.navbar-toggle.open',
        '.fade .modal-dialog',
        '.navbar-collapse.in',
        '.navbar-fixed-top',
        '.logged-in .navbar-fixed-top',
        '.navbar-collapse',
        '.navbar-collapse.in',
        '.navbar-inverse .innovations.navbar-toggle.open',
        '.single-innovation .navbar-inverse .innovations.navbar-toggle.open',
        '#innovations.collapse.in',
        'ul.page-numbers li a.prev',
        '.open',
        '.open > .dropdown-menu',
        '.open > a',
        '.alert-danger',
        '.visible-xs',
        '.noscript-warning',
        '.close',
        '.alert-dismissible',
        '.page.calendar .events .panel:hover .fa-angle-down.open',
        '.fa-angle-down.open'],
      ignoreSheets: ['scss/vendors/flickity.css']
    }))
    .pipe(gulp.dest('app/css/'));
});

// gulp.task('replace-css-url', function () {
//   return gulp.src('dist/css/app.min.css')
//     .pipe(replace('../../images/', '../images/'))
//     .pipe(gulp.dest('dist/css/'));
// });


gulp.task('minify-js', () =>

  gulp.src('dist/js/main.min.js')
    .pipe(babel({
      presets: [['env', {
        loose: true,
        modules: false,
        exclude: ['transform-es2015-typeof-symbol']
      }]],
      plugins: ['transform-es2015-modules-strip', 'transform-object-rest-spread']
    }))
    // .pipe(concat('bootstrap.js'))
    // .pipe(gulp.dest(out))
    // gulp.src('dist/js/main.min.js')
    //   .pipe(babel({
    //     presets: ['es2015']
    //   }))
    //   .on('error', console.error.bind(console))
    //   // .pipe(uglify().on('error', function (e) {
    //   //   console.log(e);
    //   // }))
    .pipe(gulp.dest('dist/js/'))
);

gulp.task('useref', function () {
  return gulp.src('app/*.html') // scan html's
    .pipe(replace('kontakt.html', 'kontakt.php'))
    .pipe(useref())  // szukaj komentarza build
    // Minifies only if it's a JavaScript file
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

gulp.task('copy', function () {
  return gulp.src('app/contactform.php')
    .pipe(gulp.dest('dist/'))
});

gulp.task('copy-as-php', function () {
  return gulp.src('dist/kontakt.html')
    .pipe(rename('kontakt.php'))
    .pipe(gulp.dest('dist/'))
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 'sass', 'uncss', 'useref', 'minify-js', 'images', 'fonts', 'copy', 'copy-as-php',
    callback
  )
});


// Upload TASK

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
});

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

