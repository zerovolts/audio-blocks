// tag -> string
// attribute -> key-value pair
// element -> array of [tag, attribute, [element, ...]]

// [element] -> ['tag', {attributes}, [element], [element], ...]
// [element] -> ['tag', {attributes}] -> <tag {attributes} />
// [element] -> ['tag', [element], [element], ...]
// mapping -> [[element], [element], [element]]

// json : string (raw html/text) / array
// : string -> return the string
// : array -> continue
// json[0] : string (html tag) / array (html element/collection)
// : undefined -> return empty string
// : array -> recursively call each element in 'json'
// : string -> continue
// json[1] : object (html attributes) / array (html element/collection)
// : array -> recursively call each element left in 'json'
// : object -> continue
// json[2] : array (html element/collection)
// : array -> recursively call each element left in 'json'

function html(json) {
  var tag = '', attributes = {};
  var open_tag = '', close_tag = '';

  // if 'json' is not an array, then it's probably a string.
  if (!Array.isArray(json)) {
    return json;
  }
  if (json.length === 0) {
    return '';
  }

  if (typeof json[0] === "string") {
    tag = json.shift();
    if (json.length > 0 && !Array.isArray(json[0])) {
      attributes = json.shift();
    }
    open_tag =
      '<' + tag +
      Object.keys(attributes)
        .map((key) => ' ' + key + '="' + attributes[key] + '"')
        .reduce((pre, cur) => pre + cur, '') + '>';
    close_tag = '</' + tag + '>';
  }

  return open_tag + json.map(html).reduce((pre, cur) => pre + cur, '') + close_tag;
}

module.exports = html;
