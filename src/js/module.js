class AudioModule {
  constructor(template, ctx) {
    this.data = new template(ctx);
    this.displayName = this.data.displayName || "";
    this.position = {x: 0, y: 0};
    this.node = this.data.node || undefined;
    this.inputs = this.data.inputs || [];
    this.outputs = this.data.outputs || [];
  }
}

function connect(tx, rx) {
  tx.port.connect(rx.port);
}

exports.AudioModule = AudioModule;
exports.connect = connect;
