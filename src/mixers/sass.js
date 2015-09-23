var fs = require('fs');
var gulp = require('gulp');
var sass = require('gulp-sass');

var SassMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        gulp.src(input)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(output))
    }

    this.name = 'sass';
}

module.exports = function (cocktail) {
    var mixer = new SassMixer(cocktail);
    
    cocktail.registerMixer('.scss', mixer);
    cocktail.registerMixer('.sass', mixer);
    
    return mixer;
}