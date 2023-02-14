var gulp = require('gulp');
var concat =     require('gulp-concat');
var size =       require('gulp-size');
var replace =   require("gulp-replace");
var autoprefix = require('gulp-autoprefixer');
const INPUT = "src/";
const OUTPUT = "build/src/";

var targets_core = [
  "Utente",
  "ConnectDb"
];

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

function _buildWorker(isDebug) {
	var stream = null;
	var selector = _merge("src/wrk/", workers, ".js");

	for (var i = 0; i < selector.length; i++) {
		// path e nome di output
		var workerFile = selector[i];
		console.log(workerFile);
		var workerName = workers[i];
		var outName = ((isDebug) ? workerName : (workerName + '.min')) + ".js";
		console.log(outName);
		var out = DST + "/js/wrk/";
		console.log(out);
		stream = gulp.src(workerFile);

		// replace delle entry di libreria
		stream = _replace(stream, _getReplacement());
		// replace delle entry di stile
		stream = _replace(stream, skins[CURRENT_SKIN]);

		// direttive di output
		stream = stream.pipe(
			concat(outName)
		);

		// direttive di output
		if (!isDebug) {
			stream = stream.pipe(
				uglify()
			);
		}

		stream = stream.pipe(
			gulp.dest(out)
		);

		_log("Creato worker di libreria " + outName);
	}

	return stream;
};
//-----------------------------------------------------------------------------------------------------------------------------------------