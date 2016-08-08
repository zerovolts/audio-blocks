var AudioModule = require('./module').AudioModule;
var AudioBlock = require('./block').AudioBlock;
var Wire = require('./wire').Wire;
var templates = require('./module-templates');

exports.AudioWorkspace = {
  controller: function() {
    this.ctx = new AudioContext();
    this.width = m.prop(window.innerWidth);
    this.height = m.prop(window.innerHeight);
    this.blocks = [];
    this.wires = [];
    this.mouseDown = m.prop(false);
    this.mouseX = m.prop(0);
    this.mouseY = m.prop(0);
    this.currentTemplate = m.prop(templates.oscillator);

    this.sourcePort = m.prop(undefined);

    this.newBlock = function(template, position) {
      const discretePosition = {
        x: position.x - (position.x % 16),
        y: position.y - (position.y % 16),
      }
      this.blocks.push(new AudioModule(this.ctx, template, discretePosition));
    };

    this.changeTemplate = function() {

    }

    this.addWirePort = function(port) {
      console.log(port());
      if(this.sourcePort()) {
        this.newWire(this.sourcePort, port());
        this.sourcePort(undefined);
      } else {
        this.sourcePort(port());
      }
    }.bind(this);

    this.newWire = function(txPort, rxPort) {
      this.wires.push({source: txPort, sink: rxPort});
    };
  },

  view: function(ctrl) {
    return m('svg', {
      class: 'grid',
      onclick: event => {
        ctrl.newBlock(ctrl.currentTemplate(), {
          x: ctrl.mouseX() - 64,
          y: ctrl.mouseY() - 64
        });
      },
      onmousedown: () => ctrl.mouseDown(true),
      onmouseup: () => ctrl.mouseDown(false),
      onmousemove: event => {ctrl.mouseX(event.clientX); ctrl.mouseY(event.clientY)},

      //onmousemove: event => {if (ctrl.mouseDown()) {ctrl.mouseX(event.clientX); ctrl.mouseY(event.clientY)}},
    }, [
      ctrl.blocks.map(block => m.component(AudioBlock, block, ctrl.mouseX, ctrl.mouseY, ctrl.addWirePort, ctrl.mouseDown)),
      ctrl.wires.map(wire => m.component(Wire, wire)),

      [templates.oscillator, templates.amplifier, templates.sink].map((template, index) => {
        return m('g', {
          onclick: () => {ctrl.currentTemplate(template); event.stopPropagation()},
        }, [
          m('rect', {
            class: "button",
            'stroke-opacity': (ctrl.currentTemplate().name === template.name) ? 0.8 : 0,
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
