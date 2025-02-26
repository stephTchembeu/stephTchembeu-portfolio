document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("menu-btn");
    const menuLinks = document.querySelector(".applis");
  
    menuButton.addEventListener("click", function () {
      if (menuLinks.style.display === "flex") {
        menuLinks.style.display = "none";
      } else {
        menuLinks.style.display = "flex";
      }
    });
  });
  