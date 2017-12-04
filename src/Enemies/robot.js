import Monster from './monster.js';

export default class Robot extends Monster
{
    constructor()
    {
        super(x, y, color, level);
        this.MHP = 10; //* (level * increase percentage) max health regular health and increase times the level
        this.CHP = MHP; // current health
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 5; // * (level * increase percentage) how much you earn

    }

    update()
    {
      super.update(); // do as all enemies do
    }

    render()
    {
    
    }
}
