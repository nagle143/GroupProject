import Maps from './maps.js';
//Import monster subclasses

import Tower from './Tower/tower.js';
import Powers from './powers.js';
import Energy from './energy.js';
import Building from './building.js';

export default class Game {
  constructor() {




    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = 1000;
    this.backBufferCanvas.height = 1000;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = 1000;
    this.screenBufferCanvas.height = 1000;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.loop = this.loop.bind(this);
    this.render = this.render.bind(this);

    //60fps
    this.interval = setInterval(this.loop, 1000/60);
  }

  update() {

  }

  render() {



    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }

  loop() {
    this.update();
    this.render();
  }
}
