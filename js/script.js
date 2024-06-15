// Change the theme between light and dark mode and update the icon accordingly
function switchTheme() {
  const switchModeBtn = document.getElementById("switchModeBtn");
  const bodyPage = document.body;
  
  // Toggle dark mode on the body
  bodyPage.classList.toggle("dark-mode");
  
  // Update icons and aria label based on the current theme
  if (bodyPage.classList.contains("dark-mode")) {
    switchModeBtn.classList.remove("fa-moon");
    switchModeBtn.classList.add("fa-sun");
    switchModeBtn.setAttribute("aria-label", "Switch to light mode");
    // Save dark mode theme preference
    localStorage.setItem("theme", "dark");
  } else {
    switchModeBtn.classList.remove("fa-sun");
    switchModeBtn.classList.add("fa-moon");
    switchModeBtn.setAttribute("aria-label", "Switch to dark mode");
    // Save light mode theme preference
    localStorage.setItem("theme", "light");
  }
}

// Load the selected theme saved from localStorage
function loadTheme() {
  const switchModeBtn = document.getElementById("switchModeBtn");
  const bodyPage = document.body;
  const savedTheme = localStorage.getItem("theme");

  // Update icons and aria label based on the selected theme
  if (savedTheme === "dark") {
    bodyPage.classList.add("dark-mode");
    switchModeBtn.classList.remove("fa-moon");
    switchModeBtn.classList.add("fa-sun");
    switchModeBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    bodyPage.classList.remove("dark-mode");
    switchModeBtn.classList.remove("fa-sun");
    switchModeBtn.classList.add("fa-moon");
    switchModeBtn.setAttribute("aria-label", "Switch to dark mode");
  }
}

// Load the theme when the page is loaded
window.onload = loadTheme();

// It gets the actual year and then appears inside of the specific id selector
function copyrightYear() {
  document.querySelector("#copyright-year").innerText = new Date().getFullYear();
}
window.onload = copyrightYear();

// It disable the mouse Right-Click to prevent from opening Context Menu
// function disableRightClick() {
// 	document.addEventListener("contextmenu", (e) => {
// 		e.preventDefault();
// 	}, false);
// }
// window.onload = disableRightClick();

// It disable the keyboard Control & Function keys to prevent from opening Source Code
// function disableShortcutKey() {
// 	document.addEventListener("keydown", (e) => {
// 		if (e.ctrlKey || (e.keyCode>=112 && e.keyCode<=123)) {
// 		e.stopPropagation();
// 		e.preventDefault();
// 		}
// 	});
// }
// window.onload = disableShortcutKey();
