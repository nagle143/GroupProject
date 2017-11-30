import Projectile from './projectile.js';

export default class Light extends Projectile {
  constructor(x, y, damage, direction, range, color,  target, special, dominance) {
    super(x, y, damage, direction, range, color,  target, special, dominance);
    this.mag = 30;
    super.initSpeed();
  }

  update() {
    super.update();
  }

  render(ctx) {
    //console.log('what');
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.radius / 2, 0);
    ctx.lineTo(0, this.radius);
    ctx.lineTo(-this.radius / 2, 0);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
