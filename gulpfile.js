// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inlinesource = require('gulp-inline-source');
var autoprefixer = require('gulp-autoprefixer');
var base64 = require('gulp-base64');

// Compile our JS
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist'));
});

// Compile our Sass
gulp.task('css', function() {
  return gulp.src('src/css/main.scss')
  .pipe(base64({
    baseDir: 'public',
    extensions: ['svg'],
    maxImageSize: 32 * 1024,
    debug: true,
  }))
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false,
  }))
  .pipe(gulp.dest('dist'));
});

gulp.task('inlinesource', ['css', 'js'], function() {
  return gulp.src('src/index.html')
  .pipe(inlinesource())
  .pipe(gulp.dest('./'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/css/main.scss', ['inlinesource']);
  gulp.watch('src/js/*.js', ['inlinesource']);
  gulp.watch('src/index.html', ['inlinesource']);
});

// Exit for Travis
gulp.task('exit', ['css', 'js', 'inlinesource'], function() {
  process.exit(0);
});

// Default Task
gulp.task('default', ['css', 'js', 'watch', 'inlinesource']);

// Test Task
gulp.task('test', ['css', 'js', 'inlinesource', 'exit']);
