// NAVBAR SHRINK
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    if (window.scrollY > 60) navbar.classList.add("shrink");
    else navbar.classList.remove("shrink");
});

// MOBILE MENU TOGGLE
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));

// DARK MODE
document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
});

// TYPING EFFECT
const textArray = [
    "IT Specialist",
    "Web & Mobile Developer",
    "System Builder",
    "Future Software Engineer"
];

let i = 0, j = 0, currentText = "", isDeleting = false;

function typeEffect() {
    currentText = textArray[i];

    document.querySelector(".typed-text").textContent =
        currentText.substring(0, j);

    if (!isDeleting) {
        j++;
        if (j === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }
    } else {
        j--;
        if (j === 0) {
            isDeleting = false;
            i = (i + 1) % textArray.length;
        }
    }
    setTimeout(typeEffect, isDeleting ? 70 : 110);
}
typeEffect();

// SCROLL REVEAL
const revealElements = document.querySelectorAll(".reveal");
const fadeUpElements = document.querySelectorAll(".fade-up");

function revealOnScroll() {
    revealElements.forEach(el => {
        let top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 60) el.classList.add("active");
    });

    fadeUpElements.forEach(el => {
        let top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 80) el.classList.add("show");
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();
