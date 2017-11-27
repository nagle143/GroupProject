//Monster super class

export defualt class Monster
{
    constructor(x, y, MHP,CHP,color,speed,armor,bounty)
    {

        this.x = x;
        this.y = y;
        this.MHP = MHP; //max health
        this.CHP = CHP; // current health
        this.MS = 0;  // max shield
        this.CS = 0; // current shield
        this.HealthColor = color;
        this.speed = speed;
        this.armor = armor;
        this.bounty = bounty;
        this.statusEffect = null;

    }

    update()
    {
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