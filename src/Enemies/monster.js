
//Monster super class
export defualt class Monster
{
    constructor(x, y, color, level, path)
    {
        this.level = level 
        this.x = x;
        this.y = y;
        this.radius = 20;
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
        this.time = 0;
        this.statusTime = 0;
        this.healthScale = .50; // percentage scaling
        this.barWidth = 40;
        this.barHeight = 10;
        this.energyEarned = 0;
        this.direction = "forward";
        //this.tileset = tileset;
       // this.tileIndex = 0;
       // this.frameIndex = 0;
        this.lastPoint = 0;
        this.nextPoint = 1;

        this.statusEffect = [];
        this.ePath = [];
        for (var i = 0; i < path.length; i++)
        {
            ePath[i] = path[i];
        }
    }

    update()
    {
        applyStatus(); //see if status effects need to be applied
        march(path); // move foward in the path
        render();
    }
  
    render(ctx)
    {
        ctx.save();
        //render  stuff
        ctx.beginPath();
        ctx.fillStyle = this.HealthColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();

        //health bars
        ctx.fillStyle = 'red';
        ctx.strokeRect(this.x, this.y + 5, this.barWidth * (this.CHP/this.MHP), this.barHeight);
        ctx.fillRect(this.x, this.y + 5, this.barWidth * (this.CHP / this.MHP), this.barHeight);
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y + 10, this.barWidth * (this.CS / this.MS), this.barHeight);
        ctx.strokeRect(this.x, this.y + 10, this.barWidth * (this.CS / this.MS), this.barHeight);
        ctx.restore();
    }
    

    march(path) // move along the path
    {

        if (direction == "forward")
        {
            if (this.x < ePath[nextPoint].x && this.y == ePath[nextPoint].y) // the next point is to the right of the monster
            {
                this.x++;
            }
            if (this.x > ePath[nextPoint].x && this.y == ePath[nextPoint].y) // the next point is to the left of the monster
            {
                this.x--;
            }
            if (this.y > ePath[nextPoint].y && this.x == ePath[nextPoint].x) // the next point is below of the monster
            {
                this.y--;
            }
            if (this.x > ePath[nextPoint].x && this.x == ePath[nextPoint].x) // the next point is above the monster
            {
                this.y++;
            }
        }
        else
        {
            if (this.x < ePath[nextPoint].x && this.y == ePath[nextPoint].y) // the next point is to the right of the monster
            {
                this.x--;
            }
            if (this.x > ePath[nextPoint].x && this.y == ePath[nextPoint].y) // the next point is to the left of the monster
            {
                this.x++;
            }
            if (this.y > ePath[nextPoint].y && this.x == ePath[nextPoint].x) // the next point is below of the monster
            {
                this.y++;
            }
            if (this.x > ePath[nextPoint].x && this.x == ePath[nextPoint].x) // the next point is above the monster
            {
                this.x--;
            }
        }
        if (this.y == ePath[nextPoint].y && this.x == ePath[nextPoint].x)
        {
            nextPoint++
            lastPoint++;
        }
        if (this.y == ePath[lastPoint].y && this.x == ePath[lastPoint].x)
        {
            nextPoint--
            lastPoint--;
        }

       // var direction = Math.getDirection(this.x,this.y,path[i].x,path[i].y) 
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


    status(projectile) // handles status effects from tower // this is wrong need to fix
    {
        if (this.CS == 0)
        {
            for (var i = 0; i < statusEffect.length; i++) // check for repeats
            {
                if (statusEffect[i] == projectile.color)
                {
                    return false // has a repeat
                }
            }                     
            if (projectile.color == "magenta")
            {
              if ((Math.floor(Math.random() * 5) + 1) == 1) // 20% chance of succses if magenta
                 statusEffect.push(projectile);
            }
            else
            {
                if (projectile.color == "green" && this.armor == 0)
                {
                    return false; // no need to get rid of armor
                }
                else
                {
                    statusEffect.push(projectile);
                    return true;
                }

            }
            return true; // pushed status
        }
        return false;         
    }
    





    ApplyStatus() //apply effects of status
    {

        for (var i = 0; i < statusEffect.length; i++) // go through status array to see what needs to be applied
        {
            switch (statusEffect[i].color)
            {
                case "red":
                    statusEffect[i].time--;
                    if (burn(statusEffect[i].time, statusEffect[i].base) == true)
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                case "cyan":
                    statusEffect[i].time--;
                    if (slow(statusEffect[i].time, statusEffect[i].base) == true)
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                case "yellow":
                    statusEffect[i].time--;
                    if(stun(statusEffect[i].time))
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                case "blue":
                    statusEffect[i].time--;
                    if (energyGain(statusEffect[i].base,60) == true)
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                case "green":
                    statusEffect[i].time--;
                    if (shredArmor(, statusEffect[i].time, statusEffect[i].base) == true)
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                case "magenta":
                    statusEffect[i].time--;
                    if(Charm(statusEffect[i].time) == true)
                    {
                        statusEffect.slice(i, 1);
                    }
                    break;
                default:
                    break;
            }


        }
    }

    burn(time,base) // damage over time
    {
        if (time <= 0)
        {
            this.CHP = this.CHP - base;
            return true;
        }
        if (time % 60 == 0)
            this.CHP = this.CHP - base;
        return false;
    }

    slow(time,base) // slow based on percentage for 3 seconds
    {   
        if (time <= 0)
        {
            this.currentSpeed = this.ogSpeed;
            return true;
        }
        this.currentSpeed = this.ogSpeed * base; 
        return false;
    }

    stun(time) // stun for 2 seconds
    {
        if (time <= 0)
        {
            this.currentSpeed = this.ogSpeed;
            return true;
        }
        this.currentSpeed = 0; // stop moving
    }

    shredArmor(time,base) // destroy armor
    {
        if (time <= 0)
        {
            return true;           
        }
        if (time % 60 == 0)
            this.armor = (1 - base) * this.armor;
        return false;

    }

    energyGain(base,time) // gain more money based on a dot
    {
        if (time >= (1 * 60))
        {
            if (Math.floor(MHP * (1-base)) < 1)
            {
                energyEarned = energyEarned + 1;
            }
            else
            {
                energyEarned = energyEarned + Math.floor(MHP * .98);
            }
        }
        else
        {            
            return false;
        }

    }

    Charm(time) // walk backwards in path
    {
        if (time <= 0)
        {
            this.direction = "forward";
            return true;
        }
        this.direction = "reverse";
        return false;
       
    }    

    giveEnergy()
    {
        var give = this.energyEarned;
        energyEarned = 0;
        return give;
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