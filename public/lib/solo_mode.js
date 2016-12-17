import { addChildren, createElementWith,
  generateBoardDiv, generateRightDiv } from './html_helper.js';
import Game from './game.js';
import Timer from './timer.js';
import { setLevelHandler, getGridNode, findLoc,
  disableInteraction, dropHandler,
  setUpMultiMode } from './utils.js';

class SoloMode {
  constructor() {
    this.generateLevelsAndTimer();

  }

  generateLevelsAndTimer() {
    this.levels = createElementWith('ul', 'levels');
    ['Easy', 'Medium', 'Hard'].forEach((text, i) => {
      let li = createElementWith('li', null, text);
      if (!i) { li.classList.add('selected-level'); }
      this.levels.appendChild(li);
    });
    let timer = createElementWith('h3', 'timer', null, ['hidden']);
    this.timer = new Timer(timer, disableInteraction);
    
  }
}

export default SoloMode;
