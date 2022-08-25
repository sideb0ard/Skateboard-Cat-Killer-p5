let skateboarder;
let bgImage1;
let bgImage2;
let bg1_x = 0;
let bg2_x = 0;
let num_cats = 5;
let cats = [];
let cat_deaths = 0;

let music;
let music_started = false;
let music_muted = false;

let started = false;
let game_over = false;
let start_time;
let end_time;

let fonty;

let bench;

const bg_scroll_speed = 1;
const fg_scroll_speed = 0.5;

function preload(){
  bgImage1 = loadImage("resources/images/buildingz1.png");
  bgImage2 = loadImage("resources/images/buildingz2.png");
  skaterResourcesLoad();
  catResourcesLoad();

  music = loadSound("resources/audio/drilla.wav");

  fonty= loadFont("resources/retro.ttf");
}

function setup() {
  getAudioContext().suspend();
  createCanvas(windowWidth, windowHeight);
  skateboarder = new Skateboarder();
  bench = new Bench();
  bg2_x = bgImage1.width;

  for (let i = 0; i < num_cats; i++) {
    cats.push(new Cat(windowWidth + random(20) + i * 2, windowHeight - 105));
  }
}

function display_start() {

  textSize(68);
  textFont(fonty);
  text('PRESS ANY KEY', (windowWidth / 6), windowHeight / 2);
}

function display_timer() {
  textSize(48);
  textFont(fonty);
  text('TIME:', windowWidth - 300, 100);
}

function display_score() {
  fill(255);
  textSize(48);
  textFont(fonty);
  text('CATS: ' + cat_deaths, 10, 100);
}


function game_reset() {
  skateboarder.reset();
  for (let i = 0; i < num_cats; i++) {
    cats[i].reset();
  }
  started = false;
  music_started = false;
  music.stop();
  game_over = false;
}

function display_end() {
  fill(255);
  textSize(68);
  textFont(fonty);
  text('OH DEAR, MORE THAN 10 DEAD CATS', (windowWidth / 6), windowHeight / 2);
  text('YOU LASTED FOR ' + end_time, (windowWidth / 6), windowHeight / 2 + 30);
  text('PRESS ANY KEY', (windowWidth / 6), windowHeight / 2 + 60);
}


function draw() {
  background(14, 178, 255);

  if (game_over) {
    display_end();
    return;
  } else if (started) {
    scroll_city();
    bench.update();
    bench.display();
    for (let i = 0; i < num_cats; i++) {
      cats[i].update();
      cats[i].checkCollision(skateboarder);
      cats[i].display();
    }
    display_score();

  } else {
    display_start();
  }
  skateboarder.update();
  skateboarder.display();

  //if (cat_deaths > 10) {
  //  game_reset();
  //  game_over = true;
  //  end_time = Date.now() - start_time;
  //}

}

function scroll_city() {

  image(bgImage1, bg1_x, windowHeight - bgImage1.height, bgImage1.width, bgImage1.height);
  image(bgImage2, bg2_x, windowHeight - bgImage2.height, bgImage2.width, bgImage2.height);

  bg1_x -= bg_scroll_speed;
  bg2_x -= bg_scroll_speed;

  if (bg1_x + bgImage1.width < 0) bg1_x = bg2_x + bgImage2.width;
  if (bg2_x + bgImage2.width < 0) bg2_x = bg1_x + bgImage1.width;

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  skateboarder.windowResized();
  for (let i = 0; i < num_cats; i++) {
    cats[i].windowResized();
  }
}

function keyPressed() {
  //console.log(keyCode);
  userStartAudio();
  if (!started && (keyCode != ESCAPE && keyCode != 91 && keyCode != 9)) {
    started = true;
    music.play();
    music_started = true;
    start_time = Date.now();
  }
  if (keyCode === LEFT_ARROW) {
    skateboarder.controlOn(Key.Left);
  } else if (keyCode === RIGHT_ARROW) {
    skateboarder.controlOn(Key.Right);
  } else if (keyCode === UP_ARROW) {
    skateboarder.controlOn(Key.Up);
  } else if (keyCode === DOWN_ARROW) {
    skateboarder.controlOn(Key.Down);
  } else if (keyCode === ESCAPE) {
    game_reset();
  } else if (keyCode === 77) {
    music_muted = !music_muted;
    if (music_muted) music.pause();
    else music.play();
  }
  return false; // prevent any default behavior
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    skateboarder.controlOff(Key.Left);
  } else if (keyCode === RIGHT_ARROW) {
    skateboarder.controlOff(Key.Right);
  } else if (keyCode === UP_ARROW) {
    skateboarder.controlOff(Key.Up);
  } else if (keyCode === DOWN_ARROW) {
    skateboarder.controlOff(Key.Down);
  }
  return false; // prevent any default behavior
}
