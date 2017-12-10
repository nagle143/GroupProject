import Color from './colorComponents.js';

//Import all projectile components subclasses
import Plasma from './Projectiles/plasma.js';
import Grenade from './Projectiles/grenade.js';
import Rail from './Projectiles/rail.js';
import Light from './Projectiles/light.js';
import AOE from './Projectiles/aoe.js';
import Beam from './Projectiles/beam.js';
import ChainShot from './Projectiles/chainshot.js';

//Import all structural subclasses
import PlasmaGun from './Structures/plasmagun.js';
import Launcher from './Structures/launcher.js';
import RailGun from './Structures/railgun.js';
import LightGun from './Structures/lightgun.js';
import Pulse from './Structures/pulse.js';
import Multishot from './Structures/multishot.js';
import Chain from './Structures/chain.js';

/** @class Tower
* Object that represents the tower as a whole, controls color and structural components and projectile creation
*/
export default class Tower {
  /** @constructor
  * Handles the creation of the tower's base properties
  * @param {float} x - x position of the tower
  * @param {float} y - y position of the tower, x & y should be within a Building
  * @param {string} struct - the name of the struct to be initialized, can be null
  * @param {string} color - the name of the color to be initialized, can be null
  * Notes - struct or color can be null, but not both. Color should R,G, or Blue but can support any color
  */
  constructor(x, y, struct, color, width, height) {
    this.x = x;
    this.y = y;
    this.color = null;
    this.structural = null;
    //Array of projectiles, type depends of the structural component
    this.projectiles = [];
    //Rate of fire variable, will be calculated later
    this.rate = 0.0;
    this.width = width;
    this.height = height;
    //Only initialzes the ones that are not null
    if(color) {
      this.addColor(color);
    }
    if(struct) {
      this.addStruct(struct);
    }
    //Determine if the tower should be reloading
    this.reloading = false;
    //direction the tower is aiming, doesn't matter for some structural types
    this.direction = 0.0;
    //Array of targets, should only be 1 target unless structural is Multishot type
    this.targets = [];
    //Basic Tower stats to be calculated later
    this.minDamage = 0.0;
    this.maxDamage = 0.0;
    this.range = 0.0;
  }

  /** @function track
  * Function to handle calculating the direction the tower will shoot
  * Multishot & Pulse towers don't need this as direction is irrelavent
  */
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

  /** @function upgrade
  * Very simple function to upgrade the color component of a tower
  */
  upgrade() {
    this.color.combine(this.color);
  }

  /** @function addColor
  * Function to initialze the color component of the tower
  * @param {string} color - name of the color to be created
  */
  addColor(color) {
    this.color = new Color(this.x, this.y, color);
    this.rate = this.color.rateOfFire;
  }

  /** @function changeColor
  * Function to handle swapping the color components
  * @param {color} component - is an actuall color object
  */
  changeColor(component) {
    this.color = component;
  }

  /** @function changeStruct
  * Function to handle swapping the structural components
  * @param {struct} struct - is an actual structural object
  */
  changeStruct(struct) {
    this.struct = struct;
  }

  /** @function addStruct
  * Function to add a structural component
  * @param {string} struct - name of the struct to create
  */
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
      case "Chain":
        this.structural = new Chain(this.x, this.y);
        break;
      default:
        console.log("ERROR IN STRUCT TYPE");
    }
  }

  /** @function createProjectile
  * Function to create the appropriate projectile based on the color and struct components
  */
  createProjectile() {
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
            this.projectiles.push(new Beam(this.x, this.y, damage, this.direction, this.range, this.color.color, target));
          }
        });
        break;
      case "Chain":
        x = this.x + Math.sin(this.direction)* 30;
        y = this.y - Math.cos(this.direction)* 30;
        this.projectiles.push(new ChainShot(x, y, damage, this.direction, this.range, this.color.color, this.targets[0]));
        break;
      default:
        console.log("ERROR IN PROJECTILE CREATION");
    }
  }

  /** @function structModifier
  * Function to handle how the struct modifies the towers stats, white colored components get bonuses
  */
  structModifier() {
    if(this.color.color === 'white') {
      this.range = Math.round(1.10 * this.color.range * this.structural.rangeMOD);
      this.minDamage = Math.round( 1.20 * this.color.minDamage * this.structural.damageMOD);
      this.maxDamage = Math.round(1.20 * this.color.maxDamage * this.structural.damageMOD);
    }
    else {
      this.range = Math.round(this.color.range * this.structural.rangeMOD);
      this.minDamage = Math.round(this.color.minDamage * this.structural.damageMOD);
      this.maxDamage = Math.round(this.color.maxDamage * this.structural.damageMOD);
    }
    this.rateOfFire = Math.round(this.color.rateOfFire * this.structural.rateOfFireMOD);
  }

  /** @function update
  * Function that handles all updating to do with the tower and sub objects (projectiles and components)
  */
  update() {
    //Things to do if you have both types of components
    if(this.color && this.structural) {
      //Update tower stats
      this.structModifier();
      //If it has targets, track them
      if(this.targets.length > 0) {
        this.track();
        this.structural.update(this.direction);
      }
      //If it is reloading update counter
      if(this.reloading) {
        this.rate--;
        if(this.rate <= 0) {
          this.rate = Math.round(this.color.rateOfFire * this.structural.rateOfFireMOD);
          this.reloading = false;
        }
      }
      //If it is not reloading & has targets, shoot
      if(!this.reloading && this.targets.length > 0) {
        this.createProjectile();
        this.reloading = true;
      }
    }
    //Update projectiles
    for(let i = 0; i < this.projectiles.length; i++) {
      if(this.projectiles[i].update()) {
        this.projectiles.splice(i, 1);
      }
    }
    //Will need to update struct too for spinning
  }

  /** @function render
  * Standar Render Function
  * @param {context} ctx - back buffer context from game.js
  */
  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x - 15, this.y - 15, 30, 30);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
    //Render projectiles
    this.projectiles.forEach(projectile => {
      projectile.render(ctx);
    });
  }
}
