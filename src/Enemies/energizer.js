import Monster from './monster.js';

export default class Energizer extends Monster
{
    constructor()
    {
        super(x, y, color, level);
        this.MHP = 5; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.MS = (MHP * 2);  // max shield 200% of total health
        this.CS = MS; // current shield
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12; // * (level * increase percentage) how much you earn
        this.SPS = 5; //temp shield gained per second
        this.aura = 5; // range of radius shield increasing
    }

    update()
    {
        die();
        // if in range recharge shields by SPS up to max + 20%
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    die() {
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