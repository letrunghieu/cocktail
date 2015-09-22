var gulp = require('gulp');
var fs = require('fs');
var path = require('path');

var Cocktail = function () {
	this.mixers = {};

	this.defaultMixer = require('./mixers/default')(this);

	this.mix = function (source, build) {

	};

	this.listFiles = function (dir) {

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
