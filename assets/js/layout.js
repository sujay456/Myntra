const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const navbarContentDiv = document.getElementById("navbar-content-div");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    navbarContentDiv.classList.remove("navbar-content");
    navbarContentDiv.classList.add("navbar-content-margin");
    console.log(navbarContentDiv);
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    navbarContentDiv.classList.add("navbar-content");
    navbarContentDiv.classList.remove("navbar-content-margin");
    console.log(navbarContentDiv);
} 