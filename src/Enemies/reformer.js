import Monster from './monster.js';

export default class Reformer extends Monster
{
    constructor()
    {
        super();
        this.lives = 1; // number of times can come back from the dead

    }

    update()
    {
        super.update(); // do as all enemies do
    }

    render()
    {

    }

    die()
    {
        // if max hp goes to 0 consume 1 life and return to 100%
    }

}