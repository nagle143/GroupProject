import Monster from './monster.js';

export default class EMPbot extends Monster
{
    constructor()
    {
        super();
        this.range = 5; // temp how far of shutdown reach
        this.shutdowntime = 2; // temp time tower is shutdown
        this.cooldown = 5; // temp time till next shutdown 
    }

    update()
    {
        //if cooldown is done and a tower is in range shutdown
        super.update(); // do as all enemies do
    }

    render()
    {

    }
}