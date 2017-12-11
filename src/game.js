
import Tileset from './tileset.js';
import {tilesetFiles} from './Tilesets/index.js';
import Map from './map.js';
import {mapFiles} from './Maps/index.js';
import Tower from './Tower/tower.js';
import Color from './Tower/colorComponents.js';
import Powers from './powers.js';
import Energy from './energy.js';
import Building from './building.js';
//import Monster from './Enemies/monster.js';
import Wave from './wave.js';

//Import Projectiles
import Plasma from './Tower/Projectiles/plasma.js';
import Grenade from './Tower/Projectiles/grenade.js';
import Rail from './Tower/Projectiles/rail.js';
import Light from './Tower/Projectiles/light.js';
import AOE from './Tower/Projectiles/aoe.js';
import Beam from './Tower/Projectiles/beam.js';
import ChainShot from './Tower/Projectiles/chainshot.js';
//import {} from './Tilesets/tileSet01.png';

/* Math Modifications */

/** @function Math.randomBetween()
  * Math prototype function built to easily create ranom floats
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random float between the parameters
  */
Math.randomBetween = function (min, max) {
  return Math.random() * (max - min) + min;
};

/** @function Math.randomInt()
  * Math prototype function built to easily create ranom integers
  * @param float min - the lowest number you want
  * @param float max - the highest number you want (I beleive it is non-inclusive)
  * @returns random integer between the parameters
  */
Math.randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/** @function Math.
*
*/
Math.getDirection = function(x, y, x2, y2) {
  let dx = x - x2;
  let dy = y - y2;
  let dist = Math.sqrt(dx * dx + dy * dy);
  let direction = Math.acos(dy/dist);
  if(dx > 0) {
    direction *= -1;
  }
  return direction;
}

/* Game Class */

