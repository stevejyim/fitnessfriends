'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render'); 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('styles', function() {
	gulp.src('./app/assets/sass/main.scss')
	.pipe(sass({
      includePaths: require('node-normalize-scss').includePaths
    }))
	.pipe(autoprefixer())
	.pipe(gulp.dest('./app/assets/css'))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('minify-css', function() {
  return gulp.src('./app/assets/css/main.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./app/assets/dist/'));
});

gulp.task('serve', function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	})

	gulp.watch('./app/assets/sass/partial/*.scss', ['styles']);
	gulp.watch('./app/assets/sass/global/*.scss', ['styles']);
	gulp.watch('./app/*.html').on('change', browserSync.reload);
	gulp.watch('./**/*.html').on('change', browserSync.reload);

});

gulp.task('nunjucks', function() {
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
  .pipe(nunjucksRender({
      path: ['app/templates']
    }))
  .pipe(gulp.dest('app'))
	
});
 
gulp.task('scripts', function() {
  return gulp.src('./app/assets/js/custom/*.js')
    .pipe(concat('main.min.js'))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('./app/assets/dist/'));
});

gulp.task('default', ['styles', 'minify-css','serve','nunjucks','scripts']);







