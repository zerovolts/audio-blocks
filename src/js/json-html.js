
//['tag', {attributes}, []]
function html(json) {
  console.log(json);
  var tag, attributes;

  if (Array.isArray(json)) {
    tag = json.shift();
    attributes = json.shift();
    return '<' + tag +
           Object.keys(attributes)
             .map((key) => ' ' + key + '="' + attributes[key] + '"')
             .reduce((pre, cur) => pre + cur, '') + '>' +
           json.map(html).reduce((pre, cur) => pre + cur, '') + '</' + tag + '>';
  }
  return json;
}

module.exports = html;
