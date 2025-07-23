let bgCol = document.getElementById("bgCol");
let section1 = document.getElementById("section1");
let section2 = document.getElementById("section2");
let heading1 = document.getElementById("heading1");
let t1 = document.getElementById("t1");
let t3 = document.getElementById("t3");
let menuIcon = document.getElementById("menuIcon");
let navLinks = document.getElementById("navLinks");
let dc=document.getElementById("dc");
let dca1=document.getElementById("dca1");
let dca2=document.getElementById("dca2");


let isDark = false;

if (menuIcon && navLinks) {
  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

if (bgCol) {
  bgCol.addEventListener("click", function () {
    if (!isDark) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
      bgCol.src = "assets/light.png";
      if (menuIcon) menuIcon.src = "assets/menu-light.png";
      if (section1) section1.style.backgroundColor = "#1a1a1a";
      if (heading1) heading1.style.color = "#dddddd";
      document.querySelectorAll("a").forEach(link => {
        link.style.color = "white";
      });
      if (section2) section2.style.backgroundColor = "#121826";
      document.querySelectorAll(".offer").forEach(el => {
        el.style.backgroundColor = "rgba(237, 238, 217, 1)";
        el.style.color = "black";
      });
      if (t1) t1.style.color = "black";
      if (t3) t3.style.color = "black";
      dc.style.color="black";
      dca1.style.color="rgb(20, 20, 219)";
      dca2.style.color="rgb(20, 20, 219)";
      isDark = true;
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
      bgCol.src = "assets/dark.png";
      if (menuIcon) menuIcon.src = "assets/menu.png";
      if (section1) section1.style.backgroundColor = "#f7f7f7";
      if (heading1) heading1.style.color = "#1d292dff";
      document.querySelectorAll("a").forEach(link => {
        link.style.color = "black";
      });
      if (section2) section2.style.backgroundColor = "white";
      document.querySelectorAll(".offer").forEach(el => {
        el.style.backgroundColor = "white";
        el.style.color = "black";
      });
      isDark = false;
    }
  });
}

const text = "Welcome to Miratos - Innovate. Scale. Deliver.";
let i = 0;
function type() {
  if (heading1) {
    if (i < text.length) {
      heading1.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    } else {
      setTimeout(() => {
        heading1.textContent = "";
        i = 0;
        type();
      }, 2000);
    }
  }
}

const carousel = document.getElementById("carousel");
let scrollAmount = 0;
let slideTimer;

function autoSlide() {
  if (carousel) {
    if (carousel.scrollWidth - carousel.clientWidth <= scrollAmount) {
      scrollAmount = 0;
    } else {
      scrollAmount += 320;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}

if (carousel) {
  carousel.addEventListener("mouseenter", () => clearInterval(slideTimer));
  carousel.addEventListener("mouseleave", () => {
    slideTimer = setInterval(autoSlide, 2000);
  });
}

window.onload = function () {
  type();
  if (carousel) {
    slideTimer = setInterval(autoSlide, 2000);
  }
};


