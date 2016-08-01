
class Workspace {

}

class AudioModule {
  constructor(context) {
    this.node = {};
    this.inputs = [];
    this.outputs = [];
  }
}

class OscillatorModule {
  constructor(context) {
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

function connect(tx, rx) {
  tx.port.connect(rx.port);
}

module.exports.OscillatorModule = OscillatorModule;
module.exports.AmplifierModule = AmplifierModule;
module.exports.SinkModule = SinkModule;
module.exports.connect = connect;
