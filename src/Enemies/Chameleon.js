import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 30 + (this.healthScale * this.level);
        this.CHP = this.MHP; // current health
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 15 + Math.round(this.level * 1.10);
        this.originalColor = this.HealthColor;
        this.cooldown = 5; // temp time before next change;
    }

    update()
    {
        if (this.time = 60)
        {
            if (this.cooldown != 0)
            {
                this.cooldown--;
            }
            this.time = 0;
        }
        this.colorChange();
        if(super.update()) {
          return true;
        }
        return false; // do as all enemies do
    }

    colorChange() // if cooldown done change to next color
    {
        if (this.cooldown == 0)
        {
            switch (this.HealthColor)
            {
                    case "red":
                        this.color = "cyan";
                        break;
                    case "cyan":
                        this.color = "yellow";
                        break;
                    case "yellow":
                        this.color = "green";
                        break;
                    case "green":
                        this.color = "blue";
                        break;
                    case "blue":
                        this.color = "magenta";
                        break;
                    case "magenta":
                        this.color = "red";
                        break;
                    default:
                        break;
            }

            this.cooldown = 5;
        }
    }
}
