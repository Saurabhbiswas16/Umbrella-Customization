/* ───────── ELEMENTS ───────── */
const umbrella = document.getElementById("umbrella");
const logo = document.getElementById("logo");
const loader = document.getElementById("loader");

const swatches = document.querySelectorAll(".swatch");
const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const label = uploadBtn.querySelector(".label");
const closeBtn = uploadBtn.querySelector(".close");

/* ───────── STATE ───────── */
let currentColor = localStorage.getItem("umbrellaColor") || "blue";

/* ───────── CONFIG ───────── */
const config = {
  blue: {
    img: "assets/blue.png",
    theme: "#00a3e0",
    bg: "#eaf6fb"
  },
  pink: {
    img: "assets/pink.png",
    theme: "#e91e63",
    bg: "#fdeaf1"
  },
  yellow: {
    img: "assets/yellow.png",
    theme: "#f5c518",
    bg: "#fff7db"
  }
};

/* ───────── THEME ───────── */
function setTheme(color) {
  document.body.style.background = config[color].bg;
  document.documentElement.style.setProperty("--theme", config[color].theme);
}

/* ───────── LOADER VISIBILITY ───────── */
function showLoader() {
  loader.style.display = "block";
  umbrella.style.display = "none";
  logo.style.display = "none";

  applyLoaderColorFromStorage();
}

function hideLoader() {
  loader.style.display = "none";
  umbrella.style.display = "block";

  if (localStorage.getItem("umbrellaLogo")) {
    logo.style.display = "block";
  }
}

/* ───────── MAIN LOADER COLOR (JS ONLY) ───────── */
function applyLoaderColorFromStorage() {
  const colorKey = localStorage.getItem("umbrellaColor") || "blue";
  const color = config[colorKey].theme;

  // Inline SVG
  const svg = loader.querySelector("svg");
  if (svg) {
    svg.style.fill = color;
    return;
  }

  // SVG inside <img>
  const img = loader.querySelector("img");
  if (img) {
    img.style.filter = getColorFilter(color);
  }
}

/* ───────── FILTER MAP (ONLY 3 COLORS) ───────── */
function getColorFilter(color) {
  const map = {
    "#00a3e0":
      "invert(48%) sepia(86%) saturate(1843%) hue-rotate(176deg) brightness(96%) contrast(101%)",
    "#e91e63":
      "invert(29%) sepia(94%) saturate(2591%) hue-rotate(327deg) brightness(93%) contrast(101%)",
    "#f5c518":
      "invert(83%) sepia(42%) saturate(1122%) hue-rotate(356deg) brightness(103%) contrast(97%)"
  };
  return map[color] || "none";
}

/* ───────── COLOR SWITCH ───────── */
swatches.forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.dataset.color === currentColor) return;

    swatches.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    currentColor = btn.dataset.color;

    // ✅ persist selected color
    localStorage.setItem("umbrellaColor", currentColor);

    setTheme(currentColor);

    showLoader();
    umbrella.classList.add("umbrella-fade");

    setTimeout(() => {
      umbrella.src = config[currentColor].img;
      umbrella.classList.remove("umbrella-fade");
      hideLoader();
    }, 600);
  });
});

/* ───────── BUTTON STATE ───────── */
function setButtonState(state, text) {
  uploadBtn.classList.remove("idle", "uploading", "uploaded");
  uploadBtn.classList.add(state);
  label.textContent = text;
}

/* ───────── OPEN FILE PICKER ───────── */
uploadBtn.addEventListener("click", () => {
  if (uploadBtn.classList.contains("uploaded")) return;
  fileInput.click();
});

/* ───────── FILE UPLOAD ───────── */
fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (!file) return;

  setButtonState("uploading", "Uploading...");
  showLoader();

  const reader = new FileReader();
  reader.onload = e => {
    setTimeout(() => {
      const base64 = e.target.result;

      logo.src = base64;
      logo.style.display = "block";

      // ✅ persist logo & filename
      localStorage.setItem("umbrellaLogo", base64);
      localStorage.setItem("umbrellaLogoName", file.name);

      hideLoader();
      setButtonState("uploaded", file.name);
    }, 900);
  };

  reader.readAsDataURL(file);
});

/* ───────── REMOVE LOGO ───────── */
closeBtn.addEventListener("click", e => {
  e.stopPropagation();

  logo.src = "";
  logo.style.display = "none";
  fileInput.value = "";

  setButtonState("idle", "UPLOAD LOGO");

  localStorage.removeItem("umbrellaLogo");
  localStorage.removeItem("umbrellaLogoName");
});

/* ───────── RESTORE STATE ON LOAD ───────── */
window.addEventListener("load", () => {
  // restore color
  setTheme(currentColor);
  applyLoaderColorFromStorage();

  swatches.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.color === currentColor);
  });

  // restore logo
  const savedLogo = localStorage.getItem("umbrellaLogo");
  const savedName = localStorage.getItem("umbrellaLogoName");

  if (savedLogo && savedName) {
    logo.src = savedLogo;
    logo.style.display = "block";
    setButtonState("uploaded", savedName);
  }
});
