import Projectile from './projectile.js';

export default class Grenade extends Projectile {
  constructor(x, y, damage, direction, range, color, target, special) {
    super(x, y, damage, direction, range, color, target, special);
    this.life = 100;
    this.AOE = 30;
    this.mag = 4;
    super.initSpeed();
  }

  update() {
    if(Math.abs(this.x - this.target.x) < this.radius && Math.abs(this.y - this.target.y) < this.radius) {
      this.radius = this.AOE;
      this.life--;
      if(this.life <= 0) {
        return true;
      }
    }
    else {
      super.update();
    }
    return false;
  }

  render(ctx) {
    super.render(ctx);
  }
}
