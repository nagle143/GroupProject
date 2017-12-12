import Monster from './monster.js';

export default class Reformer extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 10 + Math.round(this.level * this.healthScale); 
        this.CHP = this.MHP; // current health
        this.armor = 5; // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 7 + Math.round(this.level * this.bountyScale);
        this.lives = 1; // number of times can come back from the dead
    }

    update()
    {
      if(super.update()) {
        return true;
      }
      return false; // do as all enemies do
    }


    render()
    {
        super.render(ctx);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - this.radius);
        ctx.lineTo(this.x + this.raduis / 6, this.y - this.radius);
        ctx.lineTo(this.x + this.raduis / 6, this.y + this.radius / 6);
        ctx.lineTo(this.x + this.raduis / 3, this.y + this.radius / 6);
        ctx.lineTo(this.x + this.raduis / 3, this.y - this.radius / 6);
        ctx.lineTo(this.x - this.raduis / 3, this.y + this.radius / 6);
        ctx.lineTo(this.x - this.raduis / 3, this.y + this.radius / 2);

    }
}
