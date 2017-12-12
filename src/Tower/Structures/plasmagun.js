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
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(0, -16);
    ctx.lineTo(8, -8);
    ctx.lineTo(16, 0);
    ctx.lineTo(8, 8);
    ctx.lineTo(0, 16);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-16, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(-16, -16);
    ctx.lineTo(0, -8);
    ctx.lineTo(16, -16);
    ctx.lineTo(8, 0);
    ctx.lineTo(16, 16);
    ctx.lineTo(0, 8);
    ctx.lineTo(-16, 16);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.moveTo(-13, -13);
    ctx.lineTo(0, -8);
    ctx.lineTo(13, -13);
    ctx.lineTo(8, 0);
    ctx.lineTo(13, 13);
    ctx.lineTo(0, 8);
    ctx.lineTo(-13, 13);
    ctx.lineTo(-8, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(0, -4);
    ctx.lineTo(8, -8);
    ctx.lineTo(4, 0);
    ctx.lineTo(8, 8);
    ctx.lineTo(0, 4);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
