class Bench {
  constructor() {
    this.height = 150;
    this.pos_x = 100;
    this.pos_y = windowHeight - this.height;
    this.seat_height = this.pos_y + 75;
    this.width = 270;
    this.c = color(7, 140, 27);
  }

  update() {
    this.pos_x -= fg_scroll_speed;

    if (this.pos_x + this.width + 20 < 0) {
      this.pos_x = windowWidth + random(100);
    }
  }

  display() {
    strokeWeight(3);
    fill(color(64, 24, 24));
    rect(this.pos_x + 30, this.pos_y, 10, this.height);
    rect(this.pos_x + this.width - 60, this.pos_y, 10, this.height);
    fill(this.c);
    for (let i = 0; i < 3; i++) {
      rect(this.pos_x - i *3,  this.pos_y + 25*i, 250 + i*6, 20);
    }
    strokeWeight(4.5);
    rect(this.pos_x - 20,  this.seat_height, 290, 24);

  }

}
