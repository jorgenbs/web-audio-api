/*jslint browser: true*/
"use strict";

function MachineGun(context) {
  var ctx = this;
  var loader = new BufferLoader(context, ['examples/machinegun/m4a1.mp3'], onLoaded);

  function onLoaded(buffers) {
    ctx.buffers = buffers;
  };

  loader.load();
}

MachineGun.prototype.shootRound = function(type, rounds, interval, random, random2) {
  if (typeof random == 'undefined') {
    random = 0;
  }
  var time = context.currentTime;
  // Make multiple sources using the same buffer and play in quick succession.
  for (var i = 0; i < rounds; i++) {
    var source = this.makeSource(this.buffers[type]);
    source.playbackRate.value = 1 + Math.random() * random2;
    source.start(time + i * interval + Math.random() * random);
  }
}

MachineGun.prototype.makeSource = function(buffer) {
  var source = context.createBufferSource();
  var compressor = context.createDynamicsCompressor();
  var gain = context.createGain();
  gain.gain.value = 0.2;
  source.buffer = buffer;
  source.connect(gain);
  gain.connect(compressor);
  compressor.connect(context.destination);
  return source;
};

window.mgun = new MachineGun(context);