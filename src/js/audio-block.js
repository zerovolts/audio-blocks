class AudioBlock {
  constructor(name, position) {
    this.displayName = name;
    this.position = position;
    this.inputs = [];
    this.outputs = [];
  }

  render() {
    return [
      "<div class=\"audio-block\">",
      this.displayName,
      "</div>"
    ].reduce((pre, cur) => pre + cur);
  }
}

module.exports.AudioBlock = AudioBlock;
