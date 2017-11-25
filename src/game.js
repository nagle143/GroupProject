import Maps from './maps.js';
//Import monster subclasses

import Tower from './Tower/tower.js';
import Powers from './powers.js';
import Energy from './energy.js';
import Building from './building.js';
import Monster from './Enemies/monster.js';

/** @function Math.randomBetween()
  * Math prototype function built to easily create ranom floats
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random float between the parameters
  */
Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

/** @function Math.randomBetween()
  * Math prototype function built to easily create ranom integers
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random integer between the parameters
  */
Math.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default class Game {
  constructor() {
    this.towers = [];
    this.towers.push(new Tower(500, 500, null, 'green'));
    this.towers[0].addStruct("Launcher");
    this.towers.push(new Tower(500, 700, null, 'red'));
    this.towers[1].addStruct("PlasmaGun");
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers.push(new Tower(600, 500, null, 'cyan'));
    this.towers[2].addStruct("RailGun");
    this.towers.push(new Tower(400, 500, null, 'yellow'));
    this.towers[3].addStruct("LightGun");
    this.towers[3].color.combine(this.towers[3].color);
    this.towers[3].color.combine(this.towers[3].color);
    this.towers[3].color.combine(this.towers[3].color);
    this.towers[3].color.combine(this.towers[3].color);
    this.towers[3].color.combine(this.towers[3].color);
    this.towers[3].color.combine(this.towers[3].color);
    this.towers.push(new Tower(600, 550, "Pulse", null));
    this.towers[4].addColor("magenta");
    this.towers[4].color.combine(this.towers[4].color);
    this.towers[4].color.combine(this.towers[4].color);
    this.towers[4].color.combine(this.towers[4].color);
    this.towers[4].color.combine(this.towers[4].color);
    this.towers[4].color.combine(this.towers[4].color);
    this.towers.push(new Tower(400, 550, "Multishot", null));
    this.towers[5].addColor("blue");
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.towers[5].color.combine(this.towers[5].color);
    this.monsters =[];
    this.monsters.push(new Monster(800, 600));
    this.monsters.push(new Monster(900, 450));
    this.monsters.push(new Monster(800, 400));
    this.monsters.push(new Monster(900, 750));

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

  circleCollisionDetection(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    if(dx > r1 + r2 || dy > r1 + r2) {
      return false;
    }
    if(dx * dx + dy * dy >= (r1 + r2) * (r1 + r2)) {
      return false;
    }
    return true;
  }

  update() {
    this.towers.forEach(tower => {
      tower.update();
    });
    this.monsters.forEach(monster => {
      monster.update();
    });
    this.towers.forEach(tower => {
      for(let i = 0; i < this.monsters.length; i++) {
        if(tower.structural.name != "Multishot") {
          if(this.circleCollisionDetection(tower.x, tower.y, tower.range, this.monsters[i].x, this.monsters[i].y, 15)) {
            if(tower.targets.length < 1) {
              tower.targets.push(this.monsters[i]);
            }
            break;
          }
          else if(tower.targets[0] === this.monsters[i]) {
            tower.targets.splice(0, 1);
          }
        }
        else {
          if(this.circleCollisionDetection(tower.x, tower.y, tower.range, this.monsters[i].x, this.monsters[i].y, 15)) {
            if(tower.targets.length < 3) {
              let check = false;
              for(let j = 0; j < tower.targets.length; j ++) {
                if(tower.targets[j] === this.monsters[i]) {
                  check = true;
                }
              }
              if(!check) {
                tower.targets.push(this.monsters[i]);
              }
            }
          }
          else {
            for(let j = 0; j < tower.targets.length; j ++) {
              if(tower.targets[j] === this.monsters[i]) {
                tower.targets.splice(j, 1);
              }
            }
          }
        }
      }
    });
  }

  render() {
    this.backBufferContext.fillstyle = 'black';
    this.backBufferContext.fillRect(0, 0, 1000, 1000);
    this.monsters.forEach(monster => {
      monster.render(this.backBufferContext);
    });
    this.towers.forEach(tower => {
      tower.render(this.backBufferContext);
    });
    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }

  loop() {
    this.update();
    this.render();
  }
}
