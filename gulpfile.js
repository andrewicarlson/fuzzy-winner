var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var assign = require('lodash.assign');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');

var paths = {
  before: './src',
  after: './build',
};

paths.styles = {
  entry: paths.before + '/styles.scss',
  before: paths.before + '/**/*.scss',
  after: paths.after
};

paths.scripts = {
  entry: paths.before + '/index.ts',
  before: paths.before + '/**/*.ts',
  after: paths.after
};

paths.views = {
  before: paths.before + '/**/*.pug',
  after: paths.after
};

paths.images = {
    before: paths.before + '/images/**/*',
    after: paths.after + '/images'
};

paths.server = paths.after;

var customOpts = {
    baseDir: '.',
    entries: [paths.scripts.entry],
    debug: true,
    cache: {},
    packageCache: {}
};

var opts = assign({}, watchify.args, customOpts);

var build = watchify(browserify(opts));

build
  .plugin(tsify)
  .transform(babelify, {

    presets: ['es2015'],
    extensions: ['.ts', '.tsx']
  });

build.on('update', bundle); // on dep update run bundler.
build.on('log', gutil.log); // output build logs to terminal.

function bundle() {

  return build.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('global.js'))
    //.pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest(paths.scripts.after));
}

gulp.task('views', function() {

  return gulp.src(paths.views.before)
    .pipe(pug({
      pretty: true
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.views.after));
});

gulp.task('scripts', bundle);

gulp.task('styles', function() {

  return gulp.src(paths.styles.entry)
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest(paths.styles.after));
});

gulp.task('images', function() {

    return gulp.src(paths.images.before)
        .pipe(gulp.dest(paths.images.after));
});

gulp.task('serve', ['styles', 'scripts', 'views'], function() {

    browserSync.init({

        server: {

            baseDir: paths.server
        }
    });

    gulp.watch(paths.styles.before, ['styles']);
    gulp.watch(paths.views.before, ['views']);
    gulp.watch([
      paths.scripts.after + '/global.js',
      paths.styles.after + '/styles.css',
      paths.views.after + '/*.html'
    ]).on('change', browserSync.reload);
});

gulp.task('build', ['styles', 'views', 'scripts', 'images']);

gulp.task('default', ['build']);
