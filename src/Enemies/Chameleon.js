import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor()
    {
        super(x, y, color, level);
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
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    colorChange() // if cooldown done change colors to random color
    {

    }
}