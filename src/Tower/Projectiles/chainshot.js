import Projectile from './projectile.js';

export default class ChainShot extends Projectile {
  constructor(x, y, damage, direction, range, color,  target, special) {
    super(x, y, damage, direction, range, color,  target, special);
    this.life = 150;
    this.mag = 5;
    super.initSpeed();
    this.target = target;
  }

  seek() {
    var dx = this.x - this.target.x;
    var dy = this.y - this.target.y;
    //Draw a line to the target
    var distance = Math.sqrt(dx * dx + dy * dy);
    //Get the direction to the target
    var direction = Math.acos((dy)/ distance);
    //Mirror the angle for the left hand side
    if(dx > 0) {
      direction *= -1;
    }
    this.direction = direction;
    this.speed.x = Math.sin(this.direction) * this.mag;
    this.speed.y = -Math.cos(this.direction) * this.mag;
  }

  update() {
    this.seek();
    super.update();
    this.life--;
    if(this.life <= 0) {
      return true;
    }
    return false;
  }

  render(ctx) {
    super.render(ctx);
  }
}
