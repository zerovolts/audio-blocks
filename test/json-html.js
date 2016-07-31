var assert = require('chai').assert;
var html = require('../src/js/json-html');

describe('#html()', () => {
  it('should return an empty string when passed an empty array', () => {
    assert.equal('', html([]));
  });

  it('should return the string passed in, if that is the only argument', () => {
    assert.equal('my text', html('my text'));
  });

  it('should return valid open and close html tags when passed an array with one string element', () => {
    assert.equal('<tag></tag>', html(['tag']));
    assert.equal('<tag></tag>', html(['tag', {}]));
    assert.equal('<tag></tag>', html(['tag', {}, []]));
    assert.equal('<tag></tag>', html(['tag', []]));
  });

  it('should return html tags with attributes when passed an array of string and object', () => {
    assert.equal('<tag x="34" y="hello"></tag>', html(['tag', {x: 34, y: 'hello'}]));
    assert.equal('<tag x="34" y="hello"></tag>', html(['tag', {x: 34, y: 'hello'}, []]));
  });

  it('should return the same result when passing an array of elements and adding the individual renders', () => {
    assert.equal(
      html(['div', {}, []]) + html(['p', {}, []]),
      html([['div', {}, []], ['p', {}, []]])
    );
  });

  it('should correctly process nested elements', () => {
    assert.equal(
      html(['div', {}, html(['p', {}, []])]),
      html([['div', {}, ['p', {}, []]]])
    );
  });
});
