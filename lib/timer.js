class Timer {
  constructor($timer, callback) {
    this.$timer = $timer;
    this.init = 60;
    this.seconds = this.init;
    this.interval = undefined;
    this.timeout = undefined;
    this.callback = callback;
    this.renderTimer();
  }

  renderTimer() {
    if (this.seconds === 10) {
      this.$timer.style.color = "#F00";
      this.$timer.style.fontSize = "45px";
    }
    this.$timer.innerText = this.seconds;
  }

  reset(seconds) {
    this.init = seconds;
    this.seconds = seconds;
    this.renderTimer();
  }

  tick() {
    this.seconds--;
    this.renderTimer();
    if (this.seconds === 0) {
      this.stop();
    }
  }

  stop() {
    window.clearInterval(this.interval);
    window.clearTimeout(this.timeout);
    this.seconds = this.init;
  }

  start(game) {
    this.$timer.style.color = '#000';
    this.$timer.style.fontSize = "30px";
    if (game.isPlaying) {
      this.stop();
      this.renderTimer();
    }
    this.timeout = window.setTimeout(() => this.callback(game), this.init * 1000);
    this.interval = window.setInterval(this.tick.bind(this), 1000);
  }
}

export default Timer;
