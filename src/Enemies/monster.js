
//Monster super class
export default class Monster
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
        this.ogSpeed = 2; // oringal speed of a monster
        this.currentSpeed = 0; // current speed of a monster
        this.speed = {x: 0.0, y: 0.0};
        this.armor = 0;
        this.bounty = 1;

        //What is this?
        this.lives = 0;// exclusively for reformer to see how many times he can come back

        this.time = 0;

        this.healthScale = 1.10; // percentage scaling
        this.armorScale = 0.50;
        this.bountyScale = 1.10;  

        this.barWidth = 40;
        this.barHeight = 5;

        this.energyEarned = 0;

        this.movement = "forward"
        this.direction = 0.0;
        this.lastPoint = 0;
        this.nextPoint = 1;
        this.statusEffect = [];
        this.path = path;
    }

    update() // needs to be updated to go opposite direction incase of charm
    {
        this.ApplyStatus(); //see if status effects need to be applied
        if (movement == "forward")
        {
            this.direction = Math.getDirection(this.x, this.y, this.path[this.nextPoint].x, this.path[this.nextPoint].y);
            this.setSpeeds();
            this.x += this.speed.x;
            this.y += this.speed.y;
            if (this.checkPoint(this.path[this.nextPoint]))
            {
                if (this.nextPoint >= this.path.length - 1)
                {
                    return true;
                }
                else
                {
                    this.nextPoint++;
                    this.lastPoint++;
                }
            }           
        }
        else // walk backwards
        {
            this.direction = Math.getDirection(this.x, this.y, this.path[this.lastPoint].x, this.path[this.lastPoint].y);
            this.setSpeeds();
            this.x += this.speed.x;
            this.y += this.speed.y;
            if (this.checkPoint(this.path[this.lastPoint]))
            {
                if (this.lastPoint <= 0) //dont go back further than last point
                {
                    this.currentSpeed = 0;
                    return false;
                }
                else
                {
                    this.nextPoint--;
                    this.lastPoint--;
                }
            }
        }
        return false;
    }

    render(ctx)
    {
        //var rad = this.radius * scaleRadius
        ctx.save();
        //render  stuff
        ctx.beginPath();
        ctx.fillStyle = this.HealthColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); // need to change radius
        ctx.closePath();
        ctx.fill();

        //health bars
        ctx.fillStyle = 'red';
        ctx.strokeRect(this.x - this.radius, this.y - Math.round(this.radius * 1.40), this.barWidth * (this.CHP/this.MHP), this.barHeight);
        ctx.fillRect(this.x - this.radius, this.y - Math.round(this.radius * 1.40), this.barWidth * (this.CHP / this.MHP), this.barHeight);
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x - this.radius, this.y - Math.round(this.radius * 1.60), this.barWidth * (this.CS / this.MS), this.barHeight);
        ctx.strokeRect(this.x - this.radius, this.y - Math.round(this.radius * 1.60), this.barWidth * (this.CS / this.MS), this.barHeight);
        ctx.restore();
    }

    setSpeeds() {
      this.speed.x = Math.sin(this.direction) * this.currentSpeed;
      this.speed.y = -Math.cos(this.direction) * this.currentSpeed;
    }

    checkPoint(point) {
      let dx = this.x - point.x;
      let dy = this.y - point.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if(dist <= this.radius * 0.5) {
        return true;
      }
      return false;
    }

    /* This can be done elsewhere
    dieByHealth() // tells game if monster needs to be deleted because of death
    {
        if (this.CHP <= 0) // if tower kills monster
        {
            return true// tell game to delete monster
        }
        if (this.CHP <= 0)
        {
            this.lies = this.lives - 1;
            this.CHP = this.MHP;
            return false;
        }
        return false;
    }*/

    /* This should be done by the game
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
    } */

    //Why return anything? for testing!
    status(projectile) // handles status effects from tower 
    {
        if (this.CS == 0)
        {
            for (var i = 0; i < this.statusEffect.length; i++) // check for repeats
            {
                if (this.statusEffect[i] == projectile.color)
                {
                    return false // has a repeat
                }
            }
            if (projectile.color == "magenta")
            {
              if (Math.random() <= 0.20) // 20% chance of succses if magenta
                this.statusEffect.push(projectile);
            }
            else
            {
                if (projectile.color == "green" && this.armor == 0)
                {
                    return false; // no need to get rid of armor
                }
                else
                {
                    this.statusEffect.push(projectile);
                    return true;
                }

            }
            return true; // pushed status
        }
        return false;
    }






    ApplyStatus() //apply effects of status
    {

        for (var i = 0; i < this.statusEffect.length; i++) // go through status array to see what needs to be applied
        {
            switch (this.statusEffect[i].color)
            {
                case "red":
                    this.statusEffect[i].time--;
                    if (this.burn(this.statusEffect[i].time, this.statusEffect[i].base) == true)
                    {
                        this.statusEffect.slice(i, 1);
                    }
                    break;
                case "cyan":
                    this.statusEffect[i].time--;
                    if (this.slow(this.statusEffect[i].time, this.statusEffect[i].base) == true)
                    {
                        this.statusEffect.slice(i, 1);
                    }
                    break;
                case "yellow":
                    this.statusEffect[i].time--;
                    if(this.stun(this.statusEffect[i].time))
                    {
                        this.statusEffect.slice(i, 1);
                    }
                    break;
                case "blue":
                    this.statusEffect[i].time--;
                    if (this.energyGain(this.statusEffect[i].base,60) == true)
                    {
                        this.statusEffect.slice(i, 1);
                    }
                    break;
                case "green":
                    this.statusEffect[i].time--;
                    if (this.shredArmor(this.statusEffect[i].time, this.statusEffect[i].base) == true)
                    {
                        this.statusEffect.slice(i, 1);
                    }
                    break;
                case "magenta":
                    this.statusEffect[i].time--;
                    if(this.Charm(this.statusEffect[i].time) == true)
                    {
                        this.statusEffect.slice(i, 1);
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
            if (Math.floor(this.MHP * (1-base)) < 1)
            {
                this.energyEarned = this.energyEarned + 1;
            }
            else
            {
                this.energyEarned = this.energyEarned + Math.floor(this.MHP * .98);
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
            this.movement = "forward";
            this.currentSpeed = this.ogSpeed;
            return true;
        }
        this.movement = "reverse";
        return false;

    }

    giveEnergy()
    {
        var give = this.energyEarned;
        this.energyEarned = 0;
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
