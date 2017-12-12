import Monster from './monster.js';

export default class Accelerator extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 5 + Math.round(this.level * this.healthScale); 
        this.CHP = this.MHP; // current health
        this.MS = (this.MHP * .2);  // max shield 20% of total health
        this.CS = this.MS; // current shield
        this.armor = 7; // damage reduction
        this.ogSpeed = 4;
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 8 + Math.round(this.level * this.bountyScale); // * (level * increase percentage) how much you earn
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
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.radius/2, 0, Math.PI * 2); // need to change radius
        ctx.closePath();
        ctx.fill();
    }
}
