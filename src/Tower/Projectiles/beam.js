import Projectile from './projectile.js';

export default class Beam extends Projectile {
  constructor(x, y, damage, direction, range, color, target, special) {
    super(x, y, damage, direction, range, color, target, special);
    this.target = target;
    this.opacity = 0.70;
  }

  rangeCheck() {
    let dx = this.x - this.target.x;
    let dy = this.y - this.target.y;
    if(dx * dx + dy * dy >= this.range * this.range) {
      return true;
    }
    return false;
  }

  update() {
    if(this.opacity <= 0.70) {
      this.opacity += 0.1;
    }
    else if (this.opacity >= 1.00) {
      this.opacity -= 0.1;
    }
    if(this.rangeCheck()) {
      return true;
    }
    return false;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = this.opacity;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.target.x, this.target.y);
    ctx.stroke();
    ctx.restore();
    ctx.restore();
  }
}
