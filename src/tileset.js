export default class Tileset {
  constructor(tilesetData) {
    this.tiles = [];

    // Create an image for the tileset's image
    let image = new Image();
    image.src = tilesetData.image;

    // Create tiles for tileset
    let id = 1;
    for(let y = 0; y < tilesetData.imageheight; y += tilesetData.tileheight) {
      for(let x = 0; x < tilesetData.imagewidth; x += tilesetData.tilewidth) {
        this.tiles[id] = {
          image: image,
          sx: x,
          sy: y
        };
        id++;
      }
    }
  }
}
