function toggleMode(lightMode) {
  var darkMode = document.body;
  darkMode.classList.toggle("dark-mode");
  lightMode.classList.toggle("fa-sun");
}

function updateCopyrightYear() {
  document.querySelector('#copyright-year').innerText = new Date().getFullYear();
}
window.onload = updateCopyrightYear();