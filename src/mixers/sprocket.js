var gulp = require('gulp');
var include = require('gulp-include');
var path = require('path');

var SprocketMixer = function (cocktail) {
    this.getOutputExt = function () {
        return false;
    };
    
    this.mix = function (input, output) {
        var ext = path.extname(input).substr(1);
        gulp.src(input)
        .pipe(include())
        .pipe(gulp.dest(output));
    }

    this.name = 'sprocket';
}

module.exports = function (cocktail) {
    var mixer = new SprocketMixer(cocktail);
    
    cocktail.registerMixer('.css', mixer);
    cocktail.registerMixer('.js', mixer);
    
    return mixer;
}