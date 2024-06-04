// Toggle for Dark Mode and Light Mode with Icon Change
function toggleMode(switchMode) {
  var switchMode = document.getElementById("switchModeBtn");
  var darkMode = document.body;
  switchMode.classList.toggle("fa-moon");
  darkMode.classList.toggle("dark-mode");
  switchMode.classList.toggle("fa-sun");
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