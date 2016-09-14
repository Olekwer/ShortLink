/**
 * Created by Oleg on 13.09.2016.
 */
var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    

gulp.task('mytask',function(){
    return gulp.src('public/sass/main.sass')
        .pipe(sass())
        .pipe(gulp.dest('public/css'))
});

