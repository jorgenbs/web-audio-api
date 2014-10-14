$(function() {
  window.oscillator = context.createOscillator();
  window.oscillator.start(0);

  window.oscillatorOn = function () {

    context.source = oscillator;
    oscillator.connect(context.destination);

  }

  window.oscillatorOff = function() {
    context.source.disconnect(0);
  }

  window.oscillatorFreq = function(n) {
    window.oscillator.frequency.value = n;
  }
});