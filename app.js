const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector("#mobile-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  mobileNav.hidden = open;
});

document.querySelectorAll("#mobile-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const config = window.LIFE_QUEST_SITE || {};
const version = config.version || "0.19.0";
const downloadUrl = config.downloadUrl || "https://github.com/jn18005/career-quest-client-releases/releases/latest";

document.querySelector("#hero-version").textContent = `최신 버전 v${version}`;
document.querySelector("#download-version").textContent = `인생 퀘스트 v${version}`;
document.querySelector("#download-button").href = downloadUrl;
