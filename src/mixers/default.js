var gulp = require('gulp');

var DefaultMixer = function (cocktail) {
    this.getOutputExt = function () {
        return false;
    };
    
    this.mix = function (input, output) {
        gulp.src(input)
        .pipe(gulp.dest(output));
    }

    this.name = 'default';
}

module.exports = function (cocktail) {
    return new DefaultMixer(cocktail);
}