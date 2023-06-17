// Set up the canvas
const canvas = document.createElement('canvas');
canvas.width = 1000;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Box attributes
const boxWidth = 50;
const boxHeight = 50;
let box1X = 400;
let box1Y = 400;
const box1Speed = 10;

let box2X = 800;
let box2Y = 200;
const box2Speed = 10;

// Bullet attributes
const bulletWidth = 10;
const bulletHeight = 5;
const bulletSpeed = 10;
let bullet1X = 0;
let bullet1Y = 0;
let bullet1State = 'ready';

let bullet2X = 0;
let bullet2Y = 0;
let bullet2State = 'ready';

// Game loop
let running = true;

function box(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, boxWidth, boxHeight);
}

function fireBullet1(x, y, direction) {
  bullet1State = 'fire';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + boxHeight / 2 - bulletHeight / 2, bulletWidth, bulletHeight);
  if (direction === 'left') {
    return -bulletSpeed;
  } else if (direction === 'right') {
    return bulletSpeed;
  }
  return 0;
}

function fireBullet2(x, y, direction) {
  bullet2State = 'fire';
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y + boxHeight / 2 - bulletHeight / 2, bulletWidth, bulletHeight);
  if (direction === 'left') {
    return -bulletSpeed;
  } else if (direction === 'right') {
    return bulletSpeed;
  }
  return 0;
}

let box1HitCount = 0;
let box2HitCount = 0;

function displayHitCounts() {
  ctx.font = '25px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`RED Hits: ${box1HitCount}`, 10, 20);
  ctx.fillText(`Green Hits: ${box2HitCount}`, canvas.width - 160, 20);
}

function update() {
  // Clear the canvas
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw the boxes
  box(box1X, box1Y, '#ff0000');
  box(box2X, box2Y, '#00ff00');

  // Draw the bullets
  if (bullet1State === 'fire') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bullet1X, bullet1Y + boxHeight / 2 - bulletHeight / 2, bulletWidth, bulletHeight);
  }

  if (bullet2State === 'fire') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(bullet2X, bullet2Y + boxHeight / 2 - bulletHeight / 2, bulletWidth, bulletHeight);
  }

  // Display hit counts
  displayHitCounts();

  // Check if box1HitCount reaches 25
  if (box1HitCount >= 50 || box2HitCount >= 25) {
    running = false;
    endGame();
  }
}

function endGame() {
  let winnerMessage = '';
  let winnerMessage2 = '';
  if (box1HitCount >= 50) {
    winnerMessage = 'Player Red (Box 1) Won!';
    winnerMessage2 = 'reload to play again!'
  } else if (box2HitCount >= 50) {
    winnerMessage = 'Player Green (Box 2) Won!';
    winnerMessage2 = `reload to play again`
  }

  ctx.font = '30px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(winnerMessage, canvas.width / 2 - 120, canvas.height / 2);
  ctx.fillText(winnerMessage2, canvas.width / 2 - 120, canvas.height / 2 + 60);
}

