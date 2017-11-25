//Monster super class

export default class Monster {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'left';
  }

  update() {
    if(this.direction === 'left') {
      this.x += -2;
    }
    else {
      this.x += 2;
    }
    if(this.x === 100) {
      this.direction = 'right';
    }
    if(this.x === 900) {
      this.direction = 'left';
    }
  }

  render(ctx) {
    ctx.save();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 15, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
