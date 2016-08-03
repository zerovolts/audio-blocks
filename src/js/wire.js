function wire_view(start, abs_end) {
  var end = {x: abs_end.x - start.x, y: abs_end.y - start.y};
  var middle = {x: end.x / 2, y: end.y / 2};
  var str = 'm ' + start.x + ' ' + start.y +
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

var wire = {
  controller: (from, to) => {
    var end = {x: abs_end.x - start.x, y: abs_end.y - start.y};
    var middle = {x: end.x / 2, y: end.y / 2};
    var str = 'm ' + start.x + ' ' + start.y +
              ' q ' + 20 + ' ' + 0 + ', ' +
              middle.x + ' ' + middle.y +
              ' t ' + middle.x + ' ' + middle.y;
  },

  view: ctrl => [
    m('path',
      { d: str,
        'stroke-width': 3,
        stroke: '#eee',
        'fill-opacity': 0,})
  ],
}
