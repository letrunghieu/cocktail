var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var include = require('gulp-include');
var _if = require('gulp-if');
var _sourcemaps = require('gulp-sourcemaps');
var _uglify = require('gulp-uglify');

var CoffeeMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.js';
    };
    
    this.mix = function (input, output) {
        
        var config = cocktail.config;
        var options = cocktail.config.js.coffee.pluginOptions;

        gulp.src(input)
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.init()))
        .pipe(include({ extensions: "coffee" }))
        .pipe(coffee(options).on('error', gutil.log))
        .pipe(_if(config.production, _uglify()))
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.write('.')))
        .pipe(gulp.dest(output));
    }
    
    this.name = 'coffee';
}

module.exports = function (cocktail) {
    var mixer = new CoffeeMixer(cocktail);
    
    cocktail.registerMixer('.coffee', mixer);
    
    return mixer;
}