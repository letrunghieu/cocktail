var gulp = require('gulp');
var include = require('gulp-include');
var path = require('path');
var _if = require('gulp-if');
var _sourcemaps = require('gulp-sourcemaps');
var _autoprefixer = require('gulp-autoprefixer');
var _minifyCss = require('gulp-minify-css');
var _uglify = require('gulp-uglify');

var SprocketMixer = function (cocktail) {
    this.getOutputExt = function () {
        return false;
    };
    
    this.mix = function (input, output) {
        
        var config = cocktail.config;
        
        var ext = path.extname(input).substr(1);
        
        gulp.src(input)
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.init()))
        .pipe(include())
        .pipe(_if(ext === 'css' && config.css.autoprefix.enabled, _autoprefixer(config.css.autoprefix.options)))
        .pipe(_if(ext === 'css' && config.production, _minifyCss()))
        .pipe(_if(ext === 'js' && config.production, _uglify()))
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.write('.')))
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