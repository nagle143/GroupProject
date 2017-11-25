import Color from './colorComponents.js';
//Import all projectile components subclasses
import Plasma from './Projectiles/plasma.js';
import Grenade from './Projectiles/grenade.js';
import Rail from './Projectiles/rail.js';
import Light from './Projectiles/light.js';
import AOE from './Projectiles/aoe.js';
import Beam from './Projectiles/beam.js';

//Import all structural subclasses
import PlasmaGun from './Structures/plasmagun.js';
import Launcher from './Structures/launcher.js';
import RailGun from './Structures/railgun.js';
import LightGun from './Structures/lightgun.js';
import Pulse from './Structures/pulse.js';
import Multishot from './Structures/multishot.js';


export default class Tower {
  constructor(x, y, struct, color) {
    this.x = x;
    this.y = y;
    this.color = null;
    this.structural = null;
    this.projectiles = [];
    this.rate = 0.0;
    if(color) {
      this.addColor(color);
    }
    if(struct) {
      this.addStruct(struct);
    }
    this.reloading = false;
    this.direction = 0.0;
    this.targets = [];
    this.minDamage = 0.0;
    this.maxDamage = 0.0;
    this.range = 0.0;
  }

  track() {
    var dx = this.x - this.targets[0].x;
    var dy = this.y - this.targets[0].y;
    //Draw a line to the target
    var distance = Math.sqrt(dx * dx + dy * dy);
    //Get the direction to the target
    var direction = Math.acos((dy)/ distance);
    //Mirror the angle for the left hand side
    if(dx > 0) {
      direction *= -1;
    }
    this.direction = direction;
  }

  addColor(color) {
    this.color = new Color(this.x, this.y, color);
    this.rate = this.color.rateOfFire;
  }

  addStruct(struct) {
    switch (struct) {
      case "PlasmaGun":
        this.structural = new PlasmaGun(this.x, this.y);
        break;
      case "Launcher":
        this.structural = new Launcher(this.x, this.y);
        break;
      case "RailGun":
        this.structural = new RailGun(this.x, this.y);
        break;
      case "LightGun":
        this.structural = new LightGun(this.x, this.y);
        break;
      case "Pulse":
        this.structural = new Pulse(this.x, this.y);
        break;
      case "Multishot":
        this.structural = new Multishot(this.x, this.y);
        break;
      default:
        console.log("ERROR IN STRUCT TYPE");
    }
  }

  createProjectile() {
    var damage = Math.randomInt(this.minDamage, this.maxDamage + 1);
    let x = 0;
    let y = 0;
    switch (this.structural.name) {
      case "PlasmaGun":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new Plasma(x, y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      case "Launcher":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new Grenade(x, y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      case "RailGun":
        x = this.x + Math.sin(this.direction)* 15;
        y = this.y - Math.cos(this.direction)* 15;
        this.projectiles.push(new Rail(x, y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      case "LightGun":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new Light(x, y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      case "Pulse":
        this.projectiles.push(new AOE(this.x, this.y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      case "Multishot":
        this.targets.forEach(target => {
          let check = false;
          for(let i = 0; i < this.projectiles.length; i++) {
            if(this.projectiles[i].target === target) {
              check = true;
            }
          }
          if(!check) {
            this.projectiles.push(new Beam(this.x, this.y, damage, this.direction, this.range, this.color.color, target));
          }
        });
        break;
      default:
        console.log("ERROR IN PROJECTILE CREATION");
    }
  }

  structModifier() {
    this.range = this.color.range * this.structural.rangeMOD;
    this.rateOfFire = this.color.rateOfFire * this.structural.rateOfFireMOD;
    this.minDamage = this.color.minDamage * this.structural.damageMOD;
    this.maxDamage = this.color.maxDamage * this.structural.damageMOD;
  }

  update() {
    if(this.color && this.structural) {
      this.structModifier();
      if(this.targets.length > 0) {
        this.track();
        this.structural.update(this.direction);
      }
      if(this.reloading) {
        this.rate--;
        if(this.rate <= 0) {
          this.rate = this.color.rateOfFire * this.structural.rateOfFireMOD;
          this.reloading = false;
        }
      }
      if(!this.reloading && this.targets.length > 0) {
        this.createProjectile();
        this.reloading = true;
      }
    }
    for(let i = 0; i < this.projectiles.length; i++) {
      if(this.projectiles[i].update()) {
        this.projectiles.splice(i, 1);
      }
    }
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x - 15, this.y - 15, 30, 30);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    this.projectiles.forEach(projectile => {
      projectile.render(ctx);
    });
  }
}
