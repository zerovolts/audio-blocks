function wire_view(start, abs_end) {
  let end = {x: abs_end.x - start.x, y: abs_end.y - start.y};
  let middle = {x: end.x / 2, y: end.y / 2};
  let str = 'm ' + start.x + ' ' + start.y +
            ' q ' + 20 + ' ' + 0 + ', ' +
            middle.x + ' ' + middle.y +
            ' t ' + middle.x + ' ' + middle.y;
  return html(
    [ 'path',
      { d: str,
        'stroke-width': 3,
        stroke: '#eee',
        'fill-opacity': 0,}]
  );
}

exports.Wire = {
  controller: function(wire) {
    let source = wire.source;
    let sink = wire.sink;
    console.log([source, sink]);
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
