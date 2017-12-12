import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 30 + Math.round(this.level * this.healthScale); 
        this.CHP = this.MHP; // current health
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 15 + Math.round(this.level * this.bountyScale);
        this.originalColor = this.HealthColor;
        this.cooldown = 3; // temp time before next change;
    }

    update()
    {
        if (this.time >= 60)
        {
            if (this.cooldown != 0)
            {
                this.cooldown--;
            }
            this.time = 0;
        }
        this.time++;
        this.colorChange();
        if(super.update()) {
          return true;
        }
        return false; // do as all enemies do
    }

    colorChange() // if cooldown done change to next color
    {
        if (this.cooldown === 0)
        {
            switch (this.HealthColor)
            {
                    case "red":
                        this.HealthColor = "cyan";
                        break;
                    case "cyan":
                        this.HealthColor = "yellow";
                        break;
                    case "yellow":
                        this.HealthColor = "green";
                        break;
                    case "green":
                        this.HealthColor = "blue";
                        break;
                    case "blue":
                        this.HealthColor = "magenta";
                        break;
                    case "magenta":
                        this.HealthColor = "red";
                        break;
                    default:
                        break;
            }

            this.cooldown = 3;
        }
    }

    render(ctx)
    {
        super.render(ctx);

    }
}
