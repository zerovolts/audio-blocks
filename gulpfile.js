var gulp = require('gulp');
var browserify = require('gulp-browserify');
var webserver = require('gulp-webserver');

gulp.task('html', () => {
  return gulp.src('src/css/**/*.css')
    .pipe(gulp.dest('app'));
});

gulp.task('css', () => {
  return gulp.src('src/html/**/*.html')
    .pipe(gulp.dest('app'));
});

gulp.task('js', () => {
  return gulp.src('src/js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('app'));
});

gulp.task('serve', () => {
  return gulp.src('app')
    .pipe(webserver({
      livereload: true,
    }));
});

gulp.task('watch', () => {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('build', ['html', 'css', 'js']);
gulp.task('default', ['build', 'serve', 'watch']);
