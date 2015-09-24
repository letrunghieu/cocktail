var gulp = require('gulp');
var less = require('gulp-less');
var stream = require('lazypipe');

var LessMixer = function (cocktail) {
    
    this.getStream = function () {
        
        var config = cocktail.config;
        var options = cocktail.config.css.less.pluginOptions;
        var $ = cocktail.plugins;
        
        var s = stream().pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.init()); })
            .pipe(function () { return less(options); })
            .pipe(function () { return $.if(config.css.autoprefix.enabled, $.autoprefixer(config.css.autoprefix.options)); })
            .pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.write('.')); })
            .pipe(function () { return $.if(config.production, $.minifyCss()) });
        
        return s();
    };
    
    this.name = 'less';
    
    this.isAsset = true;
}

module.exports = function (cocktail) {
    var mixer = new LessMixer(cocktail);
    
    cocktail.registerMixer('.less', mixer);
    
    return mixer;
}