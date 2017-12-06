/* map.js */

export default class Map {
  /** @constructor
   *  Constructs a new map.
   *  @param  {Object} tilemapData  The object containing data for the map.
   *  @param  {Tileset} tileset     A functional tileset object.
   */
  constructor(tilemapData, tileset) {
    let data, obj, tx, ty;

    // Initialize the properies
    this.mapWidth = tilemapData.width;
    this.mapHeight = tilemapData.height;
    this.tileWidth = tilemapData.tilewidth;
    this.tileHeight = tilemapData.tileheight;
    this.tileset = tileset;
    this.tileLayers = [];
    this.animations = [];
    this.paths = [];
    this.buildable = [];
    this.target = undefined;

    // Build each layer
    tilemapData.layers.forEach((layer) => {
      switch (layer.type) {
        case 'tilelayer':
          // Insert the tile data in a real array
            data = undefined;
          if (tileset.tiles.length < 255)
            data = new Uint8Array(layer.data);
          else if (tileset.tiles.length < 65535)
            data = new Uint16Array(layer.data);
          else if (tileset.tiles.length < 4294967295)
            data = new Uint32Array(layer.data);
          else
            throw "Tile indices too large to store";

          // Add the layer onto the list of tile layers
          this.tileLayers.push({
            name: layer.name,
            visible: layer.visible,
            data: data
          });
          break;
        case 'objectgroup':
          layer.objects.forEach((object) => {
            // Initialize the translated object.
            obj = {
              type: object.type
            };

            // Figure out what object is being built
            switch (object.type) {
              case 'Path':
                obj.id = object.properties.id - 1;
                obj.steps = object.polyline;
                this.paths[obj.id] = obj;
                break;
              case 'Generator':
                obj.cx = object.x + object.width / 2;
                obj.cy = object.y + object.height / 2;
                this.target = obj;
                break;
              case 'Buildable':
                obj.onPath = object.properties.onPath;
                obj.points = object.polygon;
                tx = 0;
                ty = 0;
                object.polygon.foreach(point => {
                  tx += point.x;
                  ty += point.y;
                });
                obj.cx = tx / object.polygon.length;
                obj.cy = ty / object.polygon.length;
                this.buildable.push(obj);
                break;
              default:
                console.log("Unknown Object Type: ", object.type);
                break;
            }
          });
          break;
        default:
          console.log("Unknown Layer Type: ", layer.type);
          break;
      }
    });

    // Setup all the controllers for the animations
    tileset.tiles.forEach(tile => {
      this.animations.push({
        frame: 0,
        frameMax: tile.frames.length,
        count: tile.frames[0].dur,
        times: tile.frames.map(frame => frame.dur)
      });
    });
  }

  /** @function update
   *  Updates all the animations in the map.
   */
  update() {
    for (let a = 0; a < this.animations.length; a++) {
      // Don't animate tiles without additional frames
      if (this.animations[a].frameMax === 1)
        continue;

      // Decrement the counter, otherwise rollover to next frame.
      if (this.animations[a].count)
        this.animations[a].count--;
      else {
        this.animations[a].frame = (this.animations[a].frame + 1) % this.animations[a].frameMax;
        this.animations[a].count = this.animations[a].times[this.animations[a].frame];
      }
    }
  }

  /** @function render
   *  Renders all the tiles on the map.
   *  @param  {Context} ctx The canvas context for rendering the map.
   */
  render(ctx) {
    let tileIndex, tile, frame;

    this.tileLayers.forEach((layer) => {
      if (layer.visible) {
        for(let y = 0; y < this.mapHeight; y++) {
          for(let x = 0; x < this.mapWidth; x++) {
            tileIndex = layer.data[y * this.mapWidth + x];

            // Skip non-existant tiles
            if(tileIndex === 0)
              continue;
            tile = this.tileset.tiles[tileIndex];

            // Don't draw a non-existant image
            if (!tile.image)
              continue;
            frame = tile.frames[this.animations[tileIndex].frame];

            ctx.drawImage(
              // The source image
              tile.image,
              // The portion of the source image to draw
              frame.x,
              frame.y,
              this.tileWidth,
              this.tileHeight,
              // Where to draw the tile on-screen
              x * this.tileWidth,
              y * this.tileHeight,
              this.tileWidth,
              this.tileHeight
            );
          }
        }
      }
    });
  }
}
