var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var ls = require('fs-readdir-recursive');

var Cocktail = function () {
    this.mixers = {};
    
    this.defaultMixer = require('./mixers/default')(this);
    
    this.mix = function (source, build) {

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
    
    this.getOutputFile = function (sourceDir, file, buildDir) {
        var ext = path.extname(file);
        var filename = path.basename(file, ext);
        var filedir = path.dirname(file);
        
        var outputExt = this.getMixer(ext).getOutputExt();
        if (!outputExt) {
            outputExt = ext;
        }
        
        return path.resolve(buildDir, path.relative(sourceDir, filedir), (filename + outputExt));
    }
}

var cocktail = new Cocktail();

require('./mixers/sass')(cocktail);
require('./mixers/less')(cocktail);
require('./mixers/coffee')(cocktail);

module.exports = cocktail;
