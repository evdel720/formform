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
      window.clearInterval(this.interval);
      window.clearTimeout(this.timeout);
    }
  }

  stop() {
    window.clearInterval(this.interval);
    window.clearTimeout(this.timeout);
    this.seconds = this.init;
  }

  start(game) {
    if (this.interval) {
      this.stop();
      this.renderTimer();
    }
    this.timeout = window.setTimeout(() => this.callback(game), this.init * 1000);
    this.interval = window.setInterval(this.tick.bind(this), 1000);
  }
}

export default Timer;
