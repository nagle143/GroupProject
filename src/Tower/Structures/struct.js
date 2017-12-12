//Structural component super class

export default class Struct {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 0.0;
    this.name = "default";
    this.rangeMOD = 1.00;
    this.rateOfFireMOD = 1.00;
    this.damageMOD = 1.00;
  }

  update(direction, x, y) {
    this.direction = direction;
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.save();

    ctx.restore();
  }
}
