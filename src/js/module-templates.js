exports.oscillator = function(ctx) {
  this.displayName = "Osc";
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
