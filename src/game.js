
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
import Test from './Tilesets/tileSet01.png';

//Import Monsters
import Robot from './Enemies/robot.js';
import Accelerator from './Enemies/accelerator.js';
import Chameleon from './Enemies/Chameleon.js';
import Energizer from './Enemies/energizer.js';
import NanoBot from './Enemies/nanobot.js';
import Reformer from './Enemies/reformer.js';

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

/** @function Math.getDirection
* Function to get a direction between one object and another
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

    this.bool=true;
    this.ButtonsRec={x:750,y:580,width:140,height:120};
    this.inventoryRec={x:750,y:200,width:126,height:224}
    this.firstCombineSlot={x:830 ,y:130 ,width:17, height:17,Taken:false,id:'combineSlot1',gemId:null};
    this.secondCombineSlot={x:880 ,y:130 ,width:17, height:17,Taken:false,id:'combineSlot2',gemId:null};
    this.initialX=null;
    this.initialY=null;
    this.EffectState="idle";
    //this.BuildableArea=[{x:40,y:50,width:120,height:200},{x:260,y:410,width:250,height:130}];
    //Still testing these power variables
    /*
    this.activePowers = [];
    this.powers = ["Bombardment, Nanites, Freeze"];
    this.powerTimers = [600, 2400, 1200];
    */
    //This is the energy objects, needs the location from the map
    this.buttonsFunctions=[
                        [(index)=>this.CreateGreenGem(index),(index)=>this.CreateBlueGem(index)],
                        [(index)=>this.CreateRedGem(index),(index)=>this.CombineButton()],
                        [()=>this.CreateBuilding(),"sixth"]
                      ];
    //Array of inventory slots
    this.GemInventory = [];
    //Sotres all the currently rendered projectiles

    //Key game objects
    //Map object
    this.map = new Map(mapFiles[0]);
    this.scaleFactor = this.map.getScaleFactor(700, 800);
    this.Buildable = this.map.buildable;
    //Energy object, money & end goal of the monsters
    this.energy = new Energy(this.map.target.cx, this.map.target.cy, 900);
    this.projectiles = [];
    //Building Objects, the objects that hold tower objects.
    this.Buildings = [];
    //The towers themselves, can be color component by itself or structural component by itself. If it has both types of components it is a fully functional tower.
    this.Towers = [];

    this.wave = 0;
    this.mWaves = [
      { p: 1, c: ['cyan'], t: [Robot, Reformer], d: [60, 60, 60, 60, 60] },
      { p: 1, c: ['cyan'], t: [Energizer, NanoBot], d: [60, 60, 60, 60, 60] },
      { p: 1, c: ['cyan'], t: [Accelerator], d: [60, 60]},
      { p: 1, c: ['red'], t: [Robot, Reformer, Energizer, NanoBot, Accelerator], d: [ 60, 60, 60, 60, 180, 60, 60]},
      { p: 1, c: ['cyan', 'yellow', 'Magenta', 'red'], t: [Robot, Reformer, Energizer, NanoBot, Accelerator], d: [60, 60, 60, 60, 180, 60, 60]},
      { p: 1, c: ['cyan'], t: [Chameleon], d: [60, 60]}
    ];

    //Active Monsters
    this.nextWave;
    this.currWave;
    this.genConstrainedWave(this.mWaves[this.wave].p, this.mWaves[this.wave].c, this.mWaves[this.wave].t, this.mWaves[this.wave].d);
    this.switchWave();
    this.wave++;
    this.genConstrainedWave(this.mWaves[this.wave].p, this.mWaves[this.wave].c, this.mWaves[this.wave].t, this.mWaves[this.wave].d);

    //Back Buffer
    this.backBufferCanvas = document.getElementById("canvas");
    this.backBufferCanvas.width = 900;
    this.backBufferCanvas.height = 800;
    this.backBufferContext = this.backBufferCanvas.getContext('2d');

    //Canvas that actually gets put on the screen
    this.screenBufferCanvas = document.getElementById("canvas");
    this.screenBufferCanvas.width = 900;
    this.screenBufferCanvas.height = 800;
    document.body.appendChild(this.screenBufferCanvas);
    this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

    //Binders
    this.loop = this.loop.bind(this);
    this.render = this.render.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.ondrag = this.ondrag.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.handleMouseClick = this.handleMouseClick.bind(this);
    window.onmousedown = this.handleMouseClick;
    //60fps
    this.interval = setInterval(this.loop, 1000/60);
    window.onkeydown = this.handleKeyDown;
    //window.onmousedown=this.handleMouseClick;
    this.createInv(7,4,17,17,0,750,200);
    console.log(this.GemInventory);

    //sounds
    var waveStart = new Audio('waveStart.wav');
    var chain = new Audio('chain.wav');
    var end = new Audio('end.wav');
    var launcher = new Audio('launcher.wav');
    var lightHouse = new Audio('lightHouse.wav');
    var multiShot = new Audio('multiShot.wav');
    var plasmaGun = new Audio('plasmaGun.wav');
    var pulse = new Audio('pulse.wav');
    var railGun = new Audio('railGun.wav');
    var robotDeath = new Audio('robotDeath.wav');
  }
