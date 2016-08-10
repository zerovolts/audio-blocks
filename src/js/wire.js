const cAudioWire = {
  controller: function(wire) {
    let source = wire.source;
    let sink = wire.sink;
    let rel_sink = {x: sink.x - source.x, y: sink.y - source.y};
    let middle = {x: rel_sink.x / 2, y: rel_sink.y / 2};
    let str = 'm ' + source.x + ' ' + source.y +
              ' q ' + 20 + ' ' + 0 + ', ' +
              middle.x + ' ' + middle.y +
              ' t ' + middle.x + ' ' + middle.y;

    return {
      source: source,
      sink: sink,
      str: str,
    };
  },

  view: function(ctrl) {
    return m('path', {
      d: ctrl.str,
      'stroke-width': 3,
      stroke: '#eee',
      'fill-opacity': 0,
    });
  },
}

exports.cAudioWire = cAudioWire;
