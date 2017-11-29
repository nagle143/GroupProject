//Monster super class

export defualt class Monster
{
    constructor(x, y,color,level)
    {
        this.level = level 
        this.x = x;
        this.y = y;
        this.MHP = 1; //max health
        this.CHP = 1; // current health
        this.MS = 0;  // max shield
        this.CS = 0; // current shield
        this.HealthColor = color;
        this.ogSpeed = 5; // oringal speed of a monster
        this.currentSpeed = 0; // current speed of a monster
        this.armor = 0;
        this.bounty = 1;
        this.statusEffect = null;
    }

    update()
    {
        status(); //see if status effects need to be applied
        march(); // move foward in the path
    }

    render()
    {
    
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