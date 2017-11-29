import Monster from './monster.js';

export default class NanoBot extends Monster {
    constructor()
    {
        super();
        this.HPS = 5; //temp heals per second
        this.aura = 5; //temp radius of range of heal

    }

    update()
    {
        // if in range of aura heal those inside up to max health 
        super.update(); // do as all enemies do
    }

    render() {

    }