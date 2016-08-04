exports.AudioPort = {
  controller: function(data) {
    this.port = data.port;
    this.block = data.block;
    this.index = data.index;

    this.focus = m.prop(false);
    this.xoffset = data.port.input ? -10 : 122;
    this.infoBox = {
      x: data.port.input ? -8 : 24,
      y: 12,
      text: data.port.input ? "end" : "start",
    };

    this.calculatePosition = function(yoffset) {
      return {
        x: this.block.position.x + this.xoffset,
        y: this.block.position.y + 36 + (this.index * 30),
      }
    };
  },

  view: function(ctrl) {
    var position = ctrl.calculatePosition();
    return m('svg', [
      m('rect',
        { class: 'audio-port-shadow',
          x: position.x,
          y: position.y + 4,
        }),
      m('rect',
        { class: 'audio-port',
          x: position.x,
          y: position.y,
          onmouseover: () => ctrl.focus(true),
          onmouseout: () => ctrl.focus(false),
          //onmouseover: () => block.position.x += 5}),
        }),
      ctrl.focus() ?
        m('text', {
          x: position.x + ctrl.infoBox.x,
          y: position.y + ctrl.infoBox.y,
          "text-anchor": ctrl.infoBox.text,
          fill: '#eee'},
        ctrl.port.name) : "",
    ]);
  }
}
