import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 10 + (this.healthScale * this.level);
        this.CHP = this.MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5 + Math.round(this.level * 1.10);

    }

    update()
    {
      if(super.update()) {
        return true;
      }
      return false;
    }
}
