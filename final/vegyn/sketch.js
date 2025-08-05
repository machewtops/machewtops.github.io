// rhythm game v2.5, adds an audiovisualizer

// notes for stuff to add. 
// make the arrows spread out a bit more, and color the 4 main arrows like the notes, though maybe a bit lighter/darker to differentiate?
// use a really simple tonal song that only generates the exact notes intended, as a tutorial of sorts that can teach the user how to play if needed.

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
  song = loadSound("vegyn.mp3", () => {
    songDuration = song.duration(); // get the duration of the song after it has been loaded
    song.onended(songEnded)
  });
  img=loadImage("vegyn.jpg");
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
  text("harshities and niceness", width / 2, height / 2 - 300);
  image(img, width/2-125, height/2-280, 250, 250);
  textStyle(NORMAL);
  text("by Vegyn", width / 2, height / 2 - 10);
  text("Score: " + score, width / 2, height / 2 + 45);
  textSize(24);
  text("Press ENTER to go back to Menu", width / 2, height / 2 + 100);
}

function songEnded() {
  state = gameState.END;
}

function handleArrowPress(arrowIndex) {
  if (arrowIndex === undefined) return;

  activeArrows[arrowIndex] = true;

  if (state === gameState.GAME) {
    const hitNoteIndex = notes.findIndex(note => {
      return note.arrowIndex === arrowIndex && note.y >= height - 150 && note.y <= height - 50;
    });

    if (hitNoteIndex !== -1 && !notes[hitNoteIndex].pressed) {
      score += 100;
      notes[hitNoteIndex].pressed = true;
      notes.splice(hitNoteIndex, 1);
    } else {
      score -= 50;
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    handleArrowPress(0);
  } else if (keyCode === UP_ARROW) {
    handleArrowPress(1);
  } else if (keyCode === DOWN_ARROW) {
    handleArrowPress(2);
  } else if (keyCode === RIGHT_ARROW) {
    handleArrowPress(3);
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
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) activeArrows[0] = false;
  else if (keyCode === UP_ARROW) activeArrows[1] = false;
  else if (keyCode === DOWN_ARROW) activeArrows[2] = false;
  else if (keyCode === RIGHT_ARROW) activeArrows[3] = false;
}

function touchStarted() {
  if (state === gameState.GAME) {
    handleTouchInput();
  }
  return false;
}

function touchEnded() {
  activeArrows = [false, false, false, false];
  return false;
}

function handleTouchInput() {
  const arrowSize = 60;
  const yPos = height - 100;
  const xOffset = width / 2 - 1.5 * arrowSize;

  for (let t of touches) {
    for (let i = 0; i < 4; i++) {
      let x = xOffset + i * arrowSize;
      if (
        t.x > x - arrowSize / 2 && t.x < x + arrowSize / 2 &&
        t.y > yPos - arrowSize / 2 && t.y < yPos + arrowSize / 2
      ) {
        handleArrowPress(i);
      }
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

function drawArrow(x, y, rotation, colorVal) {
  push();
  translate(x, y);
  rotate(rotation * PI / 2);
  fill(colorVal);
  noStroke();
  triangle(-20, 20, 0, -20, 20, 20);
  stroke(0);
  strokeWeight(5);
  line(-10, 15, 0, -15);
  line(0, -15, 10, 15);
  pop();
}
