export default class Building {
  /** @constructor
   *  Constructs a new building.
   *  @param  {Integer} x     The x coordinate.
   *  @param  {Integer} y     The y coordinate.
   *  @param  {Object} tile   The tile to display for the building.
   *  @param  {Integer} tw    The width of the tile.
   *  @param  {Integer} th    The height of the tile.
   */
  constructor(x, y, tile, tw, th) {
    this.x = x;
    this.y = y;
    this.coolDown = 0;
    this.tile = tile;
    this.tileWidth = tw;
    this.tileHeight = th;
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
  render(ctx) {
    ctx.drawImage(
      // The source image
      this.tile.image,
      // The portion of the source image to draw
      this.tile.frames[0].x,
      this.tile.frames[0].y,
      this.tileWidth,
      this.tileHeight,
      // Where to draw the tile on-screen
      this.x,
      this.y,
      this.tileWidth,
      this.tileHeight
    );
  }
}
