// Toggles the theme between Light and Dark mode, and updates the icon accordingly
function switchTheme() {
  const switchModeBtn = document.getElementById("switchModeBtn");
  const bodyPage = document.body;
  
  // Toggle dark mode in the body of the page
  bodyPage.classList.toggle("dark-mode");
  
  // Toggle icons and aria label based on the current theme
  if (switchModeBtn.classList.contains("fa-moon")) {
    switchModeBtn.classList.remove("fa-moon");
    switchModeBtn.classList.add("fa-sun");
    switchModeBtn.setAttribute("aria-label", "Switch to light mode");
  } else {
    switchModeBtn.classList.remove("fa-sun");
    switchModeBtn.classList.add("fa-moon");
    switchModeBtn.setAttribute("aria-label", "Switch to dark mode");
  }
}

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
