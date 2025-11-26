// ---------------- TYPEWRITER ----------------
const typewriterText = "Happy Birthday Diksha";
let typeIndex = 0;

function typeWriter() {
   const typeEl = document.getElementById("typewriter");
   if (typeIndex < typewriterText.length) {
      typeEl.innerHTML += typewriterText.charAt(typeIndex);
      typeIndex++;
      setTimeout(typeWriter, 120);
   }
}
typeWriter();

// ---------------- SLIDESHOW ----------------
const slides = document.querySelectorAll(".slides");
const slideBg = document.getElementById("slide-bg");
let slideIndex = 0;

if (slides.length && slideBg) {
   slides.forEach(s => s.classList.remove("active"));
   slides[0].classList.add("active");
   slideBg.style.backgroundImage = `url('${slides[0].src}')`;

   function advanceSlide() {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
      slideBg.style.backgroundImage = `url('${slides[slideIndex].src}')`;
   }
   setInterval(advanceSlide, 2000);
}

// ---------------- GIFT BOX & MESSAGES ----------------
const restartBtn = document.getElementById("restart-btn");
const giftBox = document.getElementById("gift-box");
const message = document.getElementById("final-message");
const bgMusic = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

function openGift() {
   giftBox.style.display = "none";
   const messages = [
      "💖 Happy Birthday to the most amazing person! 🎉",
      "🎈 May your day be filled with laughter and joy! 😊",
      "🌸 Wishing you endless love, happiness, and beautiful memories! 💐",
      "✨ Keep shining and chasing your dreams! 🌟"
   ];

   let index = 0;

   startFireworks();
   playMusic();

   function showNextMessage() {
      if (index < messages.length) {
         message.innerHTML = messages[index];
         message.classList.remove("show");
         void message.offsetWidth;
         message.classList.add("show");
         index++;
         setTimeout(showNextMessage, 3000);
      } else {
         restartBtn.style.display = "inline-block";
      }
   }
   showNextMessage();
}

// ---------------- MUSIC CONTROL ----------------
function playMusic() {
   bgMusic.volume = 0.5;
   bgMusic.play().catch(() => console.log("User interaction required to play music."));
}

musicBtn.addEventListener("click", () => {
   if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.innerText = "Pause Music";
   } else {
      bgMusic.pause();
      musicBtn.innerText = "Play Music";
   }
});

// ---------------- RESTART ----------------
restartBtn.addEventListener("click", () => {
   message.innerHTML = "";
   restartBtn.style.display = "none";
   giftBox.style.display = "block";

   // Reset typewriter
   document.getElementById("typewriter").innerHTML = "";
   typeIndex = 0;
   typeWriter();

   // Reset slideshow
   slideIndex = 0;
   slides.forEach((s, i) => s.classList.toggle("active", i === 0));
   slideBg.style.backgroundImage = `url('${slides[0].src}')`;

   // Reset fireworks
   particles = [];
});

// ---------------- HEARTS ----------------
function heartsEffect() {
   const heart = document.createElement("div");
   heart.innerHTML = "❤️";
   heart.style.left = Math.random() * 100 + "vw";
   heart.style.top = "100vh";
   heart.style.fontSize = (Math.random() * 20 + 15) + "px";
   heart.style.position = "absolute";
   heart.style.animation = "floatUp 4s linear forwards";
   document.getElementById("hearts").appendChild(heart);
   setTimeout(() => heart.remove(), 4000);
}
setInterval(heartsEffect, 600);

// ---------------- BALLOONS ----------------
function balloonEffect() {
   const balloon = document.createElement("div");
   balloon.innerHTML = "🎈";
   balloon.style.left = Math.random() * 100 + "vw";
   balloon.style.bottom = "-50px";
   balloon.style.fontSize = "40px";
   balloon.style.position = "absolute";
   balloon.style.animation = "balloonUp 6s linear forwards";
   document.getElementById("balloons").appendChild(balloon);
   setTimeout(() => balloon.remove(), 6000);
}
setInterval(balloonEffect, 1200);

// ---------------- FIREWORKS ----------------
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
   constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.speedX = (Math.random() - 0.5) * 8;
      this.speedY = (Math.random() - 0.5) * 8;
      this.size = Math.random() * 4 + 2;
      this.color = color;
      this.life = 0;
   }
   update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life += 1;
      this.size *= 0.96;
   }
   draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
   }
}

function startFireworks() {
   setInterval(() => {
      let x = Math.random() * canvas.width;
      let y = Math.random() * canvas.height / 2;
      for (let i = 0; i < 60; i++) {
         particles.push(new Particle(x, y, `hsl(${Math.random() * 360},100%,60%)`));
      }
   }, 400);
   animateFireworks();
}

function animateFireworks() {
   ctx.fillStyle = "rgba(0,0,0,0.2)";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
   particles.forEach((p, i) => {
      p.update();
      p.draw();
      if (p.life > 50 || p.size < 0.5) particles.splice(i, 1);
   });
   requestAnimationFrame(animateFireworks);
}
