/* building.js */

export default class Building {
  /** @constructor
   *  Constructs a new building.
   *  @param  {Integer} x     The x coordinate.
   *  @param  {Integer} y     The y coordinate.
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.coolDown = 0;
  }

  /** @function change
   *  Begins a cooldown when a change occurs.
   */
  change() {
    // Set the cool down
    this.coolDown = 180;
  }

  /** @function update
   *  Decrements the cool down unless it has reached zero.
   *  @return {Integer}   The state of the cool down.
   */
  update() {
    // Decrement the cool down
    if (this.coolDown)
      this.coolDown--;
    return this.coolDown;
  }

  /** @function render
   *  Render the building on the canvas.
   *  @param  {Context} ctx   The canvas context to render on.
   */
  render(ctx, scaleWidth, scaleHeight) {
    ctx.save();
    ctx.strokeStyle = "White";
    ctx.strokeRect(this.x, this.y, scaleWidth * 48, scaleHeight * 48);
    ctx.restore();
  }
}