export default class Game {
  constructor() {
    // Create the tilesets used by the other assets
    this.tilesets = [];
    tilesetFiles.forEach(file => {
      this.tilesets.push(new Tileset());
    });
    this.bool=true;
    this.ButtonsRec={x:560,y:580,width:140,height:120};
    this.inventoryRec={x:566,y:184,width:126,height:224}
    this.firstCombineSlot={x:570 ,y:130 ,width:17, height:17,Taken:false,id:'combineSlot1',gemId:null};
    this.secondCombineSlot={x:610 ,y:130 ,width:17, height:17,Taken:false,id:'combineSlot2',gemId:null};
    this.initialX=null;
    this.initialY=null;
    //console.log(this.tilesets);

    //Still testing these power variables
    /*
    this.activePowers = [];
    this.powers = ["Bombardment, Nanites, Freeze"];
    this.powerTimers = [600, 2400, 1200];
    */
    //This is the energy objects, needs the location from the map
    /*this.var buttonsFunctions=[
                        [(index)=>CreateGreenGem(index),(index)=>CreateBlueGem(index)],
                        [(index)=>CreateRedGem(index),(index)=>CombineButton()],
                        [()=>CreateRedGem(),"sixth"]
                      ];
                      */
    this.energy = new Energy(900, 900, 500);
    //All of the Tower objects
    this.towers = [];
    this.GemInventory = [];
    //Sotres all the currently rendered projectiles
    this.projectiles = [];
    this.nextWave = new Wave();
    this.currWave = new Wave();

    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = 1000;
    this.backBufferCanvas.height = 1000;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = 1000;
    this.screenBufferCanvas.height = 1000;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.loop = this.loop.bind(this);
    this.render = this.render.bind(this);
    this.setup = this.setup.bind(this);
    //60fps
    //this.createInv(7,4,17,17,0,570,170);
  }
///creating gems functions
/*
  CreateCombinedGem(gem1Id,gem2Id,gemInventoryIndex){


    var div=document.createElement('div');
    div.style.width="17px";
    div.style.height="17px";
    div.style.position='absolute';
    div.draggable = true;
    div.ondrag=ondrag;
    div.ondragend=dragOver;
    div.style.left = GemInventory[gemInventoryIndex].slot.style.left;
    div.style.top = GemInventory[gemInventoryIndex].slot.style.top;;
    div.id="mixedGem"+(Towers.length-1).toString();
    var x= parseInt(div.style.left)
    var y=parseInt(div.style.top);
    var GemId=div.id;
    var SlotId=GemInventory[gemInventoryIndex].slot.id;;
    document.body.appendChild(div);
      Towers.push({color:'mix',yCord:y,gemWidth:17,gemheight:17,xCord:x,gemId:GemId,slotId:SlotId});

    GemInventory[gemInventoryIndex].Taken=true;
    for (var i=0;Towers.length>i;i++) {
      if(Towers[i].gemId==gem1Id) {
        Towers.splice(i, 1);
        break;
      }
    }
    for (var i=0;Tower.length>i;i++) {
      if(Towers[i].gemId==gem2Id){
        Towers.splice(i, 1);
        break;
      }
    }
    document.body.appendChild(div);
    document.getElementById(gem1Id).remove();
    document.getElementById(gem2Id).remove();
  }
  CombineButton() {
    firstCombineSlot.Taken=false;
    secondCombineSlot.Taken=false;
    for(var i=0;i<GemInventory.length;i++){
      if(GemInventory[i].Taken===false){functions.CreateCombinedGem(firstCombineSlot.gemId,secondCombineSlot.gemId,i);
      break;
      }
    }
    firstCombineSlot.gemId=null;
    secondCombineSlot.gemId=null;
  }
  CreateRedGem(gemInventoryIndex) {
    if(Towers.length<GemInventory.length && mana>Gemcost){
    //after creating a gem, you assign the x postion acording to its creation.
    // then, you mutiply by 18 to create distance between gems and add 620 to
    // set the x position in canvas.
        var div=document.createElement('div');
        div.style.width="17px";
        div.style.height="17px";
        div.style.position='absolute';
        div.draggable = true;
        div.ondrag=ondrag;
        div.ondragend=dragOver;
        div.style.left = GemInventory[gemInventoryIndex].slot.style.left;
        div.style.top = GemInventory[gemInventoryIndex].slot.style.top;;
        div.id="redGem"+(Towers.length-1).toString();
        GemInventory[gemInventoryIndex].Taken=true;
        var x= parseInt(div.style.left)
        var y=parseInt(div.style.top);
        var GemId=div.id;
        var SlotId=GemInventory[gemInventoryIndex].slot.id;;
        document.body.appendChild(div);
            Towers.push(new Tower{x,y,null,"red",GemId,SlotId})
    }
  }
  CreateGreenGem(gemInventoryIndex) {
    //gems.append(new Tower("green"x,y));
    if(Towers.length<GemInventory.length  && mana>Gemcost){
        var div=document.createElement('div');
        div.style.width="17px";
        div.style.height="17px";
        div.style.position='absolute';
        div.draggable = true;
        div.ondrag=ondrag;
        div.ondragend=dragOver;
        div.style.left = GemInventory[gemInventoryIndex].slot.style.left;
        div.style.top = GemInventory[gemInventoryIndex].slot.style.top;;
        div.id="greenGem"+(Towers.length-1).toString();
        var x= parseInt(div.style.left)
        var y=parseInt(div.style.top);
        var GemId=div.id;
        var SlotId=GemInventory[gemInventoryIndex].slot.id;;
        document.body.appendChild(div);
          //Towers.push({color:'green',yCord:y,gemWidth:17,gemheight:17,xCord:x,gemId:GemId,slotId:SlotId});
            Towers.push(new Tower{x,y,null,"green",GemId,SlotId});
    }
    }
  }
  CreateBlueGem (gemInventoryIndex) {
    if(Towers.length<GemInventory.length  && mana>Gemcost){
      Towers.push({color:'blue',yCord:null,gemWidth:17,gemheight:17,xCord:null,gemId:null,slotId:null});
        var div=document.createElement('div');
        div.style.width="17px";
        div.style.height="17px";
        div.style.position='absolute';
        div.draggable = true;
        div.ondrag=ondrag;
        div.ondragend=dragOver;
        div.style.left = GemInventory[gemInventoryIndex].slot.style.left;
        div.style.top = GemInventory[gemInventoryIndex].slot.style.top;;
        div.id="blueGem"+(Towers.length-1).toString();
        var x= parseInt(div.style.left)
        var y=parseInt(div.style.top);
        var GemId=div.id;
        var SlotId=GemInventory[gemInventoryIndex].slot.id;;
        document.body.appendChild(div);
            Towers.push(new Tower{x,y,null,"blue",GemId,SlotId})
    }
    }
  }
  BuildTowerButton(x,y){}
  ManaAbility1(){}
  ManaAbility2(){}
  ManaAbility3(){}
  ManaAbility4(){}


createInv(row,colomn,divWidth,divHeight,divSpace,startX,startY)
{
  var reset=0;
  var tempStartingX=startX;
  var startRow=0;
  for(var i=0;i<row*colomn+1;i++)
  {
    if(reset>=4){
      startRow=0;
      startY=startY+40;
      startX=tempStartingX;
      reset=0;
    }
    else{
      var div=document.createElement('div');
      div.style.width=divWidth+'px';
      div.style.height=divHeight+'px';
      div.style.position='absolute';
      div.style.top = (startY+18) + "px";
      div.style.left = (startRow*(divWidth+18))+startX + "px";
      reset++;
      startRow++;
    }
    div.id="Inv"+i;
    document.body.append(div);
    GemInventory.push({slot:div,Taken:false});
  }
}
function handleKeyDown(event) {
  event.preventDefault();
  var index;
  for(var i=0;i<this.GemInventory.length;i++){
    if(this.GemInventory[i].Taken===false){this.GemInventory[i].Taken===true;   index=i; break;};
    }

console.log(index);
  switch(event.key)
  {
    case 'r':
    case 'R':
    //console.log("R clikced");
    CreateRedGem(index);
    break;
    case 'g':
    case 'G':
    CreateGreenGem(index);
    break;
    case 'b':
    case 'B':
      CreateBlueGem(index);
    break;
  }

}

function handleMouseClick(event){
  var index;
  for(var i=0;i<this.GemInventory.length;i++){
    if(this.GemInventory[i].Taken===false){index=i;break;};
    }
    if(this.ButtonsRec.x<=event.x && event.x<=this.ButtonsRec.x+this.ButtonsRec.width && this.ButtonsRec.y<=event.y && event.y<=this.ButtonsRec.y+this.ButtonsRec.height)
  {
    var buttonsX=parseInt((event.x)/(this.ButtonsRec.width/2)%2);
    var buttonsY=parseInt((event.y)/(this.ButtonsRec.width/3)%3);
    this.buttonsFunctions[buttonsY][buttonsX](index);
    this.GemInventory[index].Taken===true;
  }

  //for(var i=0;i<Mixedgems.length;i++)
//  {
  //  if(Mixedgems[i].xCord<=event.x && event.x<=Mixedgems[i].xCord+Mixedgems[i].gemWidth && Mixedgems[i].yCord<=event.y && event.y<=Mixedgems[i].yCord+Mixedgems[i].gemheight)
  //  {

    //}
  //}


}
function ondrag(event){
  if(bool){
   initialX=Towers.find(x => x.gemId===event.target.id ).x;
    initialY=Towers.find(x => x.gemId===event.target.id ).y;
    bool=false;
  }
  event.preventDefault();
if(event.y==0 &&event.x==0){}else{event.target.style.top=event.y + 'px';
  event.target.style.left=event.x+'px';}
  Towers.find(x => x.gemId===event.target.id ).x=parseInt(event.target.style.left,10);
  Towers.find(x => x.gemId===event.target.id ).y=parseInt(event.target.style.top,10);
//  render(context);
}
*/
  /** @function circleCollisionDetection
  * Function to handle collisions between circles
  * @param {float} x1 - x postion of object 1
  * @param {float} y1 - y postion of object 1
  * @param {float} x2 - x postion of object 2
  * @param {float} x2 - x postion of object 2
  */
  circleCollisionDetection(x1, y1, r1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
    if(dx > r1 + r2 || dy > r1 + r2) {
      return false;
    }
    if(dx * dx + dy * dy >= (r1 + r2) * (r1 + r2)) {
      return false;
    }
    return true;
  }

