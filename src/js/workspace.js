var AudioModule = require('./module').AudioModule;
var AudioBlock = require('./block').AudioBlock;
var templates = require('./module-templates');

exports.AudioWorkspace = {
  controller: function() {
    this.ctx = new AudioContext();
    this.blocks = [];

    this.newBlock = function(template) {
      this.blocks.push(new AudioModule(this.ctx, template, {x: Math.floor(Math.random() * 1000), y: Math.floor(Math.random() * 1000)}));
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
      ctrl.blocks.map(block => m.component(AudioBlock, block)),
      //ctrl.blocks.map(block => m("p", block.displayName)),
    ]);
  },
};
