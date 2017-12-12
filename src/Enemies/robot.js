import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 10 + Math.round(this.level * this.healthScale); 
        this.CHP = this.MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5 + Math.round(this.level * this.bountyScale);

    }

    update()
    {
      if(super.update()) {
        return true;
      }
      return false;
    }

    render()
    {
        super.render(ctx);

    }
}
