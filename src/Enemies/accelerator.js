import Monster from './monster.js';

export default class Accelerator extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 5 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.MS = (MHP * .2);  // max shield 20% of total health
        this.CS = MS; // current shield
        this.armor = 7; // damage reduction
        this.orgSpeed = 10;
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 8 + (this.level * bountyScale); // * (level * increase percentage) how much you earn
    }
     
    update()
    {
        super.update(); // do as all enemies do
    }
}