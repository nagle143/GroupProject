//Projectile super class

export default class Projectile {
  constructor(x, y, damage, direction, range, color, target, special) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.damage = damage;
    this.range = range;
    this.color = color;
    this.special = special;
    this.radius = 10;
    this.mag = 5;
    this.speed = {x: 0.0, y: 0.0};
    this.target = {x: target.x, y: target.y};
  }

  initSpeed() {
    this.speed.x = Math.sin(this.direction) * this.mag;
    this.speed.y = -Math.cos(this.direction) * this.mag;
  }

  update() {
    this.x += this.speed.x;
    this.y += this.speed.y;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.target.x, this.target.y);
    ctx.stroke();
    ctx.restore();
  }
}
