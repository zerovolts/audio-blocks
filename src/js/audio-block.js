var html = require('./json-html');
var mod = require('./audio-modules/audio-module.js');

class AudioPort {
  constructor() {
  }
}

class AudioBlock {
  constructor(name, position, context, modtype) {
    this.displayName = name;
    this.position = position;
    this.module = new modtype(context);
  }

  render() {
    return html(
      [ 'g',
        {},
        Object.keys(this.module.inputs).map((port, index) => [
          [ 'rect',
            { class: 'audio-port-shadow',
              x: this.position.x - 8,
              y: this.position.y + 40 + (index * 24)}],
          [ 'rect',
            { class: 'audio-port',
              x: this.position.x - 8,
              y: this.position.y + 36 + (index * 24)}]
        ]),
        Object.keys(this.module.outputs).map((port, index) => [
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
        [ 'rect',
          { x: this.position.x + 16,
            y: this.position.y + 4,
            width: 96,
            height: 24,
            fill: '#333',
            rx: 6,
            ry: 6,}],
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
