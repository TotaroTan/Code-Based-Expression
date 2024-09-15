let motivationalQuotes = [
  "Everyone is unique and perfect in their own way!",
  "Your circle is as unique as you are!",
  "Embrace imperfection, that's what makes you special!",
  "Perfection is overrated; you are extraordinary!",
  "Every attempt is a step toward greatness!",
  "Your creativity is what makes the world brighter!",
  "Every circle tells its own story—yours is amazing!",
  "There's beauty in every imperfection you create!",
  "Perfection is an illusion—your uniqueness is real!",
  "In art, there are no mistakes, only masterpieces!",
  "Your circle, like you, is one of a kind!",
  "Greatness lies in embracing what makes you different!",
  "Your effort is what makes your circle truly perfect!",
  "No two circles are the same, just like no two people!",
  "Every line you draw adds to your beautiful journey!",
];
let centerX, centerY, avgRadius, score;
let currentQuote;
let drawing = false;
let points = [];
let showResult = false;
let currentColor = [0, 0, 0]; // Default color
let backgroundColor = [255, 255, 255]; // Default background color
let greyscale = true; // Greyscale mode flag
let sound; // Variable to store the sound

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Playpen Sans");
  textSize(24);
  textAlign(CENTER, CENTER);
  currentQuote = random(motivationalQuotes);
  resetGame();
}

function draw() {
  drawBackground();

  if (drawing) {
    // Draw the current circle as the player moves
    noFill();
    stroke(currentColor);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < points.length; i++) {
      vertex(points[i].x, points[i].y);
    }
    endShape();
  }

  if (showResult) {
    // Display the score in the center when drawing is finished
    displayResult();
  } else {
    // Only display instructions while drawing or waiting for input
    displayInstructions();
  }
}

function drawBackground() {
  if (greyscale) {
    background(200); // Light grey background
    fill(100); // Dark grey fill for squares
  } else {
    background(backgroundColor);
    fill(currentColor);
  }
  noStroke();

  let centerX = width / 2;
  let centerY = height / 2;
  let centerRadius = height / 2; // Increased radius of the center area to avoid

  for (let x = 0; x < width; x += 12) {
    // Increase the gap between squares
    for (let y = 0; y < height; y += 12) {
      // Increase the gap between squares
      let distance = dist(x, y, centerX, centerY);
      if (distance > centerRadius) {
        rect(x, y, 40, 40);
      }
    }
  }
}

function displayInstructions() {
  fill(0);
  textFont("Playpen Sans");
  text("Try to draw a circle!", width / 2, height / 2 + 400);
}

function displayResult() {
  fill(0);
  textFont("Playpen Sans");
  textSize(32);
  textAlign(CENTER, CENTER); // Ensure text is centered
  text("SCORE: " + score, width / 2, height / 2 + 350); // Display score in the center
  textSize(24);
  text("Click anywhere to try again!", width / 2, height / 2 + 400);
  textFont("Playwrite CU");
  displayQuote(); // Display the motivational quote
}

function displayQuote() {
  fill(0);
  if (score === 100) {
    text("You are a CIRCLE!", width / 2, height / 2 + 50); // Display special message for perfect score
  } else if (isNaN(score)) {
    text("You are a SQUARE!", width / 2, height / 2 + 50); // Display special message for NaN score
  } else {
    text(currentQuote, width / 2, height / 2 + 50); // Center the quote
  }
}

function mousePressed() {
  if (showResult) {
    resetGame();
  } else {
    drawing = true;
    points = [];
  }
}

function mouseDragged() {
  if (drawing) {
    points.push({ x: mouseX, y: mouseY });
  }
}

function mouseReleased() {
  if (drawing) {
    drawing = false;
    calculateScore();
  }
}

function resetGame() {
  score = 0;
  points = [];
  centerX = 0;
  centerY = 0;
  avgRadius = 0;
  showResult = false; // Reset the result display flag
  currentQuote = random(motivationalQuotes);
  background(255);
}

function calculateScore() {
  let totalRadius = 0;
  for (let i = 0; i < points.length; i++) {
    let distance = dist(points[i].x, points[i].y, centerX, centerY);
    totalRadius += distance;
  }

  avgRadius = totalRadius / points.length;

  // Compare how far each point deviates from the average radius
  let deviation = 0;

  for (let i = 0; i < points.length; i++) {
    let distance = dist(points[i].x, points[i].y, centerX, centerY);
    deviation += abs(distance - avgRadius);
  }

  deviation = deviation / points.length; // Average deviation

  // Score: the lower the deviation, the higher the score
  score = round(map(deviation, 0, avgRadius, 100, 0)); // Map deviation to score from 0 to 100

  showResult = true; // Set showResult to true to display the result
}

function keyPressed() {
  if (key === "1") {
    currentColor = [255, 0, 0]; // Red
    backgroundColor = [255, 200, 200]; // Light Red
    greyscale = false;
  } else if (key === "2") {
    currentColor = [0, 255, 0]; // Green
    backgroundColor = [200, 255, 200]; // Light Green
    greyscale = false;
  } else if (key === "3") {
    currentColor = [0, 0, 255]; // Blue
    backgroundColor = [200, 200, 255]; // Light Blue
    greyscale = false;
  } else if (key === "4") {
    currentColor = [204, 204, 0]; // Yellow
    backgroundColor = [255, 255, 200]; // Light Yellow
    greyscale = false;
  } else if (key === "5") {
    greyscale = true;
    currentColor = [0, 0, 0]; // Black
  }
  if (sound.isPlaying()) {
    sound.stop();
  }
  sound.play();
}
