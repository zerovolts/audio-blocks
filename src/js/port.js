exports.AudioPort = {
  controller: function(data) {
    this.port = data.port;
    this.block = data.block;
    this.index = data.index;
    this.raise = data.raise;
    this.addWirePort = data.addWirePort;

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
    var position = m.prop(ctrl.calculatePosition());
    return m('svg', {
      onmouseover: () => ctrl.focus(true),
      onmouseout: () => ctrl.focus(false),
      onclick: () => ctrl.addWirePort(position),
    },
    [
      m('rect',
        { class: 'audio-port-shadow',
          x: position().x,
          y: position().y,
          fill: ctrl.port.name === "audio" ? "#bc4545" : "#3565ab",
        }),
      m('rect',
        { class: 'audio-port',
          x: position().x,
          y: position().y - (ctrl.raise() / 2),
          fill: ctrl.port.name === "audio" ? "#ed6767" : "#6796db",
          //onmouseover: () => block.position.x += 5}),
        }),
      ctrl.focus() ?
        m('text', {
          x: position().x + ctrl.infoBox.x,
          y: position().y + ctrl.infoBox.y,
          "text-anchor": ctrl.infoBox.text,
          fill: '#eee'},
        ctrl.port.name) : "",
    ]);
  }
}
