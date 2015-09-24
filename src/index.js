var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var ls = require('fs-readdir-recursive');
var _ = require('lodash');
var gutil = require('gulp-util');
var del = require('del');
var through = require('through2');
var duplex = require('duplexer2');
var pedding = require('pedding');

var Cocktail = function () {
    
    var cocktail = this;
    
    this.objStream = through.obj();
    
    this.mixers = {};
    
    this.config = require('./Config');
    
    this.plugins = require('gulp-load-plugins')();
    
    this.defaultMixer = require('./mixers/default')(this);
    
    this.mix = function (source, build) {
        var files = this.listFiles(source);
        
        var $ = this.plugins;
        
        gutil.log("Clearing folder", gutil.colors.magenta(build), "...");
        del.sync(build + "/**/*");
        
        
        gutil.log("Mixing cocktail ...");
        
        return gulp.src(files, { base: source })
                .pipe($.plumber())
                .pipe($.data(cocktail.attachMixer))
                .pipe(cocktail.mixFile())
                .pipe($.if(cocktail.isAssetFile, $.rev()))
                .pipe(gulp.dest(build))
                .pipe($.rev.manifest())
                .pipe(gulp.dest(build));
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
    
    this.isAssetFile = function (file) {
        if (typeof file.data == "undefined" || typeof file.data.mixer == "undefined") {
            return false;
        }
        return file.data.mixer.isAsset || false;
    };
    
    this.mixFile = function () {
        
        var streams = {};
        var outputStream = through.obj();
        var numStreams = 0;
        
        _.forIn(cocktail.mixers, function (mixer, ext) {
            var stream = mixer.getStream();
            
            if (!!stream) {
                streams[ext] = stream;
                numStreams++;
            }
        });
        
        // stream end when all read ends
        var end = pedding(numStreams + 1, function () {
            outputStream.end();
        });
        
        _.forEach(streams, function (stream) {
            stream.pipe(outputStream, { end: false });
            stream.on('end', end);
        });
        
        
        var inputStream = through.obj(function (file, encoding, callback) {
            
            var ext = path.extname(file.path);
            
            if (_.has(streams, ext)) {
                streams[ext].write(file);
                return callback();
            }
            
            this.push(file);
            return callback();
        }, function (cb) {
            _.forEach(streams, function (stream) {
                stream.end();
            });
            end();
            cb();
        });
        
        inputStream.pipe(outputStream, { end: false });
        
        return duplex({ objectMode: true }, inputStream, outputStream);
    }
    
    this.attachMixer = function (file) {
        var ext = path.extname(file.path);
        return { mixer: cocktail.getMixer(ext) };
    };
}

var cocktail = new Cocktail();

require('./mixers/sass')(cocktail);
require('./mixers/less')(cocktail);
require('./mixers/coffee')(cocktail);
require('./mixers/sprocket')(cocktail);

module.exports = function (source, build) {
    if (typeof source == 'undefined' || typeof build == 'undefined') {
        return cocktail;
    }
    
    return cocktail.mix(source, build);
};
