var gulp = require('gulp');

var uglify =     require('gulp-uglify');
var concat =     require('gulp-concat');
// var stripDebug = require('gulp-strip-debug');
var size =       require('gulp-size');
var replace =   require("gulp-replace");
var csso = require('gulp-csso');
var autoprefix = require('gulp-autoprefixer');
const INPUT = "src/";
const OUTPUT = "build/src/";

var targets_core = [
  "Utente",
  "ConnectDb"
];

function _allJs(targets_core) {

	for(var i = 0; i < targets_core.length; i++) {
	return targets_core[i];
	}
	
};

gulp.task("scripts",function() {
  return gulp.src(INPUT + "js/**/*.js")
  .pipe(size())
  .pipe(gulp.dest(OUTPUT + "js"));
});

gulp.task("scriptsAll",function() {
  return _buildLibJs();
});

gulp.task('styles', function() {
  return _buildLibCss();
});

gulp.task("web",function() {
  return _buildLibHtml();
});

gulp.task('build', gulp.series('scripts', 'styles', 'web', "scriptsAll"));

function _merge(prefix, list, suffix) {
	var ret = [];
	for (var i = 0; i < list.length; i++) {
		ret.push((prefix || "")+list[i]+(suffix || ""));
	}
	
	return ret;
};

function _buildLibJs() {
  var stream = null;
  var selector = _merge(INPUT + "js/**/", targets_core, ".js");
  stream = gulp.src(selector)
  .pipe(concat('script-all.js'))
  .pipe(size())
  .pipe(replace('_APP_NAME_SPACE__', 'MyApp'))
  .pipe(gulp.dest(OUTPUT + "js/all"));
  return stream;
}

function _buildLibCss() {
  var stream = null;
  var selector = INPUT + "skin/**/*.css";
  stream = gulp.src(selector)
  .pipe(autoprefix())
  .pipe(concat('style.css'))
  .pipe(size())
  .pipe(replace('_APP_NAME_SPACE__', 'MyApp'))
  .pipe(gulp.dest(OUTPUT + "skin"));
  return stream;
}

function _buildLibHtml() {
  var stream = null;
  var selector = 'www/*.html';
  var OUTPUT = 'build/www';
  stream = gulp.src(selector)
  .pipe(replace('_APP_NAME_SPACE__', 'MyApp'))
  .pipe(gulp.dest( OUTPUT ));
  return stream;
}

//-----------------------------------------------------------------------------------------------------------------------------------------