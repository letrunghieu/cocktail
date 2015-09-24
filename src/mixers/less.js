var gulp = require('gulp');
var less = require('gulp-less');
var stream = require('lazypipe');

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
    };
    
    this.getStream = function () {
        
        var config = cocktail.config;
        var options = cocktail.config.css.less.pluginOptions;
        var $ = cocktail.plugins;
        
        var s = stream().pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.init()); })
            .pipe(function () { return less(options); })
            //.pipe(function () { return $.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)); })
            .pipe(function () { return $.sourcemaps.write('.'); })
            .pipe(function () { return $.if(config.production, $.minifyCss()) });
        
        return s;
    };
    
    this.name = 'less';

    this.isAsset = true;
}

module.exports = function (cocktail) {
    var mixer = new LessMixer(cocktail);
    
    cocktail.registerMixer('.less', mixer);
    
    return mixer;
}