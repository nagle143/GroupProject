import Monster from './monster.js';

export default class Accelerator extends Monster
{
    constructor()
    {
        super();
        this.aura = 5; // how big the buff temp
        this.buffSpeed = 5;// extra speed
    }

    update()
    {
        // increse speed if in aura for all monster in aura
        super.update(); // do as all enemies do
    }

    render()
    {

    }

}