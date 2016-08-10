var cAudioPort = require('./port').cAudioPort;

class AudioBlock {
  constructor(ctx, template, position = {x: 0, y: 0}) {
    this.data = new template(ctx);
    this.displayName = this.data.displayName || "";
    this.position = position;
    this.node = this.data.node;
    this.inputs = this.data.inputs || [];
    this.outputs = this.data.outputs || [];
  }
}

const cAudioBlock = {
  vm: {
    init: function() {
      //const vm = cAudioBlock.vm;
      let vm = {};

      vm.focus = m.prop(false);
      vm.clicked = m.prop(false);
      vm.raise = m.prop(8);
      vm.clickX = m.prop(0);
      vm.clickY = m.prop(0);

      return vm;
    },
  },

  controller: function(block, mousePosition, pushPort, mouseDown) {
    this.vm = cAudioBlock.vm.init();

    this.block = block;
    this.mousePosition = mousePosition;
    this.mouseDown = mouseDown;
    this.pushPort = pushPort;
  },

  view: function(ctrl) {
    const vm = ctrl.vm;

    var block = ctrl.block;
    if(ctrl.mouseDown() === false) {
      vm.focus(false);
    }
    if (vm.focus()) {
      const tempX = ctrl.mousePosition().x - vm.clickX();
      const tempY = ctrl.mousePosition().y - vm.clickY();
      block.position = {
        x: tempX - (tempX % 16),
        y: tempY - (tempY % 16),
      };
    }
    return m('svg', {
        onclick: event => event.stopPropagation(),
      },[
      Object.keys(block.inputs).map((name, index) => m.component(cAudioPort, {port: {name: name, input: true}, block: block, raise: vm.raise, pushPort: ctrl.pushPort, index: index})),
      Object.keys(block.outputs).map((name, index) => m.component(cAudioPort, {port: {name: name, input: false}, block: block, raise: vm.raise, pushPort: ctrl.pushPort, index: index})),

      m('rect',
        { class: 'audio-block-shadow',
          x: block.position.x,
          y: block.position.y}),
      m('rect',
        { class: 'audio-block',
          x: block.position.x,
          y: block.position.y - vm.raise(),//+ (ctrl.clicked() ? 8 : 0),
          onmousedown: () => {vm.clicked(true); vm.raise(0)},
          onmouseup: () => {vm.clicked(false); vm.raise(8)},
          onclick: () => console.log(ctrl.displayName)}),

      // draggable name rectangle
      m('g', {
        onclick: event => event.stopPropagation(),
        onmousedown: event => {vm.focus(true); ctrl.mouseDown(true); vm.clickX(event.clientX - block.position.x); vm.clickY(event.clientY - block.position.y);},
        onmouseup: event => {vm.focus(false); vm.clickX(0); vm.clickX(0);},
        //onmousemove: event => {if (ctrl.focus()) {block.position.x = event.clientX - ctrl.clickX(); block.position.y = event.clientY - ctrl.clickY()}},
      }, [
        m('rect',
          { x: block.position.x + 16,
            y: block.position.y + 4 - vm.raise(),
            width: 96,
            height: 24,
            fill: '#333',
            rx: 6,
            ry: 6,}),
        m('text',
          { x: block.position.x + 64,
            y: block.position.y + 20 - vm.raise(),
            'text-anchor': 'middle',
            'user-select': 'none',
            fill: '#eee'},
          block.displayName
        ),
      ]),
    ])
  },
}

exports.AudioBlock = AudioBlock;
exports.cAudioBlock = cAudioBlock;
