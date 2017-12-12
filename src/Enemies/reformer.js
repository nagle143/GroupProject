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


    render(ctx)
    {
        super.render(ctx);
        ctx.save();
        //render  stuff
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";
        ctx.arc(this.x + this.radius / 4, this.y - this.radius / 4, this.radius, 0, Math.PI * 2);
        ctx.arc(this.x - this.radius / 4, this.y, this.radius / 4, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius / 2, 0, Math.PI);
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
