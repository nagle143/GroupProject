import Monster from './monster.js';

export default class NanoBot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 20 + (this.healthScale * this.level);
        this.CHP = this.MHP; // current health
        this.MS = (this.MHP *.2);  // max shield 20% of total health
        this.CS = this.MS; // current shield
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12; // * (level * increase percentage) how much you earn
        this.HPS = this.MHP * .98; // heal for 2% of max health per second
    }

    update()
    {
        if (this.time = 60)
        {
            this.heal();// heal self
            this.time = 0;
        }
        this.time++;
        if(super.update()) {
          return true;
        }
        return false; // do as all enemies do
    }
    heal()
    {
        if (this.CHP < this.MHP)
        {
            if (this.CHP + this.HPS > this.MHP)
            {
                this.CHP = this.MHP;
            }
            this.CHP = this.CHP + this.HPS;
        }
    }

}
