/* wave.js */

export default class Wave {
  /** @constructor
   *  Constructs a new wave of units.
   */
  constructor() {
    this.queue = [];
    this.board = [];
  }

  /** @function enqueue
   *  Enqueues a new unit into the wave.
   *  @param  {Robot} unit    The unit to add to the wave.
   *  @param  {Integer} time  The time to wait from reaching the front of the queue to spawning.
   */
  enqueue(list) {
    list.forEach(element => {
        this.queue.push({
        unit: element.unit,
        time: element.time
        });
    });
    console.log(this);
  }

  /** @function kill
   *  Removes a unit from the board.
   *  @param  {Integer} id  The unit to remove from the board.
   */
  kill(id) {
    this.board.splice(id, 1);
  }

  /** @function update
   *  Updates all units on the board, and decrements the counter of the next unit in queue, if it hits 0 that unit is spawned.
   */
  update() {
    for(let i = 0; i < this.board.length; i++) {
      if(this.board[i].update()) {
        this.kill(i);
      }
    }

    if(this.queue.length > 0) {
      if (this.queue[0].time)
        this.queue[0].time--;
      else
        this.board.push(this.queue.shift().unit);
    }
  }

  /** @function render
   *  Renders all units on the board.
   *  @param  {Context} ctx
   */
  render(ctx) {
    this.board.forEach(unit => {
      unit.render(ctx);
    });
  }
}
