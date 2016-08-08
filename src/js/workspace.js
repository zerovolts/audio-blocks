var AudioModule = require('./module').AudioModule;
var AudioBlock = require('./block').AudioBlock;
var Wire = require('./wire').Wire;
var templates = require('./module-templates');

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
    this.blocks.push(new AudioModule(this.context, template, this._gridLock(position)));
  }

  createWire(source, sink) {
    this.wires.push({source: source, sink: sink});
  }
}

var CAudioWorkspace = {
  vm: {
    init: function() {
      const vm = CAudioWorkspace.vm;
      vm.workspace = new AudioWorkspace();

      vm.templates = [templates.oscillator, templates.amplifier, templates.sink];
      vm.activeTemplate = m.prop(templates.oscillator);
      vm.tempPort = m.prop(undefined);

      vm.mouseDown = m.prop(false);
      vm.mousePosition = m.prop({x: 0, y: 0});

      vm.pushPort = function(port) {
        if(vm.tempPort()) {
          vm.workspace.createWire(vm.tempPort(), port);
          vm.tempPort(undefined);
        } else {
          vm.tempPort(port);
        }
      }
    }
  },

  controller: function() {
    const vm = CAudioWorkspace.vm;
    CAudioWorkspace.vm.init();

    this.createBlock = function(x, y) {
      vm.workspace.createBlock(vm.activeTemplate(), {x: x, y: y});
    };
  },

  view: function(ctrl) {
    const vm = CAudioWorkspace.vm;

    return m('svg', {
      class: 'grid',
      onclick: event => ctrl.createBlock(vm.mousePosition().x - 64, vm.mousePosition().y - 64),
      onmousedown: () => vm.mouseDown(true),
      onmouseup: () => vm.mouseDown(false),
      onmousemove: event => vm.mousePosition({x: event.clientX, y: event.clientY}),
    }, [
      vm.workspace.blocks.map(block => m.component(AudioBlock, block, vm.mousePosition, vm.pushPort, vm.mouseDown)),
      vm.workspace.wires.map(wire => m.component(Wire, wire)),

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

exports.CAudioWorkspace = CAudioWorkspace;
