
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
        this.lives = 0;
        this.statusEffect[] = null;
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

    die(eX, eY, energy) // coded wrong i think energy not by refrence
    {
        if (CHP <= 0 && lives <= 0) // if tower kills monster
        {
            energy = energy + bounty;// add bounty to energy
            return true// tell game to delete monster
        }

        if (CHP <= 0 && lives > 0)
        {
            this.lies = this.lives - 1;
            this.CHP = this.MHP;
            return false;
        }
        
        if (eX == this.x && eY == this.y) //if endpoint reached 
        {
            energy = energy - bounty; // take away energy from player based on bounty
            return true;//delete monster
        }
    }


    status(color, time) // handles status effects from tower // this is wrong need to fix
    {
        if (this.CS == 0)
        {
            switch (color) {
                case "red":
                    burn(time);
                    break;
                case "cyan":
                    slow(time);
                    break;
                case "yellow":
                    stun(time);
                    break;
                case "green":
                    shredArmor();
                    break;
                case "blue":
                    energyGain();
                    break;
                case "magenta":
                    Charm(time);
                    break;
                default:
                    break;
            }
        }
    }

    // all status effects only apply if shields at 0

    burn(time) // damage over time
    {
        var damage = CHP * 0.98; // deal 2% of max health
        //deal this damage based on the time 
    }

    slow(time) // slow based on percentage
    {

        this.currentSpeed = this.currentSpeed * 0.25; // slow by 25%
    }

    stun(time) // stun 
    {
        this.currentSpeed = 0; // stop moving
    }

    shredArmor() // destroy armor
    {
        this.armor = this.armor * 0.90; // destroys 10 % of armor
    }

    energyGain() // gain more money based on a dot
    {

    }

    Charm(time) // walk backwards in path
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