var AudioPort = require('./port').AudioPort;

exports.AudioBlock = {
  controller: function(block, mouseX, mouseY, addWirePort) {
    return {
      block: block,
      focus: m.prop(false),
      clicked: m.prop(false),
      raise: m.prop(8),
      clickX: m.prop(0),
      clickY: m.prop(0),
      mouseX: mouseX,
      mouseY: mouseY,
      addWirePort: addWirePort,
    };
  },

  view: function(ctrl) {
    var block = ctrl.block;
    if (ctrl.focus()) {
      const tempX = ctrl.mouseX() - ctrl.clickX();
      const tempY = ctrl.mouseY() - ctrl.clickY();
      block.position = {
        x: tempX - (tempX % 16),
        y: tempY - (tempY % 16),
      };
    }
    return m('svg', {
        onclick: event => event.stopPropagation(),
      },[
      Object.keys(block.inputs).map((name, index) => m.component(AudioPort, {port: {name: name, input: true}, block: block, raise: ctrl.raise, addWirePort: ctrl.addWirePort, index: index})),
      Object.keys(block.outputs).map((name, index) => m.component(AudioPort, {port: {name: name, input: false}, block: block, raise: ctrl.raise, addWirePort: ctrl.addWirePort, index: index})),

      m('rect',
        { class: 'audio-block-shadow',
          x: block.position.x,
          y: block.position.y}),
      m('rect',
        { class: 'audio-block',
          x: block.position.x,
          y: block.position.y - ctrl.raise(),//+ (ctrl.clicked() ? 8 : 0),
          onmousedown: () => {ctrl.clicked(true); ctrl.raise(0)},
          onmouseup: () => {ctrl.clicked(false); ctrl.raise(8)},
          onclick: () => console.log(ctrl.displayName)}),
      m('g', {
        onclick: event => event.stopPropagation(),
        onmousedown: event => {ctrl.focus(true); ctrl.clickX(event.clientX - block.position.x); ctrl.clickY(event.clientY - block.position.y);},
        onmouseup: event => {ctrl.focus(false); ctrl.clickX(0); ctrl.clickX(0);},
        //onmousemove: event => {if (ctrl.focus()) {block.position.x = event.clientX - ctrl.clickX(); block.position.y = event.clientY - ctrl.clickY()}},
      }, [
        m('rect',
          { x: block.position.x + 16,
            y: block.position.y + 4 - ctrl.raise(),
            width: 96,
            height: 24,
            fill: '#333',
            rx: 6,
            ry: 6,}),
        m('text',
          { x: block.position.x + 64,
            y: block.position.y + 20 - ctrl.raise(),
            'text-anchor': 'middle',
            'user-select': 'none',
            fill: '#eee'},
          block.displayName
        ),
      ]),
    ])
  },
}
