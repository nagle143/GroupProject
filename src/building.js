import Tower from './Tower/tower.js';

export default class Building {
  constructor(x, y, tile, tw, th) {
    this.x = x;
    this.y = y;
    this.coolDown = 0;
    this.tile = tile;
    this.tileWidth = tw;
    this.tileHeight = th;
  }

  change() {
    this.coolDown = 180;
  }

  update() {
    if (this.coolDown)
      this.coolDown--;
    return this.coolDown;
  }

  render() {
    ctx.drawImage(
      // The source image
      this.tile.image,
      // The portion of the source image to draw
      this.tile.sx,
      this.tile.sy,
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
