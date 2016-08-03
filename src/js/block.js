exports.AudioBlock = {
  controller: function(block) {
    return block;
  },

  view: function(ctrl) {
    return m('svg', [
      Object.keys(ctrl.inputs).map((port, index) => [
        m('rect',
          { class: 'audio-port-shadow',
            x: ctrl.position.x - 8,
            y: ctrl.position.y + 40 + (index * 24)}),
        m('rect',
          { class: 'audio-port',
            x: ctrl.position.x - 8,
            y: ctrl.position.y + 36 + (index * 24)}),
      ]),
      Object.keys(ctrl.outputs).map((port, index) => [
        m('rect',
          { class: 'audio-port-shadow',
            x: ctrl.position.x + 120,
            y: ctrl.position.y + 40 + (index * 24)}),
        m('rect',
          { class: 'audio-port',
            x: ctrl.position.x + 120,
            y: ctrl.position.y + 36 + (index * 24),
            onmouseover: () => ctrl.position.x += 5}),
      ]),
      m('rect',
        { class: 'audio-block-shadow',
          x: ctrl.position.x,
          y: ctrl.position.y + 8,
          width: 128,
          height: 128}),
      m('rect',
        { class: 'audio-block',
          x: ctrl.position.x,
          y: ctrl.position.y,
          width: 128,
          height: 128,
          onclick: () => console.log(ctrl.displayName)}),
      m('rect',
        { x: ctrl.position.x + 16,
          y: ctrl.position.y + 4,
          width: 96,
          height: 24,
          fill: '#333',
          rx: 6,
          ry: 6,}),
      m('text',
        { x: ctrl.position.x + 64,
          y: ctrl.position.y + 20,
          'text-anchor': 'middle',
          fill: '#eee'},
        ctrl.displayName
      ),
    ])
  },
}
