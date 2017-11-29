import Monster from './monster.js';

export default class Reformer extends Monster
{
    constructor()
    {
        super(x, y, color, level);
        this.MHP = 10; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.armor = 5; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 7; // * (level * increase percentage) how much you earn
        this.lives = 1; // number of times can come back from the dead

    }

    update()
    {
        die();
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    die()
    {
        if (CHP <= 0 && lives <=0) // if tower kills monster
        {
            // add bounty to energy
            // delete monster
        }

        if (CHP <= 0 && lives > 0)
        {
            this.lies = this.lives - 1;
            this.CHP = this.MHP;
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