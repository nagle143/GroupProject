import Monster from './monster.js';

export default class NanoBot extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 20 + Math.round(this.level * this.healthScale);
        this.CHP = this.MHP; // current health
        this.MS = (this.MHP *.2);  // max shield 20% of total health
        this.CS = this.MS; // current shield
        this.armor = 2 + Math.round(this.level * this.armorScale); // damage reduction
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12 + Math.round(this.level * this.bountyScale); // * (level * increase percentage) how much you earn
        this.HPS = this.MHP * .98; // heal for 2% of max health per second
    }

    update()
    {
        if (this.time >= 60)
        {
            this.heal();// heal self
            this.time = 0;
        }
        this.time++;
        if(super.update()) {
          return true;
        }
        return false; // do as all enemies do
    }
    heal()
    {
        if (this.CHP < this.MHP)
        {
            if (this.CHP + this.HPS > this.MHP)
            {
                this.CHP = this.MHP;
            }
            this.CHP = this.CHP + this.HPS;
        }
    }


    render(ctx)
    {
        super.render(ctx);
        ctx.save();
        //render  stuff
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x, this.y - this.radius);
        ctx.lineTo(this.x, this.y + this.radius);
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }

}
