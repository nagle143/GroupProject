import Struct from './struct.js';

export default class PlasmaGun extends Struct {
  constructor(x, y) {
    super(x, y);
    this.name = "PlasmaGun";
    this.rangeMOD = 1.00;
    this.rateOfFireMOD = 0.70;
    this.damageMOD = 0.70;
  }

  render(ctx) {
    ctx.save();

    ctx.restore();
  }
}
