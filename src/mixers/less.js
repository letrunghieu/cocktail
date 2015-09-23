var gulp = require('gulp');
var less = require('gulp-less');
var _if = require('gulp-if');
var _sourcemaps = require('gulp-sourcemaps');
var _autoprefixer = require('gulp-autoprefixer');
var _minifyCss = require('gulp-minify-css');

var LessMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        
        var config = cocktail.config;
        var options = cocktail.config.css.less.pluginOptions;

        gulp.src(input)
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.init()))
        .pipe(less(options))
        .pipe(_if(config.css.autoprefix.enabled, _autoprefixer(config.css.autoprefix.options)))
        .pipe(_if(config.production, _minifyCss()))
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.write('.')))
        .pipe(gulp.dest(output))
    }
    
    this.name = 'less';
}

module.exports = function (cocktail) {
    var mixer = new LessMixer(cocktail);
    
    cocktail.registerMixer('.less', mixer);
    
    return mixer;
}