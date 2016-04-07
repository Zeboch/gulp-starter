/*=============================================
=            Gulp Starter by @dope            =
=============================================*/

/**
*
* The packages we are using
* Not using gulp-load-plugins as it is nice to see whats here.
*
**/
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');
var del          = require('del');

/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Autoprefixer
*
**/
gulp.task('sass', function() {
  gulp.src('src/sass/**/*.sass')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(plumber())
  .pipe(gulp.dest('dist/css'));
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync', function() {
  browserSync.init(['dist/css/*.css', 'dist/js/**/*.js', 'dist/index.html'], {
    server: {
      baseDir: './dist'
    }
  });
});

/**
 * Clean
 * - dist/js directory
 * - dist/css directory
 * - dist/images directory
 * - finally dist directory
**/
gulp.task('clean', function() {
  del(['dist/js', 'dist/css', 'dist/images', 'dist'], {force: true})
      .then( function(paths ) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
      });
});

/**
 * HTML
 * - copy index.html into dist directory
**/
gulp.task('html', function() {
  gulp.src('index.html')
  .pipe(gulp.dest('dist'));
});

/**
*
* Javascript
* - Uglify
*
**/
gulp.task('scripts', function() {
  gulp.src('src/js/*.js')
  .pipe(uglify())
  .pipe(rename({
    suffix: ".min"
  }))
  .pipe(gulp.dest('dist/js'))
});

/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('src/images/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('dist/images'));
});


/**
*
* Default task
* - Clean dist directory
* - Runs sass, browser-sync, scripts and image tasks
* - Watchs for file changes for images, scripts and sass/css
*
**/
gulp.task('default', ['clean', 'sass', 'browser-sync', 'scripts', 'images', 'html'], function () {
  gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('images/*', ['images']);
});
