var gulp = require('gulp');
var sass = require('gulp-sass');
var _if = require('gulp-if');
var _sourcemaps = require('gulp-sourcemaps');
var _autoprefixer = require('gulp-autoprefixer');

var SassMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        
        var config = cocktail.config;
        var options = cocktail.config.css.sass.pluginOptions;
        
        if (config.production) {
            options.outputStyle = 'compressed';
        }

        gulp.src(input)
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.init()))
        .pipe(sass(options).on('error', sass.logError))
        .pipe(_if(config.css.autoprefix.enabled, _autoprefixer(config.css.autoprefix.options)))
        .pipe(_if(!config.production && config.sourcemaps, _sourcemaps.write('.')))
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