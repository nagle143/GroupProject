import Monster from './monster.js';

export default class Accelerator extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 5 + (this.healthScale * this.level);
        this.CHP = this.MHP; // current health
        this.MS = (this.MHP * .2);  // max shield 20% of total health
        this.CS = this.MS; // current shield
        this.armor = 7; // damage reduction
        this.ogSpeed = 4;
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 8 + Math.round(this.level * 1.10); // * (level * increase percentage) how much you earn
    }

    update()
    {
      if(super.update()) {
        return true;
      }
      return false; // do as all enemies do
    }
}
