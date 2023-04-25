// in next iteration, stop it from hitting multiple notes when arrow is held down. i tried implementing this tonight but it just kept breaking so i will havr to save for later but it is really pissing me off... 

// rhythm game v2.1, uses a new level for beat generation that works better with this song, and can generate notes for any song. this is much more time effective in the future for adding more songs, futureproofing the software even if it was complicated to implement now.

const gameState = {
  MENU: 0,
  GAME: 1,
};

let state = gameState.MENU;
let song;
let notes = [];
let fft;
let lastNoteTime = 0;
let gameStartTime;
let score = 0;
let activeArrows = [false, false, false, false];

function preload() {
  song = loadSound("vegyn.mp3");
} 

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(32); // Move textSize() here
  fft = new p5.FFT(0.8, 32);
}

function draw() {
  switch (state) {
    case gameState.MENU:
      drawMenu();
      break;
    case gameState.GAME:
      drawGame();
      break;
  }
}

function drawMenu() {
  background(0);
  textSize(32);
  fill(255);
  text("Press ENTER to start the game", width / 2, height / 2);
}

function keyPressed() {
  let arrowIndex;

  if (keyCode === LEFT_ARROW) {
    arrowIndex = 0;
  } else if (keyCode === UP_ARROW) {
    arrowIndex = 1;
  } else if (keyCode === DOWN_ARROW) {
    arrowIndex = 2;
  } else if (keyCode === RIGHT_ARROW) {
    arrowIndex = 3;
  }

  if (arrowIndex !== undefined) {
    activeArrows[arrowIndex] = true;
  }

  if (keyCode === 13) {
    if (state === gameState.MENU) {
      state = gameState.GAME;
      song.play();
      gameStartTime = millis();
    } else if (state === gameState.GAME) {
      song.stop();
      state = gameState.MENU;
    }
  } else if (state === gameState.GAME) {
    const hitNote = notes.find(note => {
      return note.arrow === arrowIndex && note.y >= height - 150 && note.y <= height - 50;
    });

    if (hitNote) {
      score += 100;
      hitNote.remove = true;
    }
  }
}

function drawScore() {
  fill(255);
  text(`Score: ${score}`, width / 2, 40);
}

function drawGame() {
  background(0);
  drawArrows();
  drawScore();
  fft.analyze();

  generateNotes();

  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    note.update();
    note.display();

    // Remove note if it has gone off screen or is hit by an active arrow
    if (note.offScreen() || note.removeIfHit()) {
      notes.splice(i, 1);
    }
  }
}

function generateNotes() {
  let currentTime = millis() - gameStartTime;

  if (currentTime - lastNoteTime >= 200) {
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let lowMid = fft.getEnergy("lowMid");
    let highMid = fft.getEnergy("highMid");

    let direction = round(random(0, 3)); // randomly choose a direction

    switch (direction) { // create a new note in the chosen direction
      case 0: // left
        if (bass > 230) { // adjust the threshold for the left arrow
          notes.push(new Arrow("LEFT"));
        }
        break;
      case 1: // up
        if (mid > 225) { // adjust the threshold for the up arrow
          notes.push(new Arrow("UP"));
        }
        break;
      case 2: // down
        if (lowMid > 100 && treble > 110) {
          notes.push(new Arrow("DOWN"));
        }
        break;
      case 3: // right
        if (highMid > 120 && bass > 100) {
          notes.push(new Arrow("RIGHT"));
        }
        break;
    }

    lastNoteTime = currentTime;
  }
}

