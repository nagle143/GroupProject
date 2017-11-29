

export default class Maps {
  constructor(tilemapData) {
    // Load the map data
    this.mapWidth = tilemapData.width;
    this.mapHeight = tilemapData.height;
    this.tileWidth = tilemapData.tilewidth;
    this.tileHeight = tilemapData.tileheight;
    this.tiles = [];
    this.tileLayers = [];
    this.spawns = [];
    this.buildable = [];
    this.target = undefined;

    // Load our tiles from tilesets
    let image, id;
    tilemapData.tilesets.forEach((tileset) => {
      // Create an image for the tileset's image
      image = new Image();
      image.src = tileset.image;

      // Create tiles for tileset
      id = tileset.firstgid;
      for(let y = 0; y < tileset.imageheight; y += tileset.tileheight) {
        for(let x = 0; x < tileset.imagewidth; x += tileset.tilewidth) {
          this.tiles[id] = {
            image: image,
            sx: x,
            sy: y
          };
          id++;
        }
      }
    });

    for (let i = 0; i < tilemapData.properties.spawns; i++) {
      this.spawns.push(null);
    }

    let data, obj,  newLayer;
    tilemapData.layers.forEach((layer) => {
      switch (layer.type) {
        case 'tilelayer':
          data = undefined;

          if (this.tiles.length < 255) {
            data = new Uint8Array(layer.data);
          } else if (this.tiles.length < 65535) {
            data = new Uint16Array(layer.data);
          } else if (this.tiles.length < 4294967295) {
            data = new Uint32Array(layer.data);
          } else {
            throw "Tile indices too large to store";
          }

          newLayer = {
            name: layer.name,
            visible: layer.visible,
            data: data
          };

          this.tileLayers.push(newLayer);
          break;
        case 'objectgroup':
          layer.objects.forEach((object) => {
            obj = {
              x: object.x,
              y: object.y
            };

            if (object.hasOwnProperty('tid')) {
              switch (object.tid) {
                case 1:
                  obj.type = 'Spawn';
                  obj.id = object.properties.id;
                  obj.path = [];
                  for (let i = 0; i < object.properties.steps; i++) {
                    obj.path.push(null);
                  }
                  this.spawns[obj.id] = obj;
                  break;
                case 2:
                  obj.type = 'Path';
                  obj.id = object.properties.id;
                  obj.step = object.properties.step;
                  this.spawns[obj.id][obj.step] = obj;
                case 3:
                  obj.type = 'Target';
                  obj.energy = object.properties.energy;
                  this.target = obj;
                  break;
                default:
                  console.log("Unknown Object Type ID: ", object.tid);
                  break;
              }
            } else if (object.hasOwnProperty('type')) {
              obj.type = object.type;
              switch (object.type) {
                case 'Placement':
                  obj.onPath = object.properties.onPath;
                  this.buildable.push(obj);
                  break;
                default:
                  console.log("Unknown Object Type: ", object.type);
                  break;
              }
            }
          });
          break;
        default:
          console.log("Unknown Layer Type: ", layer.type);
          break;
      }
    });
  }

  update() {

  }

  render(ctx) {
    let tileIndex, tile;

    this.tileLayers.forEach((layer) => {
      if (layer.visible) {
        for(let y = 0; y < this.mapHeight; y++) {
          for(let x = 0; x < this.mapWidth; x++) {
            tileIndex = layer.data[y * this.mapWidth + x];
            // Skip non-existant tiles
            if(tileIndex === 0) continue;
            tile = this.tiles[tileIndex];
            // Don't draw a non-existant image
            if (!tile.image) continue;
            ctx.drawImage(
              // The source image
              tile.image,
              // The portion of the source image to draw
              tile.sx,
              tile.sy,
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
