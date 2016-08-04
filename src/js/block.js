var AudioPort = require('./port').AudioPort;

exports.AudioBlock = {
  controller: function(block) {
    return {
      block: block
    };
  },

  view: function(ctrl) {
    var block = ctrl.block;
    return m('svg', [
      Object.keys(block.inputs).map((name, index) => m.component(AudioPort, {port: {name: name, input: true}, block: block, index: index})),
      Object.keys(block.outputs).map((name, index) => m.component(AudioPort, {port: {name: name, input: false}, block: block, index: index})),

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
          onclick: () => console.log(ctrl.displayName)}),
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
  },
}
