import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor()
    {
        super(x, y, color, level);
        this.MHP = 10; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5; // * (level * increase percentage) how much you earn

    }

    update()
    {
      die();
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
