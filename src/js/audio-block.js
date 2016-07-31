var html = require('./json-html');

class AudioPort {
  constructor() {
  }
}

class AudioBlock {
  constructor(name, position) {
    this.displayName = name;
    this.position = position;
    this.inputs = [
      {name: 'signal', connections: []},
      {name: 'amplitude', connections: []},
      {name: 'frequency', connections: []},
    ];
    this.outputs = [
      {name: 'signal', connections: []},
    ];
  }

  render() {
    return html(
      [ 'g',
        {},
        this.inputs.map((port, index) => [
          [ 'rect',
            { class: 'audio-port-shadow',
              x: this.position.x - 8,
              y: this.position.y + 40 + (index * 24)}],
          [ 'rect',
            { class: 'audio-port',
              x: this.position.x - 8,
              y: this.position.y + 36 + (index * 24)}]
        ]),
        this.outputs.map((port, index) => [
          [ 'rect',
            { class: 'audio-port-shadow',
              x: this.position.x + 120,
              y: this.position.y + 40 + (index * 24)}],
          [ 'rect',
            { class: 'audio-port',
              x: this.position.x + 120,
              y: this.position.y + 36 + (index * 24)}]
        ]),
        [ 'rect',
          { class: 'audio-block-shadow',
            x: this.position.x,
            y: this.position.y + 8,
            width: 128,
            height: 128}],
        [ 'rect',
          { class: 'audio-block',
            x: this.position.x,
            y: this.position.y,
            width: 128,
            height: 128}],
        [ 'text',
          { x: this.position.x + 64,
            y: this.position.y + 20,
            'text-anchor': 'middle',
            fill: '#eee'},
          this.displayName
        ],
    ]);
  }
}

module.exports.AudioBlock = AudioBlock;
