var fs = require('fs');

var SassMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        console.log(input, output);
    }

    this.name = 'sass';
}

module.exports = function (cocktail) {
    var mixer = new SassMixer(cocktail);
    
    cocktail.registerMixer('.scss', mixer);
    cocktail.registerMixer('.sass', mixer);
    
    return mixer;
}