import Monster from './monster.js';

export default class Chameleon extends Monster
{
    constructor()
    {
        super();
        this.originalColor = Monster.color;
        this.cooldown = 5; // temp time before next change;
    }

    update() {

    }

    render() {

    }
}