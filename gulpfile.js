var gulp = require('gulp'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  sourcemaps = require('gulp-sourcemaps'),
  browserSync = require('browser-sync');

gulp.task('styles', () => {
  return gulp.src('main.css')
    .pipe(sourcemaps.init())
    .pipe( sass({
      errorLogToConsole: true,
      outputStyle: 'compressed'  
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({ 
      browsers: ['last 2 versions'], 
      cascade: false }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/css'));
});

gulp.task('scripts', () => {
    return gulp.src('main.js').pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/js'));
  });

gulp.task('watch', () => {
    gulp.watch('main.css', gulp.series('styles')),
    gulp.watch('main.js', gulp.series('scripts'))
});

gulp.task('browser-sync', (done) => {
    browserSync.init({
        open: "local",
        watch: true,
        directory: false,
        port: 7777,
        files: [
            './'
        ],
        browser: 'Chrome',
        server: {
          basedir: "./"
        }
    });

  });

gulp.task('default',
    gulp.series(
        gulp.parallel('styles', 'scripts'),
        gulp.parallel('watch', 'browser-sync')
    )
);