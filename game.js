const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const highScoreEl = document.getElementById("highScore");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

let keys = {};
let highScore = localStorage.getItem("highScore") || 0;
highScoreEl.textContent = "High Score: " + highScore;

class Game {
  constructor() {
    this.reset();
  }

  reset() {
    this.score = 0;
    this.spikes = [];
    this.gameOver = false;
    this.difficulty = 1;
    this.player = { x: canvas.width / 2, y: canvas.height / 2, r: 28, speed: 5 };
  }

  start() {
    this.reset();
    startBtn.style.display = "none";
    restartBtn.style.display = "none";
    this.loop();
  }

  createSpike() {
    const size = 20 + Math.random() * 20;
    this.spikes.push({
      x: Math.random() * (canvas.width - size),
      y: 0,
      size,
      speed: 2 + Math.random() * (2 + this.difficulty),
    });
  }

  isColliding(p, s) {
    const dx = p.x - (s.x + s.size / 2);
    const dy = p.y - (s.y + s.size / 2);
    return Math.sqrt(dx * dx + dy * dy) < p.r + s.size / 2;
  }

  update() {
    if (this.gameOver) return;

    if (keys["ArrowUp"]) this.player.y -= this.player.speed;
    if (keys["ArrowDown"]) this.player.y += this.player.speed;
    if (keys["ArrowLeft"]) this.player.x -= this.player.speed;
    if (keys["ArrowRight"]) this.player.x += this.player.speed;

    this.player.x = Math.max(this.player.r, Math.min(canvas.width - this.player.r, this.player.x));
    this.player.y = Math.max(this.player.r, Math.min(canvas.height - this.player.r, this.player.y));

    this.spikes.forEach((s) => (s.y += s.speed));

    for (const s of this.spikes) {
      if (this.isColliding(this.player, s)) {
        this.gameOver = true;
        restartBtn.style.display = "inline-block";
        if (this.score > highScore) {
          highScore = this.score;
          localStorage.setItem("highScore", highScore);
          highScoreEl.textContent = "High Score: " + highScore;
        }
        return;
      }
    }

    this.spikes = this.spikes.filter((s) => s.y < canvas.height);
    this.score++;
    scoreEl.textContent = "Score: " + this.score;

    if (this.score % 500 === 0) this.difficulty += 0.5;
    if (Math.random() < 0.03 * this.difficulty) this.createSpike();
  }

  drawSoccerBall(x, y, r) {
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawSoccerBall(this.player.x, this.player.y, this.player.r);

    ctx.fillStyle = "red";
    this.spikes.forEach((s) => {
      ctx.beginPath();
      ctx.moveTo(s.x + s.size / 2, s.y);
      ctx.lineTo(s.x + s.size, s.y + s.size);
      ctx.lineTo(s.x, s.y + s.size);
      ctx.closePath();
      ctx.fill();
    });

    if (this.gameOver) {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.font = "bold 48px Arial";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 20);

      ctx.font = "24px Arial";
      ctx.fillText("Score: " + this.score, canvas.width / 2, canvas.height / 2 + 20);
      ctx.fillText("High Score: " + highScore, canvas.width / 2, canvas.height / 2 + 60);
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

const game = new Game();

// 키 입력
document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) e.preventDefault();
  if ((e.key === "r" || e.key === "R") && game.gameOver) game.start();
  if (e.key === " " && startBtn.style.display !== "none") game.start();
});
document.addEventListener("keyup", (e) => (keys[e.key] = false));

startBtn.addEventListener("click", () => game.start());
restartBtn.addEventListener("click", () => game.start());
