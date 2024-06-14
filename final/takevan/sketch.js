// in next iteration, stop it from hitting multiple notes when arrow is held down. i tried implementing this tonight but it just kept breaking so i will havr to save for later but it is really pissing me off... 

// rhythm game v2.4, adds a song end menu, and fixes song sync issues. 

// notes for stuff to add. 
// make the arrows spread out a bit more, and color the 4 main arrows like the notes, though maybe a bit lighter/darker to differentiate?
// use a really simple tonal song that only generates the exact notes intended, as a tutorial of sorts that can teach the user how to play if needed.
// show score info at the end of the song, and maybe a restart button?

const gameState = {
  MENU: 0,
  GAME: 1,
  END: 2,
};

let state = gameState.MENU;
let song;
let notes = [];
let fft;
let lastNoteTime = 0;
let gameStartTime;
let score = 0;
let activeArrows = [false, false, false, false]; 
let noteTravelTime;
let songDuration;

function preload() {
  song = loadSound("inmyhead.wav", () => {
    songDuration = song.duration(); // get the duration of the song after it has been loaded
    song.onended(songEnded)
    img=loadImage("takevan.jpg");
  });
} 

function setup() {
  createCanvas(500, windowHeight);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  textSize(32); // Move textSize() here
  fft = new p5.FFT(0.8, 32);
  noteTravelTime = (height - 100) / 5; // 5 is the speed of the notes
}

function draw() {
  switch (state) {
    case gameState.MENU:
      drawMenu();
      break;
    case gameState.GAME:
      drawGame();
      break;
    case gameState.END:
      drawEndSequence();
      break;
  }
}

function drawMenu() {
  background(0);
  textSize(32);
  fill(255);
  text("Press ENTER to start the game", width / 2, height / 2);
}

function drawEndSequence() {
  background(0);
  fill(255);
  textSize(32);
  textStyle(BOLD);
  text("In My Head", width / 2, height / 2 - 300);
  image(img, width/2-125, height/2-280, 250, 250);
  textStyle(NORMAL);
  text("by Take Van", width / 2, height / 2 - 10);
  text("Score: " + score, width / 2, height / 2 + 45);
  textSize(24);
  text("Press ENTER to go back to Menu", width / 2, height / 2 + 100);
}


function songEnded() {
  state = gameState.END;
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
    } else if (state === gameState.END) {
      window.location.href = '../';
    }
  } else if (state === gameState.GAME) {
    const hitNoteIndex = notes.findIndex(note => {
      return note.arrowIndex === arrowIndex && note.y >= height - 150 && note.y <= height - 50;
    });

    if (hitNoteIndex !== -1 && !notes[hitNoteIndex].pressed) {
      score += 100;
      notes[hitNoteIndex].pressed = true;
      notes.splice(hitNoteIndex, 1);
    } else if (arrowIndex !== undefined && (hitNoteIndex === -1 || (hitNoteIndex !== -1 && notes[hitNoteIndex].pressed))) {
      // Deduct points or handle misses as needed
      score -= 50;
    }
  }
}


function drawScore() {
  fill(255);
  textSize(32);
  text(`Score: ${score}`, width / 2, 40);
}

function drawPercentage() { // function to draw the percentage text
  fill(255);
  textSize(24);
  let percentage = map(song.currentTime(), 0, songDuration, 0, 100); // map the current time to a percentage
  percentage = percentage.toFixed(0); // round the percentage to the nearest integer
  text(`${percentage}%`, width / 2, height - 25); // display the percentage text centered at the bottom of the canvas
}

function drawGame() {
  background(0);
  drawCircularVisualizer();
  //drawVisualizer();
  drawArrows();
  drawScore();
  drawPercentage();
  fft.analyze();

  generateNotes();

  for (let i = notes.length - 1; i >= 0; i--) {
    const note = notes[i];
    note.update();
    note.display();

    if (note.missed()) {
      // Deduct points or handle misses as needed
      score -= 50;
      note.pressed = true;
    }

    if (note.offScreen() || note.pressed) {
      notes.splice(i, 1);
    }
  }
}

function drawCircularVisualizer() {
  let spectrum = fft.analyze();
  let baseRadius = min(width, height) / 6;
  let numOfCircles = 3;

  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.01); // Rotation speed

  for (let n = 0; n < numOfCircles; n++) {
    let radius = baseRadius * (1 + n * 0.5);
    let segmentLength = spectrum.length / numOfCircles;
    let segmentStart = n * segmentLength;
    let segmentEnd = (n + 1) * segmentLength;

    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
      let angle = map(i, 0, spectrum.length, 0, TWO_PI);

      let r;
      if (i >= segmentStart && i < segmentEnd) {
        r = map(spectrum[i], 0, 255, radius, radius * 1.25);
      } else {
        r = radius;
      }

      let x = r * cos(angle);
      let y = r * sin(angle);

      stroke(255, 255, 255, 100);
      strokeWeight(2);
      noFill();
      vertex(x, y);
    }
    endShape(CLOSE);
  }
  pop();
}
function generateNotes() {
  let currentTime = millis() - gameStartTime - noteTravelTime;

  if (currentTime - lastNoteTime >= 200) {
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");
    let lowMid = fft.getEnergy("lowMid");
    let highMid = fft.getEnergy("highMid");

    let direction = round(random(0, 3)); // randomly choose a direction

    switch (direction) { // create a new note in the chosen direction
      case 0: // left
        if (bass > 250) { // adjust the threshold for the left arrow
          notes.push(new Arrow("LEFT"));
        }
        break;
      case 1: // up
        if (mid > 250) { // adjust the threshold for the up arrow
          notes.push(new Arrow("UP"));
        }
        break;
      case 2: // down
        if (lowMid > 130 && treble > 130) {
          notes.push(new Arrow("DOWN"));
        }
        break;
      case 3: // right
        if (highMid > 130 && bass > 130) {
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
  const arrowSize = 60;
  const yPos = height - 100;
  const xOffset = width / 2 - 1.5 * arrowSize;

  for (let i = 0; i < 4; i++) {
    let x = xOffset + i * arrowSize;
    let colorVal = activeArrows[i] ? color(255, 255, 255) : color(0, 0, 0);
    drawArrow(x, yPos, i, colorVal);
  }
}

class Arrow { // class for the arrows that fall down the screen
  constructor(direction) {
    this.direction = direction;
    this.y = 0;
    this.speed = 5;
    this.pressed = false;
    const arrowSize = 60;
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
    if (this.y >= height - 150 && this.y <= height - 50 && activeArrows[this.arrowIndex] && !this.pressed) {
      this.pressed = true;
      return true;
    }
    return false;
  }

  missed() {
    return this.y > height - 50 && !this.pressed;
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