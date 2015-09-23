var gulp = require('gulp');
var less = require('gulp-less');

var LessMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        gulp.src(input)
        .pipe(less())
        .pipe(gulp.dest(output))
    }
    
    this.name = 'less';
}

module.exports = function (cocktail) {
    var mixer = new LessMixer(cocktail);
    
    cocktail.registerMixer('.less', mixer);
    
    return mixer;
}