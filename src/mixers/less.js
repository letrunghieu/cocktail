var fs = require('fs');

var LessMixer = function (cocktail) {
    this.getOutputExt = function () {
        return '.css';
    };
    
    this.mix = function (input, output) {
        console.log(input, output);
    }
}

module.exports = function (cocktail) {
    var mixer = new LessMixer(cocktail);
    
    cocktail.registerMixer('.less', mixer);
    
    return mixer;
}