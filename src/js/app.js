var block = require('./audio-block');

var b = new block.AudioBlock('Filter', {x: 5, y: 5});
document.getElementById('blocks').innerHTML = b.render();
