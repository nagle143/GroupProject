import towerSprites from './towerSet.json';
import enemySprites from './enemySet.json';
import mapTiles01 from './tileSet01.json';
import mapTiles02 from './tileSet02.json';

import towerImage from './towerSet.png';
import enemyImage from './enemySet.png';
import mapImage01 from './tileSet01.png';
import mapImage02 from './tileSet02.png';

export var tilesetFiles = [towerSprites, enemySprites, mapTiles01, mapTiles02];
export var imageFiles = [`.${towerImage}`, `.${enemyImage}`, `.${mapImage01}`, `.${mapImage02}`];
