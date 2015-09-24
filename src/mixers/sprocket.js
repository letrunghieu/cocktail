var gulp = require('gulp');
var include = require('gulp-include');
var path = require('path');
var stream = require('lazypipe');

var SprocketMixer = function (cocktail) {
    var self = this;
    
    this.getStream = function () {
        
        var config = cocktail.config;
        var $ = cocktail.plugins;
        
        var s = stream().pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.init()); })
            .pipe(include)
            .pipe(function () { return $.if(self.willAuthPrefix, $.autoprefixer(config.css.autoprefix.options)); })
            .pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.write('.')); })
            .pipe(function () { return $.if(self.willMinifyCss, $.minifyCss()); })
            .pipe(function () { return $.if(self.willUglifyJs, $.uglify()); });
        
        return s();
    };
    
    this.name = 'sprocket';

    this.isAsset = true;

    this.willAuthPrefix = function (file) {
        return path.extname(file.path) === '.css' && cocktail.config.css.autoprefix.enabled;
    }

    this.willMinifyCss = function (file) {
        return path.extname(file.path) === '.css' && cocktail.config.production;
    }

    this.willUglifyJs = function (file) {
        return path.extname(file.path) === '.js' && cocktail.config.production;
    }
}

module.exports = function (cocktail) {
    var mixer = new SprocketMixer(cocktail);
    
    cocktail.registerMixer('.css', mixer);
    cocktail.registerMixer('.js', mixer);
    
    return mixer;
}