  /** @function createProjectile
  * Function to create the appropriate projectile based on the color and struct components
  */
  createProjectile(tower) {
    //Calculate the damage value
    let damage = Math.randomInt(tower.minDamage, tower.maxDamage + 1);
    //Calculate how strong the special property of the projectile is
    let special = tower.color.determineSpecials();
    //Set up x & y values for the projectiles, only some will need to be different than this.x & this.y
    let x = 0;
    let y = 0;
    switch (tower.structural.name) {
      case "PlasmaGun":
        x = tower.x + Math.sin(tower.direction) * 30;
        y = tower.y - Math.cos(tower.direction) * 30;
        this.projectiles.push(new Plasma(x, y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      case "Launcher":
        x = tower.x + Math.sin(tower.direction)* 30;
        y = tower.y - Math.cos(tower.direction)* 30;
        tower.projectiles.push(new Grenade(x, y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      case "RailGun":
        x = tower.x + Math.sin(tower.direction)* 15;
        y = tower.y - Math.cos(tower.direction)* 15;
        this.projectiles.push(new Rail(x, y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      case "LightGun":
        x = tower.x + Math.sin(tower.direction)* 30;
        y = tower.y - Math.cos(tower.direction)* 30;
        this.projectiles.push(new Light(x, y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      case "Pulse":
        this.projectiles.push(new AOE(tower.x, tower.y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      case "Multishot":
        //Iterate over the targets to check if the monster is already being targeted
        tower.targets.forEach(target => {
          let check = false;
          for(let i = 0; i < this.projectiles.length; i++) {
            if(this.projectiles[i].target === target) {
              //If it is already being targeted we don't need to create a new projectile
              check = true;
            }
          }
          if(!check) {
            //If the target is not being targeted current, create a new projectile
            this.projectiles.push(new Beam(tower.x, tower.y, damage, tower.direction, tower.range, tower.color.color, target, special));
          }
        });
        break;
      case "Chain":
        x = tower.x + Math.sin(tower.direction)* 30;
        y = tower.y - Math.cos(tower.direction)* 30;
        this.projectiles.push(new ChainShot(x, y, damage, tower.direction, tower.range, tower.color.color, tower.targets[0], special));
        break;
      default:
        console.log("ERROR IN PROJECTILE CREATION");
    }
  }

  loadImages() {
    var loading = this.tilesets.length;
    var fun = function(setup) {
      loading--;
      console.log(loading);
      if (!loading) {
        alert('loaded');
        setup();
      }
    }

    for (let i = 0; i < this.tilesets.length; i++) {
      this.tilesets[i].load(tilesetFiles[i], fun(this.setup));
    }
  }

  setup() {
    this.map = new Map(mapFiles[0], this.tilesets[2]);
    this.energy = new Energy(this.map.target.cx, this.map.target.cy, 900);
    this.interval = setInterval(this.loop, 1000/60);
  }

  update() {
    /*
    this.energy.update();
    for(let i = 0; i < this.powerTimers; i++) {
      this.powerTimers[i]--;
      if(this.powerTimers[i]) {
        this.activePowers.push(new Power(500, 500, this.powers, this.energy.multipler));
      }
    }

    this.towers.forEach(tower => {
      tower.update();
    });
    this.monsters.forEach(monster => {
      monster.update();
    });
    this.towers.forEach(tower => {
      for(let i = 0; i < this.monsters.length; i++) {
        if(tower.structural.name !== "Multishot") {
          if(this.circleCollisionDetection(tower.x, tower.y, tower.range, this.monsters[i].x, this.monsters[i].y, 15)) {
            if(tower.targets.length < 1) {
              tower.targets.push(this.monsters[i]);
            }
            break;
          }
          else if(tower.targets[0] === this.monsters[i]) {
            tower.targets.splice(0, 1);
          }
        }
        else {
          if(this.circleCollisionDetection(tower.x, tower.y, tower.range, this.monsters[i].x, this.monsters[i].y, 15)) {
            if(tower.targets.length < 3) {
              let check = false;
              for(let j = 0; j < tower.targets.length; j ++) {
                if(tower.targets[j] === this.monsters[i]) {
                  check = true;
                }
              }
              if(!check) {
                tower.targets.push(this.monsters[i]);
              }
            }
          }
          else {
            for(let j = 0; j < tower.targets.length; j ++) {
              if(tower.targets[j] === this.monsters[i]) {
                tower.targets.splice(j, 1);
              }
            }
          }
        }
      }
    });

    this.towers.forEach(tower => {
      if(tower.targets.length > 0) {
        this.createProjectile(tower);
      }
    });

   dragOver(event){
    var sucessfulDragBool=false;
    bool= true;
    var gem= Towers.find(x => x.gemId==event.target.id );
      if(event.x>this.inventoryRec.x && event.y>this.inventoryRec.y &&event.x<this.inventoryRec.x+this.inventoryRec.width&&event.y<ths.inventoryRec.y+this.inventoryRec.height)
      {
        this.GemInventory.forEach(function(slot){
          if(gem.x<parseInt(slot.slot.style.left)+parseInt(slot.slot.style.width)&&
            gem.x+gem.Width>parseInt(slot.slot.style.left)&&
            gem.y<parseInt(slot.slot.style.height)+parseInt(slot.slot.style.top)&&
            gem.height+gem.y>parseInt(slot.slot.style.top) && slot.Taken==false)
            {
            if(  gem.slotId==secondCombineSlot.id){secondCombineSlot.Taken=false;}
            if(  gem.slotId==firstCombineSlot.id){firstCombineSlot.Taken=false;}
              console.log("collison detected");
              gem.x=parseInt(slot.slot.style.left);
              gem.y=parseInt(slot.slot.style.top);
              event.target.style.top=  slot.slot.style.top;
              event.target.style.left=slot.slot.style.left;
              sucessfulDragBool=true;
              slot.Taken=true
              if(!((this.GemInventory.find(x => x.slot.id===gem.slotId ))==undefined)){
                oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotId );
                oldSlot.Taken=false//  gem2.Taken=false;
              }
              gem.slotId=slot.slot.id;
            }
      })
    }
      if(gem.x<firstCombineSlot.x+firstCombineSlot.width&&
        gem.x+gem.Width>firstCombineSlot.x&&
        gem.y<firstCombineSlot.height+firstCombineSlot.y&&
        gem.height+gem.y>firstCombineSlot.y && firstCombineSlot.Taken===false)
        {
          console.log("collison detected");
          gem.x=firstCombineSlot.x;
          gem.yC=firstCombineSlot.y;
          event.target.style.top=  firstCombineSlot.y+"px";
          event.target.style.left=firstCombineSlot.x+'px';
            sucessfulDragBool=true;
            firstCombineSlot.Taken=true
            firstCombineSlot.gemId=event.target.id;
            if(!((GemInventory.find(x => x.slot.id===gem.slotId ))==undefined))
            {
              oldSlot=GemInventory.find(x => x.slot.id===gem.slotId );
            oldSlot.Taken=false
            }
            if(  gem.slotId==secondCombineSlot.id){secondCombineSlot.Taken=false;
                secondCombineSlot.gemId=null;
            }
            gem.slotId=firstCombineSlot.id;
        }
        if((gem.x<secondCombineSlot.x+secondCombineSlot.width&&
          gem.x+gem.Width>secondCombineSlot.x&&
          gem.y<secondCombineSlot.height+secondCombineSlot.y&&
          gem.height+gem.y>secondCombineSlot.y&&secondCombineSlot.Taken===false))
          {
            console.log("collison detected");
            gem.x=secondCombineSlot.x;
            gem.y=secondCombineSlot.y;
            event.target.style.top=  secondCombineSlot.y+"px";
            event.target.style.left=secondCombineSlot.x+'px';
            sucessfulDragBool=true;
              secondCombineSlot.gemId=event.target.id;
            if(!((this.GemInventory.find(x => x.slot.id===gem.slotId ))==undefined))
            {
              oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotId );
            oldSlot.Taken=false
            }
            if(  gem.slotId==firstCombineSlot.id){firstCombineSlot.Taken=false;
              firstCombineSlot.gemId=null;
            }
            gem.slotId=secondCombineSlot.id;
            secondCombineSlot.Taken=true;
          }
    if(!sucessfulDragBool){
      console.log("here");
      gem.x=initialX;
      gem.y=initialY;
      event.target.style.top=  initialY+"px";
      event.target.style.left=initialX+'px';
    }
      initialX=null;
      initialY=null;
      render(context);
    }
    */
    this.map.update();
  }

  render() {
    //this.backBufferContext.fillstyle = 'black';
    //this.backBufferContext.fillRect(0, 0, 1000, 1000);
    //console.log(this.tilesets[2].image);
    this.backBufferContext.fillStyle = 'green';
    this.backBufferContext.fillRect(0, 0, 1000, 1000);
    console.log(this.tilesets[2].image);
    this.backBufferContext.drawImage(this.tilesets[2].image, 0, 0);
    //this.map.render(this.backBufferContext, 1000, 1000);
    /*this.activePowers.forEach(power => {
      power.render(this.backBufferContext);
    });
    this.energy.render(this.backBufferContext);
    this.monsters.forEach(monster => {
      monster.render(this.backBufferContext);
    });
    this.towers.forEach(tower => {
      tower.render(this.backBufferContext);
    });
    */
    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }

  loop() {
    this.update();
    this.render();
  }
}
