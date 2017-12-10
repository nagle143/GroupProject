

export default class Powers {
  constructor(x, y, name, multipler) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.multipler = multipler;
    this.color = null;
    this.radius = 0.0;
    this.damage = 0;
    this.initRadius();
  }

  initRadiusColor() {
    switch (this.name) {
      case 'Bombardment':
        this.radius = 75;
        this.color = 'white';
        this.damage = Math.round(100 * this.multipler);
        break;
      case 'Nanites':
        this.radius = 100;
        this.color = 'voilet';
        this.damage = Math.round(10 * this.multipler);
        break;
      case 'Freeze':
        this.radius = 150;
        this.radius = 'cyan';
        this.damage = Math.round(this.multipler * this.multipler);
        break;
      default:
        console.log("ERROR IN POWER INITRADIUSCOLOR")
    }
  }

  update() {

  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
