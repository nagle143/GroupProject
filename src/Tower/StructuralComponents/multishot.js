import Struct from './struct.js';

export default class Multishot extends Struct {
  constructor(x, y) {
    super(x, y);
    this.name = "Multishot";
    this.rangeMOD = 1.00;
    this.rateOfFireMOD = 0.1;
    this.damageMOD = 0.50;
  }

  update() {

  }

  render() {

  }
}
