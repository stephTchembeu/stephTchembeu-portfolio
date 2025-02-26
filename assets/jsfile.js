document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-btn");
  const menuLinks = document.querySelector(".applis");

  menuButton.addEventListener("click", function () {
    menuLinks.style.display = "flex"; // Show the menu when clicked
  });
  // Keep menu open when mouse is over it
  menuLinks.addEventListener("mouseenter", function () {
    menuLinks.style.display = "flex";
  });
  // Hide menu when mouse leaves the menu area
  menuLinks.addEventListener("mouseleave", function () {
    menuLinks.style.display = "none";
  });
});
