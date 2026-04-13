const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

let score = 0;
let gameOver = false;
let spikes = [];
const keys = {};

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 28,
  speed: 5,
};

// 키 입력
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }
});
document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// R키로 재시작
document.addEventListener("keydown", (e) => {
  if ((e.key === "r" || e.key === "R") && gameOver) resetGame();
});

restartBtn.addEventListener("click", resetGame);

// 가시 생성
function createSpike() {
  const size = 25;
  spikes.push({
    x: Math.random() * (canvas.width - size),
    y: 0,
    size,
    speed: 2 + Math.random() * 3,
  });
}

// 충돌 체크
function isColliding(p, s) {
  const dx = p.x - (s.x + s.size / 2);
  const dy = p.y - (s.y + s.size / 2);
  return Math.sqrt(dx * dx + dy * dy) < p.r + s.size / 2;
}

// 축구공 그리기
function drawSoccerBall(x, y, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.clip();

  ctx.fillStyle = "white";
  ctx.fillRect(x - r, y - r, r * 2, r * 2);

  const penR = r * 0.38;
  const penAngles = [];
  for (let i = 0; i < 5; i++) {
    penAngles.push(-Math.PI / 2 + (i * 2 * Math.PI) / 5);
  }

  // 중앙 오각형
  ctx.fillStyle = "#111";
  ctx.beginPath();
  penAngles.forEach((a, i) => {
    const px = x + penR * Math.cos(a);
    const py = y + penR * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.fill();

  // 바깥 5개 오각형
  const outerDist = r * 0.78;
  for (let i = 0; i < 5; i++) {
    const baseAngle = penAngles[i];
    const cx2 = x + outerDist * Math.cos(baseAngle);
    const cy2 = y + outerDist * Math.sin(baseAngle);
    const smallR = r * 0.3;

    ctx.fillStyle = "#111";
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const a = baseAngle + Math.PI + (j * 2 * Math.PI) / 5;
      const px = cx2 + smallR * Math.cos(a);
      const py = cy2 + smallR * Math.sin(a);
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  }

  // 솔기 선
  ctx.strokeStyle = "#222";
  ctx.lineWidth = r * 0.06;
  ctx.lineJoin = "round";
  ctx.beginPath();
  penAngles.forEach((a, i) => {
    const px = x + penR * Math.cos(a);
    const py = y + penR * Math.sin(a);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();
  ctx.stroke();

  for (let i = 0; i < 5; i++) {
    const a = penAngles[i];
    const innerX = x + penR * Math.cos(a);
    const innerY = y + penR * Math.sin(a);
    const outerX = x + outerDist * Math.cos(a);
    const outerY = y + outerDist * Math.sin(a);

    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(outerX, outerY);
    ctx.stroke();

    const smallR = r * 0.3;
    ctx.beginPath();
    for (let j = 0; j < 5; j++) {
      const sa = a + Math.PI + (j * 2 * Math.PI) / 5;
      const px = outerX + smallR * Math.cos(sa);
      const py = outerY + smallR * Math.sin(sa);
      if (j === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.restore();

  // 바깥 원 테두리
  ctx.strokeStyle = "#111";
  ctx.lineWidth = r * 0.06;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.stroke();

  // 빛 반사
  ctx.save();
  const grad = ctx.createRadialGradient(
    x - r * 0.3, y - r * 0.3, r * 0.05,
    x - r * 0.15, y - r * 0.15, r * 0.7
  );
  grad.addColorStop(0, "rgba(255,255,255,0.45)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.restore();
}

// 업데이트
function update() {
  if (gameOver) return;

  if (keys["ArrowUp"])    player.y -= player.speed;
  if (keys["ArrowDown"])  player.y += player.speed;
  if (keys["ArrowLeft"])  player.x -= player.speed;
  if (keys["ArrowRight"]) player.x += player.speed;

  player.x = Math.max(player.r, Math.min(canvas.width - player.r, player.x));
  player.y = Math.max(player.r, Math.min(canvas.height - player.r, player.y));

  spikes.forEach((s) => (s.y += s.speed));

  for (const s of spikes) {
    if (isColliding(player, s)) {
      gameOver = true;
      restartBtn.style.display = "inline-block";
      return;
    }
  }

  spikes = spikes.filter((s) => s.y < canvas.height);
  score++;
  scoreEl.textContent = "Score: " + score;

  if (Math.random() < 0.03) createSpike();
}

// 그리기
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawSoccerBall(player.x, player.y, player.r);

  ctx.fillStyle = "red";
  spikes.forEach((s) => {
    ctx.beginPath();
    ctx.moveTo(s.x + s.size / 2, s.y);
    ctx.lineTo(s.x + s.size, s.y + s.size);
    ctx.lineTo(s.x, s.y + s.size);
    ctx.closePath();
    ctx.fill();
  });

  if (gameOver) {
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "bold 48px Arial";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 20);

    ctx.font = "18px Arial";
    ctx.fillStyle = "#aaa";
    ctx.fillText("R키 또는 버튼으로 재시작", canvas.width / 2, canvas.height / 2 + 60);
  }
}

// 재시작
function resetGame() {
  score = 0;
  gameOver = false;
  spikes = [];
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  scoreEl.textContent = "Score: 0";
  restartBtn.style.display = "none";
}

// 게임 루프
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
