import Monster from './monster.js';

export default class Accelerator extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 5; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.MS = (MHP * .2);  // max shield 20% of total health
        this.CS = MS; // current shield
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 8; // * (level * increase percentage) how much you earn
        this.aura = 5; // how big the buff temp
        this.buffSpeed = 5;// extra speed
    }

    update()
    {
        speedBoost();// increse speed if in aura for all monster in aura
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    speedBoost()
    {

    }
}