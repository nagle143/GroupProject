import Struct from './struct.js';

export default class LightGun extends Struct {
  constructor() {
    super();
    this.name = "LightGun";
    this.rangeMOD = 2.00;
    this.rateOfFireMOD = 2.00;
    this.damageMOD = 3.00;
  }

  render(ctx) {

  }
}
