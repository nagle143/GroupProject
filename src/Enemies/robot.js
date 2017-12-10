import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 10 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5; // * (level * increase percentage) how much you earn

    }

    update()
    {
      super.update(); // do as all enemies do
    }

    render()
    {
    
    }
}
