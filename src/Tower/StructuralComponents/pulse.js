import Struct from './struct.js';

export default class Pulse extends Struct {
  constructor(x, y) {
    super(x, y);
    this.name = "Pulse";
    this.rangeMOD = 0.50;
    this.rateOfFireMOD = 1.00;
    this.damageMOD = 2.00;
  }

  update() {

  }

  render(ctx) {

  }
}
