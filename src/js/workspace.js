var blk = require('./block');
var templates = require('./module-templates');
var mod = require('./module');

exports.AudioWorkspace = {
  controller: function() {
    this.ctx = new AudioContext();
    this.blocks = [];

    this.newBlock = function(template) {
      this.blocks.push(new mod.AudioModule(template, this.ctx));
    };
  },

  view: function(ctrl) {
    return m('svg', [
      m('rect', {
        class: "button",
        x: 50,
        y: 200,
        onclick: () => ctrl.newBlock(templates.oscillator),
      }),
      m('rect', {
        class: "button",
        x: 200,
        y: 200,
        onclick: () => ctrl.newBlock(templates.amplifier),
      }),
      m('rect', {
        class: "button",
        x: 350,
        y: 200,
        onclick: () => ctrl.newBlock(templates.sink),
      }),
      ctrl.blocks.map(block => m.component(blk.AudioBlock, block)),
      //ctrl.blocks.map(block => m("p", block.displayName)),
    ]);
  },
};
