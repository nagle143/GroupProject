

export default class Energy {
  constructor(x, y, energy) {
    this.x = x;
    this.y = y;
    this.energy = energy;
    this.radius = 20;
    this.maxEnergy = 1000;
    this.multipler = 1.00;
    //Energy per second, 1% of max energy
    this.EPS = this.maxEnergy * 0.01;
    this.timer = 60;
  }

  applyMultipler() {
    this.EPS = Math.round(this.maxEnergy * 0.01 * this.multipler);
  }

  update() {
    this.timer--;
    if(!this.timer) {
      this.energy += this.EPS;
      this.timer = 60;
    }
    //If energy = maxEnergy pool expands and multipler Increases 10%
    if(this.energy >= this.maxEnergy) {
      this.maxEnergy *= 2;
      this.multipler *= 1.10;
      this.applyMultipler();
    }
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = 'violet';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