///creating gems functions

  CreateBuilding(xCord,yCord) {
    this.Buildings.push(new Building(xCord,yCord,17,17));
  }
  CreateCombinedGem(gem1Id,gem2Id,gemInventoryIndex){
  //  console.log(gem1Id);
    //console.log(gem2Id);

    var div =document.getElementById(gem1Id)
    var gem= this.Towers.find(x => x.GemID===gem1Id);
    var gem2= this.Towers.find(x => x.GemID===gem2Id);

    if(!gem || !gem2) {
      return;
    }
    console.log(gem);
    console.log(gem2);
    if(gem.color.level !== gem2.color.level) {
      return;
    }
    else {
      //div.style.width="17px";
      //div.style.height="17px";
      ///div.style.position='absolute';
      //div.draggable = true;
      //div.ondrag=this.ondrag;
      ///div.ondragend=this.dragOver;

      div.style.left = this.GemInventory[gemInventoryIndex].slot.style.left;
      div.style.top = this.GemInventory[gemInventoryIndex].slot.style.top;
      gem.x = parseInt(div.style.left);
      gem.y = parseInt(div.style.top);
      //div.id=""+(this.Towers.length-1).toString();
      var x= parseInt(div.style.left)
      var y=parseInt(div.style.top);
      //var GemId=div.id;
      var SlotId=this.GemInventory[gemInventoryIndex].slot.id;
      gem.color.combine(gem2.color);

      var test = this.Towers.find(x => x.GemID===gem1Id);
      console.log(test.GemID);

      //document.body.appendChild(div);
        //this.Towers.push({color:'mix',yCord:y,gemWidth:17,gemheight:17,xCord:x,gemId:GemId,slotId:SlotId});

      this.GemInventory[gemInventoryIndex].Taken=true;
      gem.slotID=this.GemInventory[gemInventoryIndex].slot.id;
      //for (var i=0;this.Towers.length>i;i++) {
      //  if(this.Towers[i].gemId==gem1Id) {
      //    this.Towers.splice(i, 1);
      //    break;
      //  }
      ///}
      for (var i=0;i < Tower.length;i++) {
        if(this.Towers[i].GemID==gem2Id){
          this.Towers.splice(i, 1);
          break;
        }
      }

      //document.body.appendChild(div);
      //document.getElementById(gem1Id).remove();
      this.firstCombineSlot.Taken=false;
      this.secondCombineSlot.Taken=false;
      this.firstCombineSlot.gemId=null;
      this.secondCombineSlot.gemId=null;
      document.getElementById(gem2Id).remove();
      console.log(this.Towers);
    }
  }
  CombineButton() {

    for(var i=0;i<this.GemInventory.length;i++){
      if(this.GemInventory[i].Taken===false){
        this.CreateCombinedGem(this.firstCombineSlot.gemId,this.secondCombineSlot.gemId,i);
      break;
      }
    }

  }
  CreateRedGem(gemInventoryIndex) {
    if(this.Towers.length<this.GemInventory.length){
        //after creating a gem, you assign the x postion acording to its creation.
        // then, you mutiply by 18 to create distance between gems and add 620 to
        // set the x position in canvas.
            var div=document.createElement('div');
            div.style.width="17px";
            div.style.height="17px";
            div.style.position='absolute';
            div.draggable = true;
            div.ondrag=this.ondrag;
            div.ondragend=this.dragOver;
            div.style.left = this.GemInventory[gemInventoryIndex].slot.style.left;
            div.style.top = this.GemInventory[gemInventoryIndex].slot.style.top;;
            div.id="redGem"+(this.Towers.length-1).toString();
            this.GemInventory[gemInventoryIndex].Taken=true;
            var x= parseInt(div.style.left);
            var y=parseInt(div.style.top);
            var GemId=div.id;
            var SlotId=this.GemInventory[gemInventoryIndex].slot.id;;
            document.body.appendChild(div);
            this.Towers.push(new Tower(x,y, "PlasmaGun","red",GemId,SlotId));
    }
  }
  CreateGreenGem(gemInventoryIndex) {
    //gems.append(new Tower("green"x,y));
    if(this.Towers.length<this.GemInventory.length ){
        var div=document.createElement('div');
        div.style.width="17px";
        div.style.height="17px";
        div.style.position='absolute';
        div.draggable = true;
        div.ondrag=this.ondrag;
        div.ondragend=this.dragOver;
        div.style.left = this.GemInventory[gemInventoryIndex].slot.style.left;
        div.style.top = this.GemInventory[gemInventoryIndex].slot.style.top;;
        div.id="greenGem"+(this.Towers.length-1).toString();
        this.GemInventory[gemInventoryIndex].Taken=true;
        var x= parseInt(div.style.left)
        var y=parseInt(div.style.top);
        var GemId=div.id;
        var SlotId=this.GemInventory[gemInventoryIndex].slot.id;;
        document.body.appendChild(div);
          //Towers.push({color:'green',yCord:y,gemWidth:17,gemheight:17,xCord:x,gemId:GemId,slotId:SlotId});
        this.Towers.push(new Tower(x,y,"PlasmaGun","green",GemId,SlotId));
    }
  }
   CreateBuilding(){
    this.EffectState='BuildingMode';
  }
  CreateBlueGem (gemInventoryIndex) {
    if(this.Towers.length<this.GemInventory.length ){
      //this.Towers.push({color:'blue',yCord:null,gemWidth:17,gemheight:17,xCord:null,gemId:null,slotId:null});
        var div=document.createElement('div');
        div.style.width="17px";
        div.style.height="17px";
        div.style.position='absolute';
        div.draggable = true;
        div.ondrag=this.ondrag;
        div.ondragend=this.dragOver;
        div.style.left = this.GemInventory[gemInventoryIndex].slot.style.left;
        div.style.top = this.GemInventory[gemInventoryIndex].slot.style.top;;
        div.id="blueGem"+(this.Towers.length-1).toString();
        this.GemInventory[gemInventoryIndex].Taken=true;
        var x= parseInt(div.style.left)
        var y=parseInt(div.style.top);
        var GemId=div.id;
        var SlotId=this.GemInventory[gemInventoryIndex].slot.id;;
        document.body.appendChild(div);
        this.Towers.push(new Tower(x,y,"PlasmaGun","blue",GemId,SlotId))
    }
  }
  BuildTowerButton(x,y){}
  ManaAbility1(){}
  ManaAbility2(){}
  ManaAbility3(){}
  ManaAbility4(){}


  createInv(row,colomn,divWidth,divHeight,divSpace,startX,startY) {
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
      this.GemInventory.push({slot:div,Taken:false});
    }
  }

  handleKeyDown(event) {
    event.preventDefault();
    var index;
    console.log(this.Towers);
    for(var i=0;i<this.GemInventory.length;i++){
      if(this.GemInventory[i].Taken===false){this.GemInventory[i].Taken===true;   index=i; break;};
      }

    console.log(index);
    switch(event.key)
    {
      case 'r':
      case 'R':
      //console.log("R clikced");
      this.CreateRedGem(index);
      break;
      case 'g':
      case 'G':
      this.CreateGreenGem(index);
      break;
      case 'b':
      case 'B':
      this.CreateBlueGem(index);
      break;
    }

  }

