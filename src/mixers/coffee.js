var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var include = require('gulp-include');

var CoffeeMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.js';
    };
    
    this.mix = function (input, output) {
        gulp.src(input)
        .pipe(include({ extensions: "coffee" }))
        .pipe(coffee({ bare: true }).on('error', gutil.log))
        .pipe(gulp.dest(output));
    }
    
    this.name = 'coffee';
}

module.exports = function (cocktail) {
    var mixer = new CoffeeMixer(cocktail);
    
    cocktail.registerMixer('.coffee', mixer);
    
    return mixer;
}