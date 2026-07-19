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
const downloadUrl = config.downloadUrl || "https://github.com/jn18005/career-quest-client-releases/releases/latest/download/LifeQuest-Setup.exe";
const releaseApiUrl = config.releaseApiUrl || "https://api.github.com/repos/jn18005/career-quest-client-releases/releases?per_page=100";
const downloadAssetName = config.downloadAssetName || "LifeQuest-Setup.exe";

const heroVersion = document.querySelector("#hero-version");
const downloadVersion = document.querySelector("#download-version");
const downloadButton = document.querySelector("#download-button");

if (heroVersion) heroVersion.textContent = `최신 버전 v${version}`;
if (downloadVersion) downloadVersion.textContent = `인생 퀘스트 v${version}`;
if (downloadButton) downloadButton.href = downloadUrl;

const countElement = document.querySelector("#download-count");
const countUnitElement = document.querySelector("#download-count-unit");
const CACHE_KEY = "lifeQuestDownloadCount";
const CACHE_MAX_AGE = 15 * 60 * 1000;

function renderDownloadCount(value) {
  if (!countElement) return;
  countElement.textContent = Number(value).toLocaleString("ko-KR");
  if (countUnitElement) countUnitElement.textContent = "회";
}

function readCachedCount() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (!cached || !Number.isFinite(cached.value)) return null;
    return cached;
  } catch {
    return null;
  }
}

async function loadDownloadCount() {
  if (!countElement) return;

  const cached = readCachedCount();
  if (cached) renderDownloadCount(cached.value);
  if (cached && Date.now() - cached.savedAt < CACHE_MAX_AGE) return;

  try {
    const response = await fetch(releaseApiUrl, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!response.ok) throw new Error(`GitHub API ${response.status}`);

    const releases = await response.json();
    const total = releases.reduce((releaseTotal, release) => {
      const assetTotal = (release.assets || [])
        .filter((asset) => asset.name === downloadAssetName)
        .reduce((sum, asset) => sum + Number(asset.download_count || 0), 0);
      return releaseTotal + assetTotal;
    }, 0);

    renderDownloadCount(total);
    localStorage.setItem(CACHE_KEY, JSON.stringify({ value: total, savedAt: Date.now() }));
  } catch (error) {
    console.warn("다운로드 수를 불러오지 못했습니다.", error);
    if (!cached) {
      countElement.textContent = "집계 준비 중";
      if (countUnitElement) countUnitElement.textContent = "";
    }
  }
}

loadDownloadCount();
