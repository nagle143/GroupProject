import Struct from './struct.js';

export default class Pulse extends Struct {
  constructor(x, y) {
    super(x, y);
    this.name = "Pulse";
    this.rangeMOD = 0.60;
    this.rateOfFireMOD = 0.70;
    this.damageMOD = 3.00;
  }

  update() {

  }

  render(ctx) {

  }
}
