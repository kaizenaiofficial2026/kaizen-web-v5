class PCMProcessor extends AudioWorkletProcessor {
  process(inputs) {
    const ch = inputs[0]?.[0];
    if (ch) {
      const buf = new Int16Array(ch.length);
      for (let i = 0; i < ch.length; i++) {
        buf[i] = Math.max(-32768, Math.min(32767, ch[i] * 32767));
      }
      this.port.postMessage(buf.buffer, [buf.buffer]);
    }
    return true;
  }
}
registerProcessor('pcm-processor', PCMProcessor);
