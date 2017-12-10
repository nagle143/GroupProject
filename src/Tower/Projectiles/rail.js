import Projectile from './projectile.js';

export default class Rail extends Projectile {
  constructor(x, y, damage, direction, range, color,  target, special) {
    super(x, y, damage, direction, range, color,  target, special);
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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction + Math.PI);
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillRect(-this.radius/ 2, -this.radius, this.radius * 0.75, this.range);
    ctx.restore();
    ctx.restore();
  }
}
