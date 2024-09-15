function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 10, 20);
  AudioWorkletNode.gravity.y = 15;

  let wall = [];
  wall.push(new Sprite(250, 595, 500, 10, "static"));
  wall.push(new Sprite(5, 300, 10, 600, "static"));
  wall.push(new Sprite(495, 300, 10, 600, "static"));
}

function draw() {}
