const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");
const expandBtn = document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-btn");
const header = document.getElementById("header");


// Scroll
window.addEventListener("scroll", () => {
    if (window.scrollY > 120) {
        header.classList.add("fixed");
        header.classList.add("-translate-x-1/2");
        header.classList.add("left-1/2");
        header.classList.add("border-[#e5e5e5]");
        header.classList.add("border-b-[1px]");
        header.classList.add("top-0");
        document.querySelector(".top-header").classList.add("hidden!");
    } else {
        header.classList.remove("fixed");
        header.classList.remove("-translate-x-1/2");
        header.classList.remove("left-1/2");
        header.classList.remove("border-[#e5e5e5]");
        header.classList.remove("border-b-[1px]");
        header.classList.remove("top-0");
        document.querySelector(".top-header").classList.remove("hidden!");
    }
});

function toggle() {
    // disable overflow body
    body.classList.toggle("overflow");
    // dark background
    overlay.classList.toggle("overlay--active");
    // add open class
    menuBtn.classList.toggle("open");
    menuItems.classList.toggle("open");
}

menuBtn.addEventListener("click", e => {
    e.stopPropagation();
    toggle();
})

window.onkeydown = function (event) {
    const key = event.key;
    const active = menuItems.classList.contains('open');
    if (key === "Escape" && active) {
        toggle();
    }
};

document.addEventListener('click', e => {
    let target = e.target,
        its_menu = target === menuItems || menuItems.contains(target),
        its_hamburger = target === menuBtn,
        menu_is_active = menuItems.classList.contains('open');
    if (!its_menu && !its_hamburger && menu_is_active) {
        toggle();
    }
});

// close menu
closeBtn.addEventListener("click", e => {
    toggle();
    expandBtn.forEach((btn) => {
        btn.classList.remove("open");
    });
});

// mobile menu expand
expandBtn.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        btn.classList.toggle("open");
    });
});
