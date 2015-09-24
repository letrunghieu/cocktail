var p = require('path');
var gutils = require('gulp-util');


/*
 |----------------------------------------------------------------
 | Master Configuration
 |----------------------------------------------------------------
 |
 | This file contains the proper paths and options for each and
 | and every Gulp task that Cocktail wraps up. To override any
 | setting, reference cocktail().config.* from your Gulpfile.
 |
 */

var config = {
    
    /*
     |----------------------------------------------------------------
     | Production Mode
     |----------------------------------------------------------------
     |
     | Cocktail will trigger certain actions, dependent upon this flag.
     | You may "turn on" this mode by triggering "gulp --production".
     | This will enable such things, like CSS and JS minification.
     |
     */

    production: !!gutils.env.production,
    
    /*
     |----------------------------------------------------------------
     | Sourcemaps
     |----------------------------------------------------------------
     |
     | A sourcemap is a JSON mapping, which declares a relationship
     | between a minified file and its original source location.
     | Quite useful for debugging, it's turned on by default.
     |
     */

    sourcemaps: true,
    
    css: {
        
        /*
         |----------------------------------------------------------------
         | CSS3 Autoprefixing
         |----------------------------------------------------------------
         |
         | When working with any form of CSS, Elixir automatically runs
         | your file through a CSS autoprefixer, which automatically
         | adds or removes vendor-specific CSS3 prefixes. Useful!
         |
         */

        autoprefix: {
            enabled: true,
            
            // https://www.npmjs.com/package/gulp-autoprefixer#api
            options: {
                browsers: ['last 2 versions'],
                cascade: false
            }
        },
        
        /*
         |----------------------------------------------------------------
         | Sass Compilation
         |----------------------------------------------------------------
         |
         | Gone are the days of researching how to call Sass on a given
         | folder. Simply run `mix.sass('file.scss')` and you're all
         | set. This object sets the folder name and plugin opts.
         |
         */

        sass: {
            // https://github.com/sass/node-sass#options
            pluginOptions: {
                outputStyle: 'expanded'
            }
        },
        
        /*
         |----------------------------------------------------------------
         | Less Compilation
         |----------------------------------------------------------------
         |
         | Gone are the days of researching how to call Less on a given
         | folder. Simply run `mix.less('file.less')` and you're all
         | set. This object sets the folder name and plugin opts.
         |
         */

        less: {
            // https://github.com/plus3network/gulp-less#options
            pluginOptions: {}
        }
    },
    
    js: {
        coffee: {
            // https://github.com/wearefractal/gulp-coffee#options
            pluginOptions: {}
        }
    },
    
};


module.exports = config;