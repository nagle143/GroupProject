import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 30; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.armor = 7; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 15; // * (level * increase percentage) how much you earn
        this.originalColor = Monster.color;
        this.cooldown = 5; // temp time before next change;
    }

    update()
    {
        colorChange();
        cooldown--;
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    colorChange() // if cooldown done change to next color
    {
        if (cooldown == 0)
        {
            switch (color)
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
        }
    }
}