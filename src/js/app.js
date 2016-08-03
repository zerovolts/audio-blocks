var block = require('./audio-block');
var mod = require('./audio-modules/audio-module');
var html = require('./json-html');

document.getElementById('workspace').setAttribute("width", window.innerWidth);
document.getElementById('workspace').setAttribute("height", window.innerHeight);

// VUE JS

function wire(start, abs_end) {
  var end = {x: abs_end.x - start.x, y: abs_end.y - start.y};
  var middle = {x: end.x / 2, y: end.y / 2};
  var str = 'm ' + start.x + ' ' + start.y +
            ' q ' + 20 + ' ' + 0 + ', ' +
            middle.x + ' ' + middle.y +
            ' t ' + middle.x + ' ' + middle.y;
  return html(
    [ 'path',
      { d: str,
        'stroke-width': 3,
        stroke: '#eee',
        'fill-opacity': 0,}]
  );
}

//document.getElementById('workspace').innerHTML += wire({x: 148, y: 64}, {x: 200, y: 64});
//document.getElementById('workspace').innerHTML += wire({x: 148, y: 64}, {x: 200, y: 88});
//document.getElementById('workspace').innerHTML += wire({x: 328, y: 64}, {x: 380, y: 64});

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
var workspace = new block.Workspace([osc, amp, sink]);

//document.getElementById('workspace').innerHTML += osc.render();
//document.getElementById('workspace').innerHTML += amp.render();
//document.getElementById('workspace').innerHTML += sink.render();

m.mount(document.getElementById('workspace'), {view: workspace.view.bind(workspace)});

// Accessing objects from the browser
window.repl = mod;
