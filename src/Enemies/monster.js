
//Monster super class
export defualt class Monster
{
    constructor(x, y, color, level, path)
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
        this.Time = 0;
        this.healthScale = .50; // increae health by 50%
        this.shieldScale = .50; // inccrease shields by 50%

        this.statusEffect[] = null;
        this.ePath[] = null;
        for (var i = 0; i < path.length; i++)
        {
            ePath[i] = path[i];
        }
    }

    update()
    {
        applyStatus(); //see if status effects need to be applied
        march(); // move foward in the path
        render();
    }

    render()
    {
    
    }

    march() // move along the path
    {

    }

    dieByHealth() // tells game if monster needs to be deleted because of death
    {
        if (CHP <= 0 && lives <= 0) // if tower kills monster
        {
            return true// tell game to delete monster
        }
        if (CHP <= 0 && lives > 0)
        {
            this.lies = this.lives - 1;
            this.CHP = this.MHP;
            return false;
        }
        return false;        
    }

    reachedEnd(energy) // tells game to kill monster if it reaches the end
    {
        if (energy.x == this.x && energy.y == this.y) //if endpoint reached 
        {
            return true;//delete monster
        }

        else
        {
            return false;
        }
    }


    status(color) // handles status effects from tower // this is wrong need to fix
    {
        if (this.CS == 0)
        {
          statusEffect.push(color);                
        }
    }





    ApplyStatus() //apply effects of status
    {

        for (var i = 0; i < statusEffect.length; i++) // go through status array to see what needs to be applied
        {
            switch (statusEffect[i])
            {
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