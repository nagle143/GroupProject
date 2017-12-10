import Maps from './maps.js';
//Import monster subclasses

import Tower from './Tower/tower.js';
import Color from './Tower/colorComponents.js';
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
    this.activePowers = [];
    this.powers = ["Bombardment, Nanites, Freeze"];
    this.powerTimers = [600, 2400, 1200];
    this.energy = new Energy(900, 900, 500);
    this.towers = [];
    this.towers.push(new Tower(500, 500, null, 'green'));
    this.towers[0].addStruct("Launcher");
    this.towers.push(new Tower(500, 700, null, 'red'));
    this.towers[1].addStruct("PlasmaGun");
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].color.combine(this.towers[1].color);
    this.towers[1].upgrade();
    this.towers[1].upgrade();
    this.towers[1].upgrade();
    this.towers[1].upgrade();
    this.towers[1].upgrade();
    this.towers[1].upgrade();
    this.towers[1].upgrade();
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
    this.towers[5].upgrade();
    this.towers[5].upgrade();
    this.towers[5].upgrade();
    this.towers[5].upgrade();
    this.towers[5].upgrade();
    this.towers[5].upgrade();
    this.towers.push(new Tower(400, 450, "Chain", null));
    this.towers[6].addColor("white");
    this.towers[6].upgrade();
    this.towers[6].upgrade();
    this.towers[6].upgrade();
    this.towers[6].upgrade();
    this.towers[6].upgrade();
    this.monsters =[];
    this.monsters.push(new Monster(800, 600));
    this.monsters.push(new Monster(900, 450));
    this.monsters.push(new Monster(800, 400));
    this.monsters.push(new Monster(900, 750));

    console.log(this.towers);

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

  /** @function createProjectile
  * Function to create the appropriate projectile based on the color and struct components
  */
  createProjectile(tower) {
    //Calculate the damage value
    let damage = Math.randomInt(this.minDamage, this.maxDamage + 1);
    //Calculate how strong the special property of the projectile is
    let special = this.color.determineSpecials();
    //Set up x & y values for the projectiles, only some will need to be different than this.x & this.y
    let x = 0;
    let y = 0;
    switch (this.structural.name) {
      case "PlasmaGun":
        x = this.x + Math.sin(this.direction) * 30;
        y = this.y - Math.cos(this.direction) * 30;
        this.projectiles.push(new Plasma(x, y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      case "Launcher":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new Grenade(x, y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      case "RailGun":
        x = this.x + Math.sin(this.direction)* 15;
        y = this.y - Math.cos(this.direction)* 15;
        this.projectiles.push(new Rail(x, y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      case "LightGun":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new Light(x, y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      case "Pulse":
        this.projectiles.push(new AOE(this.x, this.y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      case "Multishot":
        //Iterate over the targets to check if the monster is already being targeted
        this.targets.forEach(target => {
          let check = false;
          for(let i = 0; i < this.projectiles.length; i++) {
            if(this.projectiles[i].target === target) {
              //If it is already being targeted we don't need to create a new projectile
              check = true;
            }
          }
          if(!check) {
            //If the target is not being targeted current, create a new projectile
            this.projectiles.push(new Beam(this.x, this.y, damage, this.direction, this.range, this.color.color, target, special));
          }
        });
        break;
      case "Chain":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new ChainShot(x, y, damage, this.direction, this.range, this.color.color, this.targets[0], special));
        break;
      default:
        console.log("ERROR IN PROJECTILE CREATION");
    }
  }

  update() {
    this.energy.update();

    /*for(let i = 0; i < this.powerTimers; i++) {
      this.powerTimers[i]--;
      if(this.powerTimers[i]) {
        this.activePowers.push(new Power(500, 500, this.powers, this.energy.multipler));
      }
    }*/

    this.towers.forEach(tower => {
      tower.update();
    });
    this.monsters.forEach(monster => {
      monster.update();
    });
    this.towers.forEach(tower => {
      for(let i = 0; i < this.monsters.length; i++) {
        if(tower.structural.name !== "Multishot") {
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

    this.towers.forEach(tower => {
      if(tower.targets.length > 0) {
        this.createProjectile(tower);
    });
  }

  render() {
    this.backBufferContext.fillstyle = 'black';
    this.backBufferContext.fillRect(0, 0, 1000, 1000);
    this.activePowers.forEach(power => {
      power.render(this.backBufferContext);
    });
    this.energy.render(this.backBufferContext);
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
