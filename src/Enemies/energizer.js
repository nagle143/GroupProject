import Monster from './monster.js';

export default class Energizer extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level);
        this.MHP = 5 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.MS = (MHP * 2);  // max shield 200% of total health
        this.CS = MS; // current shield
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12; // * (level * increase percentage) how much you earn
        this.SPS = MS * .98; //temp shield gained per second

    }

    update()
    {
        if (this.time = 60)
        {
            recharge();// recharge shields
            this.time = 0;
        }
        this.time++;
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    recharge()
    {
        if (this.CS < this.MS)
        {
            if (this.CS + this.SPS > this.MS)
            {
                this.CS = this.MS;
            }
            this.CS = this.CS + this.SPS;
        }
    }
}