function drawArrow(x, y, rotation, colorVal) {
  // left
  if (rotation == 0) {
    fill(colorVal)
    rect(x, y, 55, 25);
    triangle(x - 55, y, x - 20, y - 34, x - 20, y + 34);
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(x, y, 50, 20);
    triangle(x - 52, y, x - 22, y - 29, x - 22, y + 29);
    // creates inner black arrow
    fill(colorVal);
    rect(x - 5, y, 50, 8)
    triangle(x - 42, y, x - 28, y + 15, x - 28, y - 15);
  }
  // up
  else if (rotation == 1) {
    fill(colorVal)
    rect(x, y, 25, 55);
    triangle(x - 35, y - 18, x, y - 53, x + 35, y - 18);
    rectMode(CENTER);
    noStroke(); 
    fill(255);
    rect(x, y, 20, 50);
    triangle(x - 30, y - 20, x, y - 50, x + 30, y - 20);
    // creates inner black arrow that is consistent between arrows
    fill(colorVal);
    rect(x, y - 5, 8, 50);
    triangle(x - 15, y - 25, x, y - 40, x + 15, y - 25); 
  }
  // down
  else if (rotation == 2) {
    fill(colorVal)
    rect(x, y, 25, 55);
    triangle(x - 35, y + 18, x, y + 53, x + 35, y + 18);
    rectMode(CENTER);
    noStroke(); 
    fill(255);
    rect(x, y, 20, 50);
    triangle(x - 30, y + 20, x, y + 50, x + 30, y + 20);
    // creates inner black arrow that is consistent between arrows
    fill(colorVal);
    rect(x, y + 5, 8, 50);
    triangle(x - 15, y + 25, x, y + 40, x + 15, y + 25); 
  }
  // right
  else if (rotation == 3) {
    fill(colorVal)
    rect(x, y, 55, 25);
    triangle(x + 55, y, x + 20, y - 34, x + 20, y + 34);
    rectMode(CENTER);
    noStroke();
    fill(255);
    rect(x, y, 50, 20);
    triangle(x + 52, y, x + 22, y - 29, x + 22, y + 29);
    // creates inner black arrow
    fill(colorVal);
    rect(x + 5, y, 50, 8)
    triangle(x + 42, y, x + 28, y + 15, x + 28, y - 15);
  }
}

function drawArrows() {
  const arrowSize = 50;
  const yPos = height - 100;
  const xOffset = width / 2 - 1.5 * arrowSize;

  for (let i = 0; i < 4; i++) {
    let x = xOffset + i * arrowSize;
    let colorVal = activeArrows[i] ? color(255, 255, 255) : color(0, 0, 0);
    drawArrow(x, yPos, i, colorVal);
  }
}

class Arrow {
  constructor(direction) {
    this.direction = direction;
    this.y = 0;
    this.speed = 5;

    const arrowSize = 50;
    const xOffset = width / 2 - 1.5 * arrowSize;

    switch (this.direction) {
      case "LEFT":
        this.x = xOffset;
        this.arrowIndex = 0;
        break;
      case "UP":
        this.x = xOffset + arrowSize;
        this.arrowIndex = 1;
        break;
      case "DOWN":
        this.x = xOffset + 2 * arrowSize;
        this.arrowIndex = 2;
        break;
      case "RIGHT":
        this.x = xOffset + 3 * arrowSize;
        this.arrowIndex = 3;
        break;
    }
  }

  update() {
    this.y += this.speed;
  }

  display() {
    let rotation;
    let colorVal = color(0);

    switch (this.direction) {
      case "LEFT":
        rotation = 0;
        colorVal = color(255, 0, 0);
        break;
      case "UP":
        rotation = 1;
        colorVal = color(0, 255, 0);
        break;
      case "DOWN":
        rotation = 2;
        colorVal = color(0, 0, 255);
        break;
      case "RIGHT":
        rotation = 3;
        colorVal = color(255, 255, 0);
        break;
    }

    push();
    translate(this.x, this.y);
    drawArrow(0, 0, rotation, colorVal);
    pop();
  }
  
  offScreen() {
    return this.y > height;
  }
  
  removeIfHit() {
    if (this.y >= height - 150 && this.y <= height - 50 && activeArrows[this.arrowIndex]) {
      score += 100;
      return true;
    }
    return false;
  }
}


function keyReleased() {
  let arrowIndex;

  if (keyCode === LEFT_ARROW) {
    arrowIndex = 0;
  } else if (keyCode === UP_ARROW) {
    arrowIndex = 1;
  } else if (keyCode === DOWN_ARROW) {
    arrowIndex = 2;
  } else if (keyCode === RIGHT_ARROW) {
    arrowIndex = 3;
  }

  if (arrowIndex !== undefined) {
    activeArrows[arrowIndex] = false;
  }
}