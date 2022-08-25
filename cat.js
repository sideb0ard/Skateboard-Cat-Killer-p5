let cat_run;
let cat_splat;

function catResourcesLoad() {
  cat_run = loadImage('resources/images/cat_run.png');
  cat_splat = loadImage('resources/images/cat_splat.png');
}

class Cat {
  constructor(x, y) {
    this.pos_x = x;
    this.pos_y = y;
    this.img = cat_run;
    this.expiring = 0;
    this.speed = random(10) + 2;
  }

  windowResized() {
    this.pos_y = windowHeight - this.img.height;
  }

  update() {
    this.pos_x -= this.speed;
    if (this.pos_x + this.img.width < 0) this.reset();

    if (this.expiring > 0) {
      this.expiring--;
      text('MEOW!', (windowWidth / 6), windowHeight / 2);
      if (this.expiring == 0) {
        this.reset();
      }
    }

  }

  checkCollision(thing) {
    if (thing.on_bench) return;

    if (this.pos_x + 10  < thing.pos_x + thing.img.width - 70
      && thing.pos_x + 70 < this.pos_x + this.img.width - 10
      && this.pos_y + 10 < thing.pos_y + thing.img.height - 10
      && thing.pos_y + 10 < this.pos_y + this.img.height - 10
      && thing.img == skateboarder_roll && this.expiring == 0) {
      this.squawk();
    }
  }

  squawk() {
    this.img = cat_splat;
    this.expiring = 20;
    cat_deaths++;
  }

  reset() {
    this.img = cat_run;
    this.pos_x = windowWidth + random(10);
    this.speed = random(10);
  }

  display() {
    image(this.img, this.pos_x, this.pos_y);
  }

}
