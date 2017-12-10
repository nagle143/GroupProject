import Struct from './struct.js';

export default class Chain extends Struct {
  constructor(x, y) {
    super(x, y);
    this.name = "Chain";
    this.rangeMOD = 0.80;
    this.rateOfFireMOD = 1.50;
    this.damageMOD = 1.00;
  }

  update() {

  }

  render() {

  }
}
