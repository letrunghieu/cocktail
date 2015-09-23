# Asset Cocktail 

An asset building tool for **gulp** that is inspired by Sprocket

[![Build Status](https://travis-ci.org/reecms/cocktail.svg?branch=master)](https://travis-ci.org/reecms/cocktail)
[![Code Climate](https://codeclimate.com/github/reecms/cocktail/badges/gpa.svg)](https://codeclimate.com/github/reecms/cocktail)
[![npm](https://img.shields.io/npm/v/asset-cocktail.svg)](https://www.npmjs.com/package/asset-cocktail)

## Installation

Install package with NPM and add it to your dependencies:

    npm install --save asset-cocktail

## Usage

In your gulp task:

    var cocktail = require('asset-cocktail');

    gulp.task('default', function() {
        var source = 'source';
        var build = 'build';
        
        cocktail(source, build);
    } );

Then when you run your gulp task:

  * All files whose name does not begin with the underscore (`_`) or the dot (`.`) will be processed by the cocktail mixers.
  * The output file will have the same name with the input file, the extension my be changed based on the type of the input one, the new path in build directory mimic the original structure of the source directory.
  * Files with the following extensions will be compiled:
    * `sass` and `scss`: compiled by SASS compiler and the output extension is `css`.
    * `less`: compiled by LESS compiler and the output extension is `css`.
    * `coffee`: compiled by the CoffeeScript compiler and the output extension is `js`.
    * `coffee`, `css`, `js`: processed by Sprocket compiler to **include** other files.
    * everything else is just copied to the destination folder.
  * If gulp is run with the `--production` flags, output stylesheets and scripts will be minified.


## Sprocket compiler

> This is quoted from `gulp-include`

You can use Sprocket `required` and `include` directive to concatenate multiple `css`, `js`, and `coffee` files.

Example directives:

    //=require vendor/jquery.js 
    //=require vendor/**/*.js 
    //=include relative/path/to/file.js 

    /*=include relative/path/to/file.css */

    #=include relative/path/to/file.coffee 

The contents of the referenced file will replace the file.

### `required` vs. `include`

A file that is included with require will only be included if it has not been included before. Files included with include will always be included.
For instance, let's say you want to include jquery.js only once, and before any of your other scripts in the same folder.

    //=require vendor/jquery.js 
    //=require vendor/*.js 

Note: This also works recursively. If for instance, for the example above, if another file in the folder vendor is also including jquery.js with the require-directive it will be ignored.
