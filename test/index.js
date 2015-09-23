var assert = require('assert');
var path = require('path');
var expect = require('chai').expect;
var given = require('mocha-testdata');

describe('Cocktail', function () {
    describe('#getOutputFile(ourceDir, file, buildDir)', function () {
        var cocktail = require('./../src/index');
        
        it('should return correct destination file', function () {
            assert.equal(path.resolve('/out/bar.png'), cocktail.getOutputFile('/in', '/in/bar.png', '/out'));
            assert.equal(path.resolve('/out/foo/bar.png'), cocktail.getOutputFile('/in', '/in/foo/bar.png', '/out'));
            // sass
            assert.equal(path.resolve('/out/bar.css'), cocktail.getOutputFile('/in', '/in/bar.sass', '/out'));
            assert.equal(path.resolve('/out/bar.css'), cocktail.getOutputFile('/in', '/in/bar.scss', '/out'));
            // less
            assert.equal(path.resolve('/out/bar.css'), cocktail.getOutputFile('/in', '/in/bar.less', '/out'));
            // coffee
            assert.equal(path.resolve('/out/bar.js'), cocktail.getOutputFile('/in', '/in/bar.coffee', '/out'));
            // sprocket
            assert.equal(path.resolve('/out/bar.css'), cocktail.getOutputFile('/in', '/in/bar.css', '/out'));
            assert.equal(path.resolve('/out/bar.js'), cocktail.getOutputFile('/in', '/in/bar.js', '/out'));
        });
    });
    
    describe('#listFiles(dir)', function () {
        var cocktail = require('./../src/index');
        
        it('should return the correct array', function () {
            var files = cocktail.listFiles('./test/assets/resources');
            
            expect(files).to.include(path.resolve('./test/assets/resources/sass/app.scss'));
            expect(files).to.include(path.resolve('./test/assets/resources/less/app.less'));
            expect(files).to.include(path.resolve('./test/assets/resources/css/app.css'));
            expect(files).to.include(path.resolve('./test/assets/resources/js/app.js'));
            expect(files).to.include(path.resolve('./test/assets/resources/coffee/app.coffee'));
            expect(files).to.include(path.resolve('./test/assets/resources/txt/copy.txt'));
        });
        
        it('should not include files whose name begins with an underscore or a dot', function () {
            var files = cocktail.listFiles('./test/assets/resources');
            
            expect(files).to.not.include(path.resolve('./test/assets/resources/txt/_not_copy.coffee'));
            expect(files).to.not.include(path.resolve('./test/assets/resources/txt/.not_copy.coffee'));

        });
    });
    
    describe('#getMixer(ext)', function () {
        var cocktail = require('./../src/index');
        
        given(
            ['', 'default'],
            ['.scss', 'sass'],
            ['.sass', 'sass'],
            ['.css', 'sprocket'],
            ['.js', 'sprocket'],
            ['.coffee', 'coffee'],
        ).it('should return correct mixer for extension', function (ext, mixerName) {
            var mixer = cocktail.getMixer(ext);
            expect(mixer.name).to.equals(mixerName);
        });
    });
}); 