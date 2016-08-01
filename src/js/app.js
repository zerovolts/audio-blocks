var block = require('./audio-block');
var mod = require('./audio-modules/audio-module.js');

document.getElementById('workspace').setAttribute("width", window.innerWidth);
document.getElementById('workspace').setAttribute("height", window.innerHeight);

var repl = {};
repl.ctx = new AudioContext();
repl.osc = new mod.OscillatorModule(repl.ctx);
repl.amp = new mod.AmplifierModule(repl.ctx);
repl.sink = new mod.SinkModule(repl.ctx);

repl.osc.inputs.frequency.port.value = 220;
repl.amp.inputs.gain.port.value = 0.10;
mod.connect(repl.osc.outputs.audio, repl.amp.inputs.audio);
mod.connect(repl.amp.outputs.audio, repl.sink.inputs.audio);

//repl.osc.out.audio.port.start();

var osc = new block.AudioBlock('Oscillator', {x: 20, y: 20}, repl.ctx, mod.OscillatorModule);
var amp = new block.AudioBlock('Amplifier', {x: 200, y: 20}, repl.ctx, mod.AmplifierModule);
var sink = new block.AudioBlock('Sink', {x: 380, y: 20}, repl.ctx, mod.SinkModule);

document.getElementById('workspace').innerHTML += osc.render();
document.getElementById('workspace').innerHTML += amp.render();
document.getElementById('workspace').innerHTML += sink.render();

// Accessing objects from the browser
window.repl = modules;