handleMouseClick(event){
    console.log(event.x+" space  "+event.y);
  var buildBool=false;
    var index;
    switch(this.EffectState){
      case 'idle':
      for(var i=0;i<this.GemInventory.length;i++){
        if(this.GemInventory[i].Taken===false){index=i;break;};
        }
        if(this.ButtonsRec.x<=event.x && event.x<=this.ButtonsRec.x+this.ButtonsRec.width && this.ButtonsRec.y<=event.y && event.y<=this.ButtonsRec.y+this.ButtonsRec.height)
      {
        var buttonsX=parseInt((event.x)/(this.ButtonsRec.width/2)%2);
        var buttonsY=parseInt((event.y)/(this.ButtonsRec.width/3)%3);
        //fillRect()
        if(buttonsY==2 && buttonsX==2){}else{  this.buttonsFunctions[buttonsY][buttonsX](index);}

      //  if(buttonsY==2 && buttonsX==1){}
        this.GemInventory[index].Taken===true;
      }

      break;
      case 'BuildingMode':
  this.EffectState='idle';
  console.log(this);
  console.log(this.Buildable);
    for(var j=0;j<this.Buildable.length;j++){
      if((event.x<this.Buildable[j].x+this.Buildable[j].w&&
      event.x+20>this.Buildable[j].x&&
        event.y<this.Buildable[j].h+this.Buildable[j].y&&
        20+event.y>this.Buildable[j].y))
          {
              console.log(buildBool);
            buildBool=true;
            //console.log('here');
          for(var i=0;i<this.Buildings.length;i++){
              if((this.Buildings[i].x<event.x+20&&
              this.Buildings[i].x+20>event.x&&
                this.Buildings[i].y<20+event.y&&
                20+this.Buildings[i].y>event.y))
                {

                  buildBool=false;
                  break;
                }

              }//
              break;
          }

        }//
        //console.log(buildBool);
        if(buildBool===true){
        this.Buildings.push(new Building(event.x,event.y,20,20,false,"building"+this.Buildings.length));
      //  Buildings[Buildings.length-1].buildingId="building"+Buildings.length-1;
        }
        console.log(this.Buildings);
      break;
       default:
       this.EffectState='idle';
       ;
    }
  }
  ondrag(event){
    if (this.bool) {
      this.initialX = this.Towers.find(x => x.GemID===event.target.id ).x;
      this.initialY = this.Towers.find(x => x.GemID===event.target.id ).y;
      this.bool = false;
    }
    event.preventDefault();
    if (event.y==0 && event.x==0) {} else {
      event.target.style.top=event.y + 'px';
      event.target.style.left=event.x + 'px';
    }
    this.Towers.find(x => x.GemID===event.target.id ).x=parseInt(event.target.style.left,10);
    this.Towers.find(x => x.GemID===event.target.id ).y=parseInt(event.target.style.top,10);
    //  render(context);
  }

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

  switchWave() {
    this.currWave = this.nextWave;
  }

  genWave(monsters) {
    let path, color;

    this.nextWave = new Wave();

    for (let m = 0; m < monsters; m++) {
      path = this.map.paths[Math.floor(Math.random() * this.map.paths.length)];

      switch (Math.randomInt(0, 6)) {
        case 0:
          color = 'green';
          break;
        case 1:
          color = 'cyan';
          break;
        case 2:
          color = 'blue';
          break;
        case 3:
          color = 'magenta';
          break;
        case 4:
          color = 'red';
          break;
        case 5:
          color = 'yellow';
          break;
        default:
          color = "white";
          break;
      }

      switch (Math.randomInt(0, 6)) {
        case 0:
          this.nextWave.enqueue(new Accelerator(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(90, 211));
          break;
        case 1:
          this.nextWave.enqueue(new Chameleon(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(30, 181));
          break;
        case 2:
          this.nextWave.enqueue(new Energizer(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(30, 181));
          break;
        case 3:
          this.nextWave.enqueue(new NanoBot(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(30, 181));
          break;
        case 4:
          this.nextWave.enqueue(new Reformer(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(30, 181));
          break;
        default:
          this.nextWave.enqueue(new Robot(path.steps[0].x, path.steps[0].y, color, this.wave, path.steps), Math.randomInt(30, 181));
          break;
      }
    }
  }

  genConstrainedWave(pathNum, colors, types, data) {
    let path, color, ty;

    this.nextWave = new Wave();

    for (let n = 0; n < data.length; n++) {
      path = this.map.paths[Math.randomInt(0, pathNum)];

      color = colors[Math.randomInt(0, colors.length)];

      ty = types[Math.randomInt(0, types.length)];

      this.nextWave.enqueue(new ty(path.steps[0].x, path.steps[0].y, color, this.wave + 1, path.steps), data[n]);
    }
  }
  dragOver(event){
    var sucessfulDragBool=false;
    this.bool= true;
    var gem= this.Towers.find(x => x.GemID==event.target.id );
    console.log(this.firstCombineSlot);
    console.log(this.secondCombineSlot);
    var oldSlot;
    // Check if dragged into inventory
    if(event.x>this.inventoryRec.x && event.y>this.inventoryRec.y &&event.x<this.inventoryRec.x+this.inventoryRec.width&&event.y<this.inventoryRec.y+this.inventoryRec.height)
    {
      console.log("inside rec");
      this.GemInventory.forEach(ele => {
        // Check if dragged into a slot in the inventory
        if(gem.x<parseInt(ele.slot.style.left)+parseInt(ele.slot.style.width)&&
          gem.x+gem.Width>parseInt(ele.slot.style.left)&&
          gem.y<parseInt(ele.slot.style.height)+parseInt(ele.slot.style.top)&&
          gem.Height+gem.y>parseInt(ele.slot.style.top) && ele.Taken==false)
        {
          // Check if the gem came from one of the combine slots
          if (gem.slotID==this.secondCombineSlot.id)
            this.secondCombineSlot.Taken=false;
          else if (gem.slotID==this.firstCombineSlot.id)
            this.firstCombineSlot.Taken=false;
          // Put the gem in the new slot
          console.log("collison detected");
          gem.x=parseInt(ele.slot.style.left);
          gem.y=parseInt(ele.slot.style.top);
          event.target.style.top=  ele.slot.style.top;
          event.target.style.left=ele.slot.style.left;
          sucessfulDragBool=true;
          ele.Taken=true
          // Check if the gem came from a building
          if(!((this.Buildings.find(x => x.buildingId===gem.slotID ))==undefined))
          {
            oldSlot=this.Buildings.find(x => x.buildingId===gem.slotID );
            oldSlot.Taken=false
          }
          // Check if the gem came from another inventory slot
          if(!((this.GemInventory.find(x => x.slot.id===gem.slotID ))==undefined)) {
            oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotID );
            oldSlot.Taken=false//  gem2.Taken=false;
          }
          // Update the slot id of the gem
          gem.slotID=ele.slot.id;
        }
      });
    }
    // Otherwise check if dragged into the first combine slot
    else if (gem.x<this.firstCombineSlot.x+this.firstCombineSlot.width &&
      gem.x+gem.Width>this.firstCombineSlot.x &&
      gem.y<this.firstCombineSlot.height+this.firstCombineSlot.y &&
      gem.Height+gem.y>this.firstCombineSlot.y && this.firstCombineSlot.Taken===false)
    {
      // Put the gem in the new slot
      console.log("collison detected");
      gem.x = this.firstCombineSlot.x;
      gem.y = this.firstCombineSlot.y;
      event.target.style.top = this.firstCombineSlot.y+"px";
      event.target.style.left = this.firstCombineSlot.x+'px';
      sucessfulDragBool = true;
      this.firstCombineSlot.Taken = true
      this.firstCombineSlot.gemId = event.target.id;
      // Check if the gem came from a building
      if(!((this.Buildings.find(x => x.buildingId===gem.slotID ))==undefined))
      {
        oldSlot=this.Buildings.find(x => x.buildingId===gem.slotID );
        oldSlot.Taken=false
      }
      // Check if the gem came from the inventory
      if(!((this.GemInventory.find(x => x.slot.id===gem.slotID ))==undefined))
      {
        oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotID );
        oldSlot.Taken=false
      }
      // Check if the gem came from the second combine slot
      if(gem.slotID==this.secondCombineSlot.id){
        this.secondCombineSlot.Taken=false;
        this.secondCombineSlot.gemId=null;
        console.log("clearing second slot");
      }
      gem.slotID=this.firstCombineSlot.id;
    }
    // Otherwise check if dragged into the second combine slot
    else if((gem.x<this.secondCombineSlot.x+this.secondCombineSlot.width&&
      gem.x+gem.Width>this.secondCombineSlot.x&&
      gem.y<this.secondCombineSlot.height+this.secondCombineSlot.y&&
      gem.Height+gem.y>this.secondCombineSlot.y&&this.secondCombineSlot.Taken===false))
    {
      console.log("collison detected");
      gem.x=this.secondCombineSlot.x;
      gem.y=this.secondCombineSlot.y;
      event.target.style.top= this.secondCombineSlot.y+"px";
      event.target.style.left= this.secondCombineSlot.x+'px';
      sucessfulDragBool=true;
      this.secondCombineSlot.Taken=true;
      this.secondCombineSlot.gemId=event.target.id;
      if(!(this.Buildings.find(x => x.buildingId===gem.slotID)==undefined))
      {
        oldSlot=this.Buildings.find(x => x.buildingId===gem.slotID );
        oldSlot.Taken=false
      }
      if(!(this.GemInventory.find(x => x.slot.id===gem.slotID)==undefined))
      {
        oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotID );
        oldSlot.Taken=false
      }
      console.log(gem.slotID);
      console.log(this.firstCombineSlot);
      if(gem.slotID==this.firstCombineSlot.id){
        this.firstCombineSlot.Taken=false;
        this.firstCombineSlot.gemId=null;
        console.log("clearing first slot");
      }
      gem.slotID=this.secondCombineSlot.id;
    }
    console.log(this.Buildings);
    for(var i=0;i<this.Buildings.length;i++){
      if((gem.x<this.Buildings[i].x+this.Buildings[i].width&&
        gem.x+gem.Width>this.Buildings[i].x&&
        gem.y<this.Buildings[i].height+this.Buildings[i].y&&
        gem.Height+gem.y>this.Buildings[i].y&&this.Buildings[i].Taken===false))
        {
          console.log("collide");
          gem.x=this.Buildings[i].x;
          gem.y=this.Buildings[i].y;
          event.target.style.top= this.Buildings[i].y+"px";
          event.target.style.left=this.Buildings[i].x+'px';
          sucessfulDragBool=true;
            //Buildings[i].gemId=event.target.id;
            if(!((this.Buildings.find(x => x.buildingId===gem.slotID ))==undefined))
            {
              oldSlot=this.Buildings.find(x => x.buildingId===gem.slotID );
            oldSlot.Taken=false
            }
          if(!((this.GemInventory.find(x => x.slot.id===gem.slotID ))==undefined))
          {
            oldSlot=this.GemInventory.find(x => x.slot.id===gem.slotID );
          oldSlot.Taken=false
          }
          if(  gem.slotID==this.firstCombineSlot.id){this.firstCombineSlot.Taken=false;
            this.firstCombineSlot.gemId=null;
          }
          if(!((this.Buildings.find(x => x.buildingId===gem.slotID ))==undefined))
          {
            oldSlot=this.Buildings.find(x => x.buildingId===gem.slotID );
          oldSlot.Taken=false
          }
          gem.slotID=this.Buildings[i].buildingId;
        this.Buildings[i].Taken=true;
        break;
        }
    }
    if(!sucessfulDragBool) {
    console.log("UnSucessful drag here");
      gem.x=this.initialX;
      gem.y=this.initialY;
      event.target.style.top= this.initialY+"px";
      event.target.style.left=this.initialX+'px';
    }
    this.initialX=null;
    this.initialY=null;
    //render(context);
  }

  update() {
    this.energy.update();
    /*
    for(let i = 0; i < this.powerTimers; i++) {
      this.powerTimers[i]--;
      if(this.powerTimers[i]) {
        this.activePowers.push(new Power(500, 500, this.powers, this.energy.multipler));
      }
    }*/
    if (this.currWave.update()) {
      console.log("this worked");
      this.switchWave();
      this.wave++;
      if (this.wave < this.mWaves.length) {
        console.log(this.mWaves[this.wave]);
        this.genConstrainedWave(this.mWaves[this.wave].p, this.mWaves[this.wave].c, this.mWaves[this.wave].t, this.mWaves[this.wave].d);
      } else
        this.genWave(5);
    }

    this.Towers.forEach(tower => {
      tower.update();
    });

    this.Towers.forEach(tower => {
      if(!tower.reloading && tower.targets.length > 0) {
        this.createProjectile(tower);
        tower.reloading = true;
      }
    });
    for(let i = 0; i < this.projectiles.length; i++) {
      if(this.projectiles[i].update()) {
        this.projectiles.splice(i, 1);
      }
    }

    for(let i = 0; i < this.currWave.board.length; i++) {
      for(let j = 0; j < this.projectiles.length; j++) {
        if(this.circleCollisionDetection(this.currWave.board[i].x, this.currWave.board[i].y, this.currWave.board[i].radius, this.projectiles[j].x, this.projectiles[j].y, this.projectiles[j].radius)) {
          //this.currWave.board[i].hurt(this.projectiles[j].color, this.projectiles[j].damage);
          //this.currWave.board[i].status(this.projectiles[j]);
          this.projectiles.splice(i, 1);
        }
      }
    }

    this.Towers.forEach(tower => {
      if(tower.structural && tower.color) {
        for(let i = 0; i < this.currWave.board.length; i++) {
          if(this.circleCollisionDetection(tower.x, tower.y, tower.range, this.currWave.board[i].x, this.currWave.board[i].y, 15)) {
            if(tower.targets.length < 1) {
              tower.targets.push(this.currWave.board[i]);
            }
            break;
          }
          else if(tower.targets[0] === this.currWave.board[i]) {
            tower.targets.splice(0, 1);
          }
        }
      }
    });
    //this.map.update();
  }
  render() {
    this.backBufferContext.fillStyle = 'black';
    this.backBufferContext.strokeStyle = 'white';
    this.backBufferContext.fillRect(0, 0, 1000, 1000);
    this.map.render(this.backBufferContext, this.scaleFactor.width, this.scaleFactor.height);
    this.backBufferContext.fillStyle = 'white';

    this.GemInventory.forEach(elem=> {
      this.backBufferContext.fillRect(parseInt(elem.slot.style.left) -15, parseInt(elem.slot.style.top)-15, 25, 25);
    });
    this.Buildings.forEach(building => {
      building.render(this.backBufferContext, this.scaleFactor.width, this.scaleFactor.height);
    });

    this.backBufferContext.fillStyle="#304c1e";
    this.backBufferContext.fillRect(this.ButtonsRec.x,this.ButtonsRec.y,(this.ButtonsRec.width/2),32);
    this.backBufferContext.fillStyle="#367582";
    this.backBufferContext.fillRect(this.ButtonsRec.x+(this.ButtonsRec.width/2),this.ButtonsRec.y,this.ButtonsRec.width/2,32);
    this.backBufferContext.fillStyle="#b73546";
    this.backBufferContext.fillRect(this.ButtonsRec.x,this.ButtonsRec.y+(32),this.ButtonsRec.width/2,32);
    this.backBufferContext.fillStyle="#c4ce39";

    this.backBufferContext.fillRect(this.ButtonsRec.x+(this.ButtonsRec.width/2),this.ButtonsRec.y+(32)*2,this.ButtonsRec.width/2,32);

    /*this.activePowers.forEach(power => {
      power.render(this.backBufferContext);
    });*/

    this.energy.render(this.backBufferContext);
    this.currWave.render(this.backBufferContext);
    this.Towers.forEach(tower => {
      tower.render(this.backBufferContext);
    });
    this.projectiles.forEach(projectile => {
      projectile.render(this.backBufferContext)
    });
    //Bit blit the back buffer onto the screen
    this.screenBufferContext.drawImage(this.backBufferCanvas, 0, 0);
  }

  loop() {
    this.update();
    this.render();
  }
}
