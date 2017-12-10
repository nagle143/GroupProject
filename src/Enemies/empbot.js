import Monster from './monster.js';

export default class EMPbot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 10 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.MS = (MHP * .5);  // max shield 
        this.CS = MS; // current shield
        this.armor = 5; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 9; // * (level * increase percentage) how much you earn
        this.range = 5; // temp how far of shutdown reach
        this.shutdowntime = 2; // temp time tower is shutdown
        this.cooldown = 5; // temp time till next shutdown 

    }

    update()
    {
        shutDown();//if cooldown is done and a tower is in range shutdown
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    shutDown()
    {

    }

    // unused
}