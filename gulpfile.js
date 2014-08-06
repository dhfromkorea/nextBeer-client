var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  shell = require('gulp-shell');

var paths = {
  sass: ['./scss/**/*.scss'],
  scripts: [],
  html: [],
  css: []
};

gulp.task('default', ['sass']);

// ios-sim is ios simulator for testing
gulp.task('install', shell.task(['npm install', 'bower install', 'npm install -g ionic cordova ios-sim ios-deploy']));

// for live reload and preview
gulp.task('preview', shell.task(['echo auto-live preview...', 'ionic serve']));

// for testing
gulp.task('test', shell.task(['echo running tests...', 'karma start']));

// run the app before ...
gulp.task('run', shell.task(['echo build, emulate, run your ios app', 'ionic platform ios && ionic build ios && ionic emulate ios && ionic run ios']));

// linting
gulp.task('lint', function () {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(refresh(client));
});


// watch for changes in sass folder
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// and compile into css folder
gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
