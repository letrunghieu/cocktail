var fs = require('fs');

var CoffeeMixer = function (cocktail) {
	this.getOutputExt = function () {
		return '.js';
	};

	this.mix = function (input, output) {
		console.log(input, output);
	}
}

module.exports = function (cocktail) {
	var mixer = new CoffeeMixer(cocktail);

	cocktail.registerMixer('.coffee', mixer);

	return mixer;
}