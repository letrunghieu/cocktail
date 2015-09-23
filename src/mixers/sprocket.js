var fs = require('fs');

var SprocketMixer = function (cocktail) {
    this.getOutputExt = function () {
        return false;
    };
    
    this.mix = function (input, output) {
        console.log(input, output);
    }
}

module.exports = function (cocktail) {
    var mixer = new SprocketMixer(cocktail);
    
    cocktail.registerMixer('.css', mixer);
    cocktail.registerMixer('.js', mixer);
    
    return mixer;
}