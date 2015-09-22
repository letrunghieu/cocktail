var assert = require('assert');
var path = require('path');

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
});