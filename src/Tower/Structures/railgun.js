import Struct from './struct.js';

export default class RailGun extends Struct {
  constructor() {
    super();
    this.name = "RailGun";
    this.rangeMOD = 1.30;
    this.rateOfFireMOD = 2.00;
    this.damageMOD = 2.00;
  }

  render(ctx) {
    ctx.save();

    ctx.restore();
  }
}
