var AudioBlock = require('./block').AudioBlock;
var cAudioBlock = require('./block').cAudioBlock;
var cAudioWire = require('./wire').cAudioWire;
var templates = require('./block-templates');

class AudioWorkspace {
  constructor() {
    this.context = new AudioContext();
    this.blocks = [];
    this.wires = [];
  }

  _gridLock(position) {
    return {
      x: position.x - (position.x % 16),
      y: position.y - (position.y % 16),
    };
  }

  createBlock(template, position) {
    this.blocks.push(new AudioBlock(this.context, template, this._gridLock(position)));
  }

  createWire(source = {x: 0, y: 0}, sink = {x: 0, y: 0}) {
    console.log(source);
    let rel_sink = {x: sink.x - source.x, y: sink.y - source.y};
    let middle = {x: rel_sink.x / 2, y: rel_sink.y / 2};
    let str = 'm ' + source.x + ' ' + source.y +
              ' q ' + 20 + ' ' + 0 + ', ' +
              middle.x + ' ' + middle.y +
              ' t ' + middle.x + ' ' + middle.y;

    //source.port.connect(sink.port);
    this.wires.push({source: source, sink: sink, str: str});
  }
}

const cAudioWorkspace = {
  vm: {
    init: function() {
      const vm = cAudioWorkspace.vm;
      vm.workspace = new AudioWorkspace();

      vm.templates = [templates.oscillator, templates.amplifier, templates.sink];
      vm.activeTemplate = m.prop(templates.oscillator);
      vm.tempPort = m.prop(undefined);

      vm.mouseDown = m.prop(false);
      vm.mousePosition = m.prop({x: 0, y: 0});

      vm.pushPort = function(port) {

        if(vm.tempPort()) {
          vm.workspace.createWire(vm.tempPort(), port);
          //vm.tempPort(undefined);
        } else {
          vm.tempPort(port);
        }
        console.log(vm.tempPort());
      }
    },
  },

  controller: function() {
    const vm = cAudioWorkspace.vm;
    vm.init();

    this.createBlock = function(x, y) {
      vm.workspace.createBlock(vm.activeTemplate(), {x: x, y: y});
    };
  },

  view: function(ctrl) {
    const vm = cAudioWorkspace.vm;

    return m('svg', {
      class: 'grid',
      onclick: event => ctrl.createBlock(vm.mousePosition().x - 64, vm.mousePosition().y - 64),
      onmousedown: () => vm.mouseDown(true),
      onmouseup: () => vm.mouseDown(false),
      onmousemove: event => vm.mousePosition({x: event.clientX, y: event.clientY}),
    }, [
      vm.workspace.blocks.map(block => m.component(cAudioBlock, block, vm.mousePosition, vm.pushPort, vm.mouseDown)),
      vm.workspace.wires.map(wire => m.component(cAudioWire, wire)),
      /*vm.workspace.wires.map(wire => {
        return m('path', {
          d: wire.str,
          'stroke-width': 3,
          stroke: '#eee',
          'fill-opacity': 0,
        });
      }),*/

      m('text', {
        x: 300,
        y: 300,
        fill: '#eee',
      }, vm.tempPort()),

      vm.templates.map((template, index) => {
        return m('g', {
          onclick: () => {vm.activeTemplate(template); event.stopPropagation()},
        }, [
          m('rect', {
            class: "button",
            'stroke-opacity': (vm.activeTemplate().name === template.name) ? 0.8 : 0,
            x: 16,
            y: (index * 48) + 16,
          }),
          m('text', {
            x: 16 + 48,
            y: (index * 48) + 40,
            fill: '#eee',
            'text-anchor': 'middle',
          }, template.name),
        ])
      }),

    ]);
  },
};

exports.cAudioWorkspace = cAudioWorkspace;
