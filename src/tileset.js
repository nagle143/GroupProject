/* tileset.js */

export default class Tileset {
  /** @constructor
   *  Constructs a new tileset.
   *  @param  {[type]} tilesetData  The object containing data for the tileset.
   */
  constructor(tilesetData) {
    let frames = [], tile, id = 1, x;

    // Initialize the properties
    this.tiles = [];
    this.image = new Image();
    this.default = new Image();

    // Save the tileset's image
    this.image.src = '../Public/Tilesets/' + tilesetData.image;
    this.default.src = '../Public/Tilesets/' + tilesetData.image;

    // Create tiles from the image
    for(let id = 1; id <= tilesetData.tilecount; id++) {
      tile = toString(id - 1);
      x = (id - 1) % tilesetData.columns;
      y = (id - x - 1) / tilesetData.columns;

      // Create the frames for animations, otherwise create single frame for tile
      if (tilesetData.tiles.hasOwnProperty(tile)) {
        if (tilesetData.tiles[tile].hasOwnProperty('animation')) {
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

      this.tiles[id] = {
        image: this.image,
        default: this.default,
        frames: frames
      };
    }
  }

  /** @function reset
   *  Resets the image to the default image.
   */
  reset() {
    this.image.src = this.default.src;
  }

  /** @function changeImage
   *  Changes the reference image for the tileset.
   *  @param  {String} path The path to the new image.
   */
  changeImage(path) {
    this.image.src = path;
  }
}
