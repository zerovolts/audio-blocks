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
        x: 100,
        y: 100,
        width: 100,
        height: 20,
        fill: "#eee",
        onclick: () => ctrl.newBlock(templates.oscillator)
      }, "add block"),
      ctrl.blocks.map(block => m.component(blk.AudioBlock, block)),
      //ctrl.blocks.map(block => m("p", block.displayName)),
    ]);
  },
};
