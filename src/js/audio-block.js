var html = require('./json-html');
var mod = require('./audio-modules/audio-module.js');

class Workspace {
  constructor(blocks) {
    this.blocks = blocks;
  }

  view() {
    return this.blocks.map(block => m(block, block));
  }
}

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

  view(ctrl, block) {
    return m('svg', [
      Object.keys(block.module.inputs).map((port, index) => [
        m('rect',
          { class: 'audio-port-shadow',
            x: block.position.x - 8,
            y: block.position.y + 40 + (index * 24)}),
        m('rect',
          { class: 'audio-port',
            x: block.position.x - 8,
            y: block.position.y + 36 + (index * 24)}),
      ]),
      Object.keys(block.module.outputs).map((port, index) => [
        m('rect',
          { class: 'audio-port-shadow',
            x: block.position.x + 120,
            y: block.position.y + 40 + (index * 24)}),
        m('rect',
          { class: 'audio-port',
            x: block.position.x + 120,
            y: block.position.y + 36 + (index * 24),
            onmouseover: () => block.position.x += 5}),
      ]),
      m('rect',
        { class: 'audio-block-shadow',
          x: block.position.x,
          y: block.position.y + 8,
          width: 128,
          height: 128}),
      m('rect',
        { class: 'audio-block',
          x: block.position.x,
          y: block.position.y,
          width: 128,
          height: 128,
          onclick: () => console.log(block.displayName)}),
      m('rect',
        { x: block.position.x + 16,
          y: block.position.y + 4,
          width: 96,
          height: 24,
          fill: '#333',
          rx: 6,
          ry: 6,}),
      m('text',
        { x: block.position.x + 64,
          y: block.position.y + 20,
          'text-anchor': 'middle',
          fill: '#eee'},
        block.displayName
      ),
    ])
  }
}

module.exports.AudioBlock = AudioBlock;
module.exports.Workspace = Workspace;
