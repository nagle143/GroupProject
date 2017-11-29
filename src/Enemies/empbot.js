import Monster from './monster.js';

export default class EMPbot extends Monster
{
    constructor()
    {
        super(x, y, color, level);
        this.MHP = 10; //* (level * increase percentage) max health regular health and increase times the level
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
        die();
        //if cooldown is done and a tower is in range shutdown
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