let ghost;
let score = 0;
let duration = 30;
let startTime;
let state = 'start';
let spawnEvery = 60;
function setup() {
  createCanvas(480, 360);
  spawnGhost();
randomSeed(41)
  noiseSeed(47)
    
  for ( i=0;i<85;i++){
    let x = noise(random(1000))*480*3
    let y = noise(random(1000))*360*3
    let pos = [x-480,y-360,6,3,5]
    starPositions.push(pos)
  }
}
let starPositions = []
function draw() {
  background(15, 10, 25);
  for (let i = 0; i < starPositions.length; i++) {
  drawStar(
    starPositions[i][0],
    starPositions[i][1],
    starPositions[i][2],
    starPositions[i][3],
    starPositions[i][4]
  );
}
  fill('#d2e09e')
  ellipse(370,70,60)
  fill("#143922")
  rect(0,360-85,480,85)
  if (state === 'start') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Click to start', width / 2, height / 2);
    return;
  }

  if (state === 'over') {
    textAlign(CENTER, CENTER);
    fill(255);
    textSize(22);
    text('Game over\nScore: ' + score + '\nClick to retry', width / 2, height / 2);
    return;
  }
   let elapsed = (millis() - startTime) / 1000;
  let timeLeft = max(0, duration - elapsed);
  if (timeLeft <= 0) {
    state = 'over';
    return;
  }
if (frameCount % spawnEvery === 0) spawnGhost();
  drawGhost(ghost.x, ghost.y);

  textAlign(LEFT, TOP);
  fill(255);
  textSize(16);
  text('Score: ' + score, 12, 10);
  textAlign(RIGHT, TOP);
  text('Time: ' + ceil(timeLeft), width - 12, 10);
}
function mousePressed() {
  if (state === 'start' || state === 'over') {
    state = 'play';
    score = 0;
    startTime = millis();
    spawnGhost();
    return;
  }
  if (dist(mouseX, mouseY, ghost.x, ghost.y) < 30) {
    score++;
    spawnGhost();
  }
}
function spawnGhost() {
  ghost = { x: random(40, width - 40), y: random(40, height - 40) };
}

function drawGhost(x, y) {
  noStroke();
  fill(220, 255, 230);
  ellipse(x, y, 60, 60);
  fill(20);
  ellipse(x - 12, y - 5, 10);
  ellipse(x + 12, y - 5, 10);
  fill(255, 255, 255, 200); // White with a little transparency
  noStroke();
  
  fill('#e82121')
  ellipse(x,y+16,10,4)
  
}



function drawStar(x, y, numPoints, innerRadius, outerRadius) {
   let angle = TWO_PI / numPoints;
   let halfAngle = angle / 2.0;
   beginShape();
   for (let a = 0; a < TWO_PI; a += angle) {
       // Outer point
       let sx = x + cos(a) * outerRadius;
       let sy = y + sin(a) * outerRadius;
       vertex(sx, sy);
       // Inner pointa
       sx = x + cos(a + halfAngle) * innerRadius;
       sy = y + sin(a + halfAngle) * innerRadius;
       vertex(sx, sy);
   }
   endShape(CLOSE);
}


