//Monster super class

export defualt class Monster
{
    constructor(x, y, MHP,color,ogSpeed,armor,bounty)
    {

        this.x = x;
        this.y = y;
        this.MHP = MHP; //max health
        this.CHP = MHP; // current health
        this.MS = 0;  // max shield
        this.CS = 0; // current shield
        this.HealthColor = color;
        this.ogSpeed = ogSpeed; // oringal speed of a monster
        this.armor = armor;
        this.bounty = bounty;
        this.statusEffect = null;

    }

    update()
    {
        status(); //see if status effects need to be applied
        die(); //see if dead
        march(); // move foward in the path
    }

    render()
    {
    
    }

    die()
    {
        if (CHP == 0) // if tower kills monster
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

    march() // move along the path
    {

    }


    status() // handles status effects from tower
    {

    }
}




/**
types
normal - Robot
speed buff - Accelerator
healing - nanobot
shield buffing - Energizer
undying - reformer
tower disable - emp bot
color changing - Chameleon
**/