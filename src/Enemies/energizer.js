import Monster from './monster.js';

export default class Energizer extends Monster
{
    constructor()
    {
        super();
        this.SPS = 5; //temp shield gained per second
        this.aura = 5; // range of radius shield increasing
    }

    update()
    {
        // if in range recharge shields by SPS up to max + 20%
        super.update(); // do as all enemies do
    }

    render()
    {

    }
}