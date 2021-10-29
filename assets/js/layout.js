const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
const navbarContent = document.getElementById("navbar-content-div");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    console.log(navbarContent);
    //navbarContent.classList.remove(".navbar-content");
    navbarContent.classList.add("navbar-content-margin");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    console.log(navbarContent);
    //navbarContent.classList.add(".navbar-content");
    navbarContent.classList.remove("navbar-content-margin");
} 