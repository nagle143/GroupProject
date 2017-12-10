import Monster from './monster.js';

export default class Reformer extends Monster
{
    constructor(x, y, color, level, path, tileset)
    {
        super(x, y, color, level, path, tileset);
        this.MHP = 10 + (this.healthScale * this.level);
        this.CHP = MHP; // current health
        this.armor = 5; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 7; // * (level * increase percentage) how much you earn
        this.lives = 1; // number of times can come back from the dead
    }

    update()
    {
        super.update(); // do as all enemies do
    }

}