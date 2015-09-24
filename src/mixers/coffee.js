var gulp = require('gulp');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var include = require('gulp-include');
var stream = require('lazypipe');

var CoffeeMixer = function (cocktail) {
    
    this.getStream = function () {
        
        var config = cocktail.config;
        var options = cocktail.config.css.less.pluginOptions;
        var $ = cocktail.plugins;
        
        var s = stream().pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.init()); })
            .pipe(include, { extensions: "coffee" })
            .pipe(function () { return coffee(options).on('error', gutil.log); })
            .pipe(function () { return $.if(!config.production && config.sourcemaps, $.sourcemaps.write('.')); })
            .pipe(function () { return $.if(config.production, $.uglify()); });
        
        return s();
    };
    
    this.name = 'coffee';
    
    this.isAsset = true;
}

module.exports = function (cocktail) {
    var mixer = new CoffeeMixer(cocktail);
    
    cocktail.registerMixer('.coffee', mixer);
    
    return mixer;
}