
/** @class Color
* Class determines the color components that feed into the towers
*/
export default class Color {
  /** @constructor
  * initialzes all the variables important with color components
  * @param {float} x - x position
  * @param {float} y - y position
  * @param {string} color - name of the color,  should be RGB but will work with RGBMYC & White
  */
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = null;
    //Overall level of the gem
    this.level = 1;
    //Level one Starters
    this.minDamage = 0;
    this.maxDamage = 0;
    this.initDamage(color);
    //I beleive 60 = 1 second
    this.rateOfFire = 60;
    this.range = 100;
    this.radius = 5;
  }

  /** @function initDamageColor
    * Function to assign starting damage values, in case we want to change the values of the the different colors
    * Also assigns RGB values to the color property
    * @param {string} color - the color the component is suppose to be
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
      case 'white':
        this.minDamage = 5;
        this.maxDamage = 10;
        this.color = 'white';
        break;
    }
  }

  /** @function determineSpecials
  * Function to determine the special properties of the projectiles
  * @returns {special} effect & time - effect can be a float, int or null
  * time can be and int or null. Both are null if color is White
  */
  determineSpecials() {
    let base = null;
    let time = null;
    switch (this.color) {
      case 'red':
        base = Math.round(this.minDamage * 0.30);
        time = 60;
        time += this.level * 20;
        break;
      case 'green':
        base = 0.01;
        time = 120;
        base *= this.level;
        time += this.level * 30;
        break;
      case 'blue':
        base = 0.05;
        base *= this.level;
        break;
      case 'magenta':
        time = 30;
        time += this.level * 5;
        break;
      case 'yellow':
        time = 10;
        time += Math.round(this.level * 0.5 * time);
        break;
      case 'cyan':
        base = 0.05;
        base *= this.level * 0.5;
        time = 120;
        time += this.level * 15;
        break;
      default:
        return null;
    }
    return {effect: base, timer: time};
  }

  /** @function combine
  * Function to handle combining the stats of the color components and colors
  * @param {color} component - an actual color component
  * IMPORANT - function assumes both components are the same level
  */
  combine(component) {
    //Damage is added together with a slight bump
    this.minDamage = (component.minDamage + this.minDamage) * 1.05;
    this.maxDamage = (component.maxDamage + this.maxDamage) * 1.05;
    //Reduce the rate of fire by 5%
    this.rateOfFire = Math.floor(this.rateOfFire *  0.95);
    //Increase the range by 10%
    this.range = Math.floor(this.range * 1.10);
    this.level++;
    //If the color of the components are the same or the component being add is white, we are done
    if(this.color === component.color || component.color === 'white') {
      return;
    }
    //If this component is white, it takes on the color of the second component
    if(this.color === 'white') {
      this.color = component.color;
      return;
    }
    /*
    Notes - primary colors RGB mix to create mixed colors MYC,
    Mixed colors combine to make the primary color they have in common
    Complementary colors mix to create white (RGB system is additive)
    Nested switch statements are the only way I could see doing this, and it opperates quickly, and won't excute often, so it should be alright, but it is ugly.
    */
    switch (this.color) {
      case 'red':
        switch (component.color) {
          case 'green':
            this.color = 'yellow';
            break;
          case 'blue':
            this.color = 'magenta';
            break;
          case 'magenta':
            this.color = 'magenta';
            break;
          case 'yellow':
            this.color = 'yellow';
            break;
          case 'cyan':
            this.color = 'white';
            break;
        }
        break;
      case 'green':
        switch (component.color) {
          case 'red':
            this.color = 'yellow';
            break;
          case 'blue':
            this.color = 'cyan';
            break;
          case 'magenta':
            this.color = 'white';
            break;
          case 'yellow':
            this.color = 'yellow';
            break;
          case 'cyan':
            this.color = 'cyan';
            break;
        }
        break;
      case 'blue':
        switch (component.color) {
          case 'red':
            this.color = 'magenta';
            break;
          case 'green':
            this.color = 'cyan';
            break;
          case 'magenta':
            this.color = 'magenta';
            break;
          case 'yellow':
            this.color = 'white';
            break;
          case 'cyan':
            this.color = 'cyan';
            break;
        }
        break;
      case 'magenta':
        switch (component.color) {
          case 'red':
            this.color = 'magenta';
            break;
          case 'green':
            this.color = 'white';
            break;
          case 'blue':
            this.color = 'magenta';
            break;
          case 'yellow':
            this.color = 'red';
            break;
          case 'cyan':
            this.color = 'blue';
            break;
        }
        break;
      case 'yellow':
        switch (component.color) {
          case 'red':
            this.color = 'yellow';
            break;
          case 'green':
            this.color = 'yellow';
            break;
          case 'blue':
            this.color = 'white';
            break;
          case 'magenta':
            this.color = 'red';
            break;
          case 'cyan':
            this.color = 'blue';
            break;
        }
        break;
      case 'cyan':
        switch (component.color) {
          case 'red':
            this.color = 'white';
            break;
          case 'green':
            this.color = 'cyan';
            break;
          case 'blue':
            this.color = 'cyan';
            break;
          case 'magenta':
            this.color = 'blue';
            break;
          case 'yellow':
            this.color = 'green';
            break;
        }
        break;
    }
  }

  /** @function energyMultipler
  * function to account for the energy pool expanding, might move this to the tower
  */
  energyMultipler(multipler) {
    this.minDamage *= multipler;
    this.maxDamage *= multipler;
  }

  update(x, y) {
    this.x = x;
    this.y = y;
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
    ctx.stroke();
    ctx.restore();
  }
}
