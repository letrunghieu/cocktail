var gulp = require('gulp');
var stream = require('lazypipe');

var DefaultMixer = function (cocktail) {
    
    this.getStream = function () {
        
        return false;

    };
    
    this.name = 'default';
}

module.exports = function (cocktail) {
    return new DefaultMixer(cocktail);
}