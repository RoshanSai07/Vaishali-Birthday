// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");

if (musicToggle && backgroundMusic) {
  musicToggle.addEventListener("click", function () {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicToggle.textContent = "🎵 Pause Music";
    } else {
      backgroundMusic.pause();
      musicToggle.textContent = "🎵 Play Music";
    }
  });
}

// Add fade-in animation to elements as they come into view
document.addEventListener("DOMContentLoaded", function () {
  // Elements to animate
  const animateElements = [
    ...document.querySelectorAll(".hero-item"),
    ...document.querySelectorAll(".feature-card"),
    document.querySelector(".person-photo"),
    document.querySelector(".person-message"),
    ...document.querySelectorAll(".memory-card"),
  ];

  // Create intersection observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe each element
  animateElements.forEach((element) => {
    if (element) {
      // Set initial opacity to 0
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      observer.observe(element);
    }
  });

  // Add confetti effect to birthday photo on click
  let confettiTimeout;
  const birthdayPhoto = document.getElementById("birthdayPhoto");
  if (birthdayPhoto) {
    birthdayPhoto.addEventListener("click", () => {
      clearTimeout(confettiTimeout);
      createConfetti();
      confettiTimeout = setTimeout(() => createConfetti(), 2000); // Prevent spam clicking
    });
  }
});

// Confetti effect
function createConfetti() {
  const confettiContainer = document.createElement("div");
  confettiContainer.className = "confetti-container";
  Object.assign(confettiContainer.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "9999",
  });

  document.body.appendChild(confettiContainer);

  const colors = ["#FF4D6D", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"];
  const style = document.createElement("style");

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    Object.assign(confetti.style, {
      position: "absolute",
      width: `${Math.random() * 10 + 5}px`,
      height: `${Math.random() * 5 + 5}px`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      left: `${Math.random() * 100}%`,
      top: "-10px",
      borderRadius: "2px",
    });

    let rotate = Math.random() * 360;
    let duration = Math.random() * 3 + 2;
    let animationName = `fall-${i}`;

    style.textContent += `
      @keyframes ${animationName} {
        to {
          transform: translateY(100vh) rotate(${rotate}deg);
        }
      }
    `;
    confetti.style.animation = `${animationName} ${duration}s linear forwards`;

    confettiContainer.appendChild(confetti);
  }

  document.head.appendChild(style);

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.remove();
    style.remove();
  }, 5000);
}

// Enable smooth scrolling
document.documentElement.style.scrollBehavior = "smooth";

const carousel = document.querySelector(".memories-grid");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");

let scrollAmount = 0;
const scrollStep = 200;

nextBtn.addEventListener("click", () => {
  if (scrollAmount <= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount += scrollStep;
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
});

prevBtn.addEventListener("click", () => {
  if (scrollAmount > 0) {
    scrollAmount -= scrollStep;
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
});
