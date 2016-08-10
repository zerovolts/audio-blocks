const oscillator = function oscillator(ctx) {
  this.displayName = "Oscillator";
  this.node = ctx.createOscillator();
  this.inputs = {
    frequency: {
      port: this.node.frequency,
      links: [],
    },
    detune: {
      port: this.node.detune,
      links: [],
    },
    type: {
      port: this.node.type,
    },
  };
  this.outputs = {
    audio: {
      port: this.node,
    },
  };
}

const amplifier = function amplifier(ctx) {
  this.displayName = "Amplifier";
  this.position = {x: 0, y: 0};
  this.node = ctx.createGain();
  this.inputs = {
    gain: {
      port: this.node.gain,
      links: [],
    },
    audio: {
      port: this.node,
      links: [],
    },
  };
  this.outputs = {
    audio: {
      port: this.node,
    },
  };
}

const sink = function sink(ctx) {
  this.displayName = "Sink";
  this.position = {x: 0, y: 0};
  this.node = ctx.destination;
  this.inputs = {
    audio: {
      port: this.node,
      links: [],
    },
  };
  this.outputs = {};
}

exports.oscillator = oscillator;
exports.amplifier = amplifier;
exports.sink = sink;
exports.templates = [oscillator, amplifier, sink];
