var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var ls = require('fs-readdir-recursive');
var _ = require('lodash');
var gutil = require('gulp-util');

var Cocktail = function () {
    this.mixers = {};
    
    this.defaultMixer = require('./mixers/default')(this);
    
    this.mix = function (source, build) {
        var files = this.listFiles(source);
        var cocktail = this;
        
        gutil.log("Mixing cocktail ...");

        _.forEach(files, function (file) {
            var ext = path.extname(file);
            var output = cocktail.getOutputPath(source, file, build);
            var mixer = cocktail.getMixer(ext);
            var logicPath = path.relative(source, file);

            cocktail.getMixer(ext).mix(file, output);
            gutil.log(" ", gutil.colors.yellow(mixer.name), logicPath);
        });
    };
    
    this.listFiles = function (dir) {
        var files = ls(dir, function (file) { 
            return file[0] !== '_' && file[0] !== '.';
        }).map(function (f) { 
            return path.resolve(path.join(dir, f));
        });

        return files;
    };
    
    this.registerMixer = function (ext, mixer) {
        this.mixers[ext] = mixer;
    };
    
    this.getMixer = function (ext) {
        if (typeof this.mixers[ext] !== 'undefined') {
            return this.mixers[ext];
        } else {
            return this.defaultMixer;
        }
    };
    
    this.getOutputPath = function (sourceDir, file, buildDir) {
        var filedir = path.dirname(file);
        
        return path.resolve(buildDir, path.relative(sourceDir, filedir));
    }
}

var cocktail = new Cocktail();

require('./mixers/sass')(cocktail);
require('./mixers/less')(cocktail);
require('./mixers/coffee')(cocktail);
require('./mixers/sprocket')(cocktail);

module.exports = cocktail;
