let skateboarder_roll; // image is 284h x 250w
let skateboarder_pop;
let skateboarder_ollie;

let ollie_pop;
let ollie_land;

const Key = Object.freeze({
  Left: Symbol("left"),
  Right: Symbol("right"),
  Up: Symbol("up"),
  Down: Symbol("down"),
})

let skatespeed = 13;

function skaterResourcesLoad() {
  skateboarder_roll = loadImage('resources/images/skater_roll.png');
  skateboarder_pop = loadImage('resources/images/skater_pop.png');
  skateboarder_ollie = loadImage('resources/images/skater_ollie.png');

  ollie_pop = loadSound("resources/audio/olliepop.wav");
  ollie_land = loadSound("resources/audio/ollieland.wav");
}

class Skateboarder {
  constructor() {
    this.reset();
  }

  reset() {
    this.pos_x = 0;
    this.img = skateboarder_roll;
    this.pos_y = windowHeight - this.img.height;
    this.moving_left = false;
    this.moving_right = false;
    this.moving_up = false;
    this.timer_between_ollies = 0;
    this.on_bench = false;
  }

  windowResized() {
    this.pos_y = windowHeight - this.img.height;
  }

  check_if_landed() {
    let new_pos_y = this.pos_y += skatespeed;
    console.log(windowHeight, new_pos_y, bench.seat_height);
    if (new_pos_y > windowHeight - this.img.height) {
      console.log("HIT GROUND");
      ollie_land.play();
      this.img = skateboarder_roll;
      this.pos_y = windowHeight - this.img.height;
    } else if (this.pos_x + this.img.width > bench.pos_x && this.pos_x < bench.pos_x + bench.width && new_pos_y > bench.seat_height - this.img.height) {
      console.log("HIT BENCH");
      ollie_land.play();
      this.img = skateboarder_roll;
      this.pos_y = bench.seat_height - this.img.height;
      this.on_bench = true;
    } else {
      this.pos_y = new_pos_y;
    }
  }

  check_if_rolled_off_bench() {
    if (this.on_bench && ( this.pos_x > bench.pos_x + bench.width  || this.pos_x + this.img.width < bench.pos_x) ) {
      console.log("ROLLED OFF BENCH");
      this.on_bench = false;
      if (!this.moving_up) {
        this.img = skateboarder_ollie;
        this.pos_y += skatespeed;
      }
    }
  }

  update() {

    //if (this.pos_y == windowHeight - this.img.height) {
    //  this.img = skateboarder_roll;
    //}
    if (this.pos_y <= 0) this.img = skateboarder_ollie;

    if (this.timer_between_ollies > 0) {
      this.timer_between_ollies--;
    }

    if (this.img == skateboarder_pop) {
      if (!this.moving_up) {
        this.img = skateboarder_ollie;
      }
    }
    else if (this.img == skateboarder_ollie) {
      this.check_if_landed();
    }
    this.check_if_rolled_off_bench();


    if (this.moving_left && this.pos_x > 0) this.pos_x -= skatespeed;
    if (this.moving_right && this.pos_x < windowWidth - 250) this.pos_x += skatespeed;

    if (this.moving_up && this.img == skateboarder_roll) {
      ollie_pop.play();
      this.timer_between_ollies = 10;
      this.img = skateboarder_pop;
    }

    if (this.moving_up && this.img != skateboarder_ollie) {
      this.pos_y -= skatespeed;
      if (!this.moving_left && this.pos_x < windowWidth - 250) this.pos_x += 7;
      else if (this.moving_right && this.pos_x <  windowWidth - 250) this.pos_x += 2;
    }
  }

  display() {
    image(this.img, this.pos_x, this.pos_y);
  }

  controlOn(key) {
    switch(key) {
      case Key.Right:
        this.moving_right = true;
        break;
      case Key.Left:
        this.moving_left = true;
        break;
      case Key.Up:
        if (this.timer_between_ollies == 0) this.moving_up = true;
        break;
    }
  }
  controlOff(key) {
    switch(key) {
      case Key.Right:
        this.moving_right = false;
        break;
      case Key.Left:
        this.moving_left = false;
        break;
      case Key.Up:
        this.moving_up = false;
        break;
    }
  }
}
