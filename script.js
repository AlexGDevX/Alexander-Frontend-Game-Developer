console.log("Hello World! This is my Portofolio as junior developer");
function toggleMenu() {
  const menuIcon = document.querySelector(".menu-icon");
  const header = document.querySelector(".header");
  const navbar = document.querySelector(".navbar");
  const icon = menuIcon.querySelector("i");
  menuIcon.classList.toggle("active");
  header.classList.toggle("active");
  navbar.classList.toggle("active");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
  } else {
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar a");
  function handleNavClick(e) {
    e.preventDefault();
    const sectionId = this.getAttribute("href").substring(2);
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      targetSection.classList.add("fade-in");
      setTimeout(() => {
        targetSection.classList.remove("fade-in");
      }, 1000);
    }
  }
  navLinks.forEach((link) => link.addEventListener("click", handleNavClick));
});
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const lng = document.querySelector(".lng");
  if (window.scrollY < 150) {
    header.style.position = "absolute";
    lng.style.position = "absolute";
    header.style.background = "rgba(69, 69, 69, .5)";
  } else {
    lng.style.position = "fixed";
    header.style.position = "fixed";
    header.style.background = "rgb(35, 35, 35, .5)";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".interactive");
  const gradientContainer = document.querySelector(".gradients-container");
  if (!interBubble || !gradientContainer) return;
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;
  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  }
  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY + window.scrollY;
  });
  function createRandomBubbles(count) {
    for (let i = 0; i < count; i++) {
      const bubble = document.createElement("div");
      bubble.classList.add("bubble");
      const size = Math.random() * 10 + 250;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * document.body.scrollHeight;
      const duration = Math.random() * 15 + 5;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      bubble.style.background =
        "radial-gradient(circle, rgba(255, 255, 255, 0.39) 0%, rgba(36, 118, 165, 0.44) 100%)";
      bubble.style.position = "absolute";
      bubble.style.borderRadius = "50%";
      bubble.style.zIndex = "-1";
      bubble.style.top = `${y}px`;
      bubble.style.left = `${x}px`;
      bubble.style.animation = `moveInCircle,moveHorizontal, moveVertical ${duration}s ease-in-out infinite`;
      gradientContainer.appendChild(bubble);
    }
  }
  createRandomBubbles(13);
  move();
});

function randomChar() {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return chars[Math.floor(Math.random() * chars.length)];
}
function hackerEffect(element, newText) {
  let iterations = 0;
  let maxIterations = Math.min(8, newText.length / 30);
  element.style.opacity = "0.6";
  const interval = setInterval(() => {
    element.textContent = newText
      .split("")
      .map((char, index) => {
        if (index < iterations) {
          return newText[index];
        }
        return randomChar();
      })
      .join("");
    if (iterations >= maxIterations) {
      clearInterval(interval);
      element.textContent = newText;
      setTimeout(() => (element.style.opacity = "1"), 100);
    }
    iterations += 2;
  }, 50);
}
async function translateText(text, targetLang) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURI(
    text
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  return data[0][0][0];
}
async function changeLanguage(lang) {
  document.querySelectorAll("[data-lang]").forEach(async (el) => {
    const originalText = el.getAttribute("data-original") || el.innerText;
    el.setAttribute("data-original", originalText);
    let newText =
      lang === "en" ? originalText : await translateText(originalText, lang);
    el.textContent = "".padStart(newText.length, " ");
    hackerEffect(el, newText);
  });
}

function toggleLangButtons() {
  const buttons = document.querySelector(".lang-buttons");
  buttons.classList.toggle("show");
  const lngContainer = document.querySelector(".lng");
  lngContainer.classList.toggle("active");
}

function showProject(category, projectId) {
  const section = document.getElementById("work");
  const categoryContainer =
    category === "ui"
      ? document
          .querySelector(".btn-work")
          .nextElementSibling.querySelectorAll(".project-image")
      : document
          .querySelector(".btn-work-web")
          .nextElementSibling.querySelectorAll(".project-image");

  categoryContainer.forEach((img) => {
    img.classList.remove("active");
    img.style.display = "none";
    img.style.animation = "none";
  });

  const newImage = document.getElementById(projectId);
  newImage.style.display = "block";
  void newImage.offsetWidth;
  newImage.style.animation = "left-right .5s ease-in-out";
  newImage.classList.add("active");

  const buttonContainer =
    category === "ui"
      ? section.querySelectorAll(".btn-work button")
      : section.querySelectorAll(".btn-work-web button");
  buttonContainer.forEach((btn) => {
    btn.classList.remove("active-button");
    btn.removeAttribute("style");
  });

  const activeButton = event.target;
  activeButton.classList.add("active-button");
  activeButton.style.color = "rgb(57, 153, 170)";
  activeButton.style.boxShadow = "0px 0px 10px 2px rgba(125, 125, 125, 0.468)";
  activeButton.style.background =
    "linear-gradient(to top, rgba(0, 0, 0, 0) -10%, rgb(255, 255, 255) 50%, rgba(0, 0, 0, 0) 110%)";
  activeButton.style.transform = "scale(1.1)";
}

document.addEventListener("DOMContentLoaded", function () {
  const contactSection = document.querySelector(".contact");
  const contactTab = document.querySelector(".contact-tab");
  const contactLinks = document.querySelectorAll(
    ".intro-contact a[href='/#contact'], .navbar a[href='/#contact']"
  );
  const closeContact = document.querySelector(".close-contact");
  contactLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      contactSection.classList.add("show");
      contactSection.classList.remove("hide");
    });
  });
  function closeContactSection() {
    contactSection.classList.add("hide");

    setTimeout(() => {
      contactSection.classList.remove("show");
      contactSection.classList.remove("hide");
    }, 500);
  }
  closeContact.addEventListener("click", closeContactSection);
  contactSection.addEventListener("click", function (event) {
    if (event.target === contactSection) {
      closeContactSection();
    }
  });
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.textContent = "Sending...";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        submitButton.textContent = "Message Sent !";
        submitButton.style.backgroundColor = "#02343b";

        setTimeout(() => {
          submitButton.textContent = "Send Message";
          submitButton.style.backgroundColor = "";
          form.reset();
        }, 3000);
      } else {
        throw new Error("Failed to send message");
      }
    })
    .catch((error) => {
      submitButton.textContent = "Failed to Send";
      submitButton.style.backgroundColor = "red";
      setTimeout(() => {
        submitButton.textContent = "Send Message";
        submitButton.style.backgroundColor = "";
      }, 3000);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const scrollerInner = document.querySelector(".about-me .scroller_inner");

  const originalContent = scrollerInner.innerHTML;
  for (let i = 0; i < 99; i++) {
    scrollerInner.innerHTML += originalContent;
  }
});

function copyEmail() {
  const email = document.getElementById("emailText").innerText;
  const emailWrapper = document.getElementById("emailWrapper");
  const message = document.getElementById("copyMessage");
  navigator.clipboard.writeText(email).then(() => {
    emailWrapper.style.display = "none";

    message.classList.add("show");

    setTimeout(() => {
      message.classList.remove("show");
      emailWrapper.style.display = "inline-flex";
    }, 2000);
  });
}
