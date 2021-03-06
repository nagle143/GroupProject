import Monster from './monster.js';

export default class Energizer extends Monster
{
    constructor(x, y, color, level, path)
    {
        super(x, y, color, level, path);
        this.MHP = 5 + Math.round(this.level * this.healthScale); 
        this.CHP = this.MHP; // current health
        this.MS = (this.MHP * 2);  // max shield 200% of total health
        this.CS = this.MS; // current shield
        this.armor = 2 + Math.round(this.level * this.armorScale);
        this.currentSpeed = this.ogSpeed; // current speed
        this.bounty = 12 + Math.round(this.level * this.bountyScale);
        this.SPS =this. MS * .98; //temp shield gained per second

    }

    update()
    {
        if (this.time >= 60)
        {
            this.recharge();// recharge shields
            this.time = 0;
        }
        this.time++;
        if(super.update()) {
          return true;
        }
        return false; // do as all enemies do
    }

    recharge()
    {
        if (this.CS < this.MS)
        {
            if (this.CS + this.SPS > this.MS)
            {
                this.CS = this.MS;
            }
            this.CS = this.CS + this.SPS;
        }
    }


    render(ctx)
    {
        super.render(ctx);
        ctx.save();
        //render  stuff
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(this.x - this.radius, this.y);
        ctx.lineTo(this.x + this.radius, this.y);
        ctx.lineWidth = 5;
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}
