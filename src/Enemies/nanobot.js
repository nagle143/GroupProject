import Monster from './monster.js';

export default class NanoBot extends Monster
{
    constructor() {
        super(x, y, color, level);
        this.MHP = 20; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.MS = (MHP *.2);  // max shield 20% of total health
        this.CS = MS; // current shield
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12; // * (level * increase percentage) how much you earn
        this.HPS = 5; //temp heals per second
        this.aura = 5; //temp radius of range of heal
    }

    update()
    {
        die();
        // if in range of aura heal those inside up to max health 
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    die()
    {
        if (CHP <= 0) // if tower kills monster
        {
            // add bounty to energy
            // delete monster
        }
        /**
        if ( ) //if endpoint reached 
        {
            // take away energy from player based on bounty
            //delete monster
        }
        **/
    }
}