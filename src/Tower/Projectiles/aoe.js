import Projectile from './projectile.js';

export default class AOE extends Projectile {
  constructor(x, y, damage, direction, range, color, target, special, dominance) {
    super(x, y, damage, direction, range, color, target, special, dominance);
    this.direction = null;
    this.target = null;
    this.opacity = 1.00;
  }

  update() {
    this.opacity -= 0.01;
    if(this.opacity <= 0) {
      return true;
    }
    return false;
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.range, 0, Math.PI * 2);
    ctx.closePath();
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.restore();
    ctx.restore();
  }
}
