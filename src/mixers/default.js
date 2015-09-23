var fs = require('fs');
var gulp = require('gulp');
var path = require('path');

var DefaultMixer = function (cocktail) {
    this.getOutputExt = function () {
        return false;
    };
    
    this.mix = function (input, output) {
        gulp.src(input)
        .pipe(gulp.dest(path.dirname(output)));
    }

    this.name = 'default';
}

module.exports = function (cocktail) {
    return new DefaultMixer(cocktail);
}