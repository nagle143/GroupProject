import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor()
    {
        super();
        this.originalColor = Monster.color;
        this.cooldown = 5; // temp time before next change;
    }

    update()
    {
        // if cooldown done change colors to next color in the color wheel
        super.update(); // do as all enemies do
    }

    render()
    {

    }
}