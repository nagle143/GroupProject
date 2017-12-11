/* tileset.js */

export default class Tileset {
  /** @constructor
   *  Constructs a new tileset.
   *  @param  {[type]} tilesetData  The object containing data for the tileset.
   */
  constructor() {
    this.tiles;
    this.tileWidth;
    this.tileHeight;
    this.image;
    this.default;
  }

  load(tilesetData, fun) {
    let frames = [], tile, id = 1, x, y;

    this.tiles = [];
    this.tileWidth = tilesetData.tilewidth;
    this.tileHeight = tilesetData.tileheight;

    this.image = new Image();
    this.image.onload = fun;
    this.image.src = './Tilesets/' + tilesetData.image;
    document.body.appendChild(this.image);

    // Create tiles from the image
    for(let id = 1; id <= tilesetData.tilecount; id++) {
      frames = [];
      tile = toString(id - 1);
      x = (id - 1) % tilesetData.columns;
      y = (id - x - 1) / tilesetData.columns;

      // Create the frames for animations, otherwise create single frame for tile
      if(tilesetData.tiles) {
        if (tilesetData.tiles.hasOwnProperty(tile)) {
          if (tilesetData.tiles[tile].animation) {
            tilesetData.tiles[tile].animation.forEach(frame => {
              // Get location of frame
              x = (frame.tileid - 1) % tilesetData.columns;
              y = (frame.tileid - x - 1) / tilesetData.columns;

              // Add frame to animation
              frames.push({
                dur: frame.duration,
                x: x,
                y: y
              });
            });
          } else
            frames.push({dur: 0, x: x, y: y});
        } else
          frames.push({dur: 0, x: x, y: y});
      }
      else
        frames.push({dur: 0, x: x, y: y});
      this.tiles[id] = {
        image: this.image,
        frames: frames
      };
    }
  }
}
