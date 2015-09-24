var gulp = require('gulp');
var cocktail = require('./src/index.js');

gulp.task('default', function () {
    var source = 'test/assets/resources';
    var build = 'test/assets/output';
    
    cocktail().config.versioning = true;
    
    return cocktail(source, build);
});

gulp.task('test', function () {
    var sourcemaps = require('gulp-sourcemaps');
    var through = require('through2');
    var duplex = require('duplexer2');
    var s = require('lazypipe')().pipe(sourcemaps.init)
    .pipe(require('gulp-sass'))
    .pipe(sourcemaps.write, '.');
    
    
    
    var st = s();
    
    var st2 = require('lazypipe')().pipe(require('gulp-debug'), { title: '2' })();
    
    var objStream = through.obj();
    
    st.pipe(objStream);
    st2.pipe(objStream);
    
    //var outputStream = through.obj();
    //st.pipe(outputStream);
    
    
    var f = function () {
        var self = this;
        
        //// output stream
        var outputStream = objStream;
        //st.pipe(outputStream);
        
        
        var inputStream = through.obj(function (file, encoding, callback) {
            
            var ext = require('path').extname(file.path);
            
            console.log(ext);
            if (ext== '.scss') {
                st2.write(file);
            } else {
                st.write(file);
            }
            
            
            //this.push(file);
            
            return callback();
        });
        
        //inputStream.pipe(outputStream);
        
        return duplex({ objectMode: true }, inputStream, outputStream);
    }

    return gulp.src('test/assets/resources/**/*.{scss,sass}')
.pipe(f())
.pipe(require('gulp-debug')())
    .pipe(gulp.dest('test/assets/output'));
});