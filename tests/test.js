const tape = require('tape');
const test = require('../src/test');
const rewire = require('rewire');
const script = rewire('../script');
 
tape('test', function (assert) {
		assert.ok(true);    
    assert.equal(test.add(2,3), 5);
		const add = script.__get__('add');
		assert.equal(add(2,3), 5);
		assert.end();
});