function gameLoop() {
  if (!running) {
    return;
  }

  // Update box 2 movement
if (leftPressed) {
  box2X -= box2Speed;
  if (box2X < 0) {
    box2X = canvas.width - boxWidth; // Wrap around to the right side of the screen
  }
}
if (rightPressed) {
  box2X += box2Speed;
  if (box2X > canvas.width - boxWidth) {
    box2X = 0; // Wrap around to the left side of the screen
  }
}
if (upPressed) {
  box2Y -= box2Speed;
  if (box2Y < 0) {
    box2Y = canvas.height - boxHeight; // Wrap around to the bottom of the screen
  }
}
if (downPressed) {
  box2Y += box2Speed;
  if (box2Y > canvas.height - boxHeight) {
    box2Y = 0; // Wrap around to the top of the screen
  }
}

// Update box 1 movement
if (aPressed) {
  box1X -= box1Speed;
  if (box1X < 0) {
    box1X = canvas.width - boxWidth; // Wrap around to the right side of the screen
  }
}
if (dPressed) {
  box1X += box1Speed;
  if (box1X > canvas.width - boxWidth) {
    box1X = 0; // Wrap around to the left side of the screen
  }
}
if (wPressed) {
  box1Y -= box1Speed;
  if (box1Y < 0) {
    box1Y = canvas.height - boxHeight; // Wrap around to the bottom of the screen
  }
}
if (sPressed) {
  box1Y += box1Speed;
  if (box1Y > canvas.height - boxHeight) {
    box1Y = 0; // Wrap around to the top of the screen
  }
}

  // Update bullet1 position
  if (bullet1State === 'fire') {
    if (bullet1X > canvas.width || bullet1X < 0) {
      bullet1State = 'ready';
    } else {
      if (
        bullet1Direction === 'left' &&
        bullet1Y >= box1Y &&
        bullet1Y <= box1Y + boxHeight &&
        bullet1X >= box1X &&
        bullet1X <= box1X + boxWidth
      ) {
        bullet1State = 'ready';
      } else if (
        bullet1Direction === 'right' &&
        bullet1Y >= box2Y - 25 &&
        bullet1Y <= box2Y + 25 &&
        bullet1X >= box2X &&
        bullet1X <= box2X + boxWidth
      ) {
        bullet1State = 'ready';
        box1HitCount++;
      }

      if (bullet1State === 'fire') {
        bullet1X += fireBullet1(bullet1X, bullet1Y, bullet1Direction);
      }
    }
  }

  // Update bullet2 position
  if (bullet2State === 'fire') {
    if (bullet2X > canvas.width || bullet2X < 0) {
      bullet2State = 'ready';
    } else {
      if (
        bullet2Direction === 'left' &&
        bullet2Y >= box1Y - 25 &&
        bullet2Y <= box1Y + 25 &&
        bullet2X >= box1X &&
        bullet2X <= box1X + boxWidth
      ) {
        bullet2State = 'ready';
        box2HitCount++;
      } else if (
        bullet2Direction === 'right' &&
        bullet2Y >= box2Y &&
        bullet2Y <= box2Y &&
        bullet2X >= box2X &&
        bullet2X <= box2X + boxWidth
      ) {
        bullet2State = 'ready';
      }

      if (bullet2State === 'fire') {
        bullet2X += fireBullet2(bullet2X, bullet2Y, bullet2Direction);
      }
    }
  }

  update();
  requestAnimationFrame(gameLoop);
}

// Keyboard event listeners
let leftPressed = false;
let rightPressed = false;
let upPressed = false;
let downPressed = false;
let aPressed = false;
let dPressed = false;
let wPressed = false;
let sPressed = false;

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    leftPressed = true;
  }
  if (event.key === 'ArrowRight') {
    rightPressed = true;
  }
  if (event.key === 'ArrowUp') {
    upPressed = true;
  }
  if (event.key === 'ArrowDown') {
    downPressed = true;
  }
  if (event.key === 'a') {
    aPressed = true;
  }
  if (event.key === 'd') {
    dPressed = true;
  }
  if (event.key === 'w') {
    wPressed = true;
  }
  if (event.key === 's') {
    sPressed = true;
  }
  if (event.key === ' ') {
    if (bullet1State === 'ready') {
      bullet1X = box1X + boxWidth;
      bullet1Y = box1Y;
      bullet1State = 'fire';
      bullet1Direction = 'right';
    }
  }
  if (event.key === 'p') {
    if (bullet2State === 'ready') {
      bullet2X = box2X;
      bullet2Y = box2Y;
      bullet2State = 'fire';
      bullet2Direction = 'left';
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    leftPressed = false;
  }
  if (event.key === 'ArrowRight') {
    rightPressed = false;
  }
  if (event.key === 'ArrowUp') {
    upPressed = false;
  }
  if (event.key === 'ArrowDown') {
    downPressed = false;
  }
  if (event.key === 'a') {
    aPressed = false;
  }
  if (event.key === 'd') {
    dPressed = false;
  }
  if (event.key === 'w') {
    wPressed = false;
  }
  if (event.key === 's') {
    sPressed = false;
  }
});

gameLoop();
