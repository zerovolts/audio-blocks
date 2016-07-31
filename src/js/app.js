var block = require('./audio-block');

document.getElementById('workspace').setAttribute("width", window.innerWidth);
document.getElementById('workspace').setAttribute("height", window.innerHeight);

var osc = new block.AudioBlock('Oscillator', {x: 20, y: 20});
var fil = new block.AudioBlock('Filter', {x: 200, y: 20});

document.getElementById('workspace').innerHTML += osc.render();
document.getElementById('workspace').innerHTML += fil.render();
