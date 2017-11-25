

export default class Color {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = null;
    this.level = 1;
    //Level one Starters
    this.minDamage = 0;
    this.maxDamage = 0;
    this.initDamage(color);
    this.rateOfFire = 50;
    this.range = 100;
    this.radius = 25;
  }

  /** @function initDamageColor
    * Function to assign starting damage values, in case we want to change the values of the the different colors
    * Also assigns RGB values to the color property
    */
  initDamage(color) {
    switch (color) {
      case 'red':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'red';
        break;
      case 'blue':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'blue';
        break;
      case 'green':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'green';
        break;
      case 'cyan':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'cyan';
        break;
      case 'magenta':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'magenta';
        break;
      case 'yellow':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'yellow';
        break;
    }
  }

  combine(component) {
    this.minDamage = component.minDamage + this.minDamage;
    this.maxDamage = component.maxDamage + this.maxDamage;
    //Reduce the rate of fire by 5%
    this.rateOfFire = Math.floor(this.rateOfFire *  0.95);
    this.range = Math.floor(this.range * 1.05);
    this.level++;
    if(this.color === component.color) {
      return;
    }
  }

  energyMultipler(multipler) {
    this.minDamage *= multipler;
    this.maxDamage *= multipler;
  }

  update() {
    //? Don't know if I need this
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.radius, 0);
    ctx.lineTo(0, this.radius);
    ctx.lineTo(-this.radius, 0);
    ctx.closePath();
    ctx.restore();
  }
}
