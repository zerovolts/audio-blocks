var html = require('./json-html');

class AudioBlock {
  constructor(name, position) {
    this.displayName = name;
    this.position = position;
    this.inputs = [];
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
          { x: this.position.x + 10,
            y: this.position.y + 25,
            fill: '#eee'},
          this.displayName
        ],
        [ 'rect',
          { class: 'audio-port',
            x: this.position.x - 5,
            y: this.position.y + 30}],
    ]);
  }
}

module.exports.AudioBlock = AudioBlock;
