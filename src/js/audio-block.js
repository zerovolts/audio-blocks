var html = require('./json-html');

class AudioPort {
  constructor() {
  }
}

class AudioBlock {
  constructor(name, position) {
    this.displayName = name;
    this.position = position;
    this.inputs = [{name: 'signal', connections: []}, {name: 'cv', connections: []}];
    this.outputs = [];
  }

  render() {
    return html(
      [ 'g',
        {},
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
        this.inputs.map((port, index) =>
          [ 'circle',
            { class: 'audio-port',
              cx: this.position.x + 12,
              cy: this.position.y + 36 + (index * 24)}]
        ),
    ]);
  }
}

module.exports.AudioBlock = AudioBlock;
