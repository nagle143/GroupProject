import Struct from './struct.js';

export default class Launcher extends Struct {
  constructor() {
    super();
    this.name = "Launcher";
    this.rangeMOD = 1.25;
    this.rateOfFireMOD = 2.00;
    this.damageMOD = 1.00;
  }

  render(ctx) {

  }
}
