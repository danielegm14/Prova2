var gulp = require('gulp');
gulp.task('build', function(){
  var input  = 'src/**/*.css';
  var output = 'build';
  return gulp.src( input )
   .pipe(gulp.dest( output ));
});