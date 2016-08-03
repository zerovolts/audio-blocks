class AudioModule {
  constructor(template, ctx) {
    this.data = new template(ctx);
    this.displayName = this.data.displayName || "";
    this.position = {x: 0, y: 0};
    this.node = this.data.node || undefined;
    this.inputs = this.data.inputs || [];
    this.outputs = this.data.outputs || [];
  }
}

/*
class OscillatorModule {
  constructor(context) {
    this.displayName = "Oscillator";
    this.position = {x: 0, y: 0};
    this.node = context.createOscillator();
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
}

class AmplifierModule {
  constructor(context) {
    this.displayName = "Amplifier";
    this.position = {x: 0, y: 0};
    this.node = context.createGain();
    this.inputs = {
      gain: {
        port: this.node.gain,
        links: [],
      },
      audio: {
        port: this.node,
        links: [],
      },
    }
    this.outputs = {
      audio: {
        port: this.node,
      },
    }
  }
}

class SinkModule {
  constructor(context) {
    this.displayName = "Sink";
    this.position = {x: 0, y: 0};
    this.node = context.destination;
    this.inputs = {
      audio: {
        port: this.node,
        links: [],
      },
    };
    this.outputs = {};
  }
}
*/

function connect(tx, rx) {
  tx.port.connect(rx.port);
}

exports.AudioModule = AudioModule;
exports.connect = connect;
