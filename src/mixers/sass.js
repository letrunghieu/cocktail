var gulp = require('gulp');
var sass = require('gulp-sass');
var stream = require('lazypipe');

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
    };
    
    this.getStream = function () {
        
        var config = cocktail.config;
        var options = cocktail.config.css.sass.pluginOptions;
        var $ = cocktail.plugins;
        
        var s = stream().pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.init()); })
            .pipe(function () { return sass(options).on('error', sass.logError); })
            .pipe(function () { return $.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)); })
            .pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.write('.')); })
            .pipe(function () { return $.if(config.production, $.minifyCss()) });

        return s;
    };

    this.name = 'sass';

    this.isAsset = true;
}

module.exports = function (cocktail) {
    var mixer = new SassMixer(cocktail);
    
    cocktail.registerMixer('.scss', mixer);
    cocktail.registerMixer('.sass', mixer);
    
    return mixer;
}