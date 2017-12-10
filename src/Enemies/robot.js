import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor(x, y, color, level, path, tileset)
    {
        super(x, y, color, level, path, tileset);
        this.MHP = 10 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5 + (this.level * bountyScale);

    }

    update()
    {
      super.update(); // do as all enemies do
    }
}
