"use strict";

// ----------- Handle menu
var overlay = document.querySelector(".overlay");
var body = document.querySelector("body");
var menuBtn = document.querySelector(".menu-btn");
var navbar = document.querySelector(".navbar");
var menuItems = document.querySelector(".menu-items");
var expandBtn = document.querySelectorAll(".expand-btn");
var closeBtn = document.querySelector(".close-btn");
var header = document.getElementById("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 120) {
    header.classList.add("fixed");
    header.classList.add("border-[#e5e5e5]");
    header.classList.add("border-b-[1px]");
    header.classList.add("top-0");
    header.classList.add("shadow-lg");
  } else {
    header.classList.remove("fixed");
    header.classList.remove("border-[#e5e5e5]");
    header.classList.remove("border-b-[1px]");
    header.classList.remove("top-0");
    header.classList.remove("shadow-lg");
  }
});

function toggle() {
  // disable overflow body
  body.classList.toggle("overflow"); // dark background

  overlay.classList.toggle("overlay--active"); // add open class

  menuBtn.classList.toggle("open");
  menuItems.classList.toggle("open");
}

menuBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  toggle();
});

window.onkeydown = function (event) {
  var key = event.key;
  var active = menuItems.classList.contains("open");

  if (key === "Escape" && active) {
    toggle();
  }
};

document.addEventListener("click", function (e) {
  var target = e.target,
      its_menu = target === menuItems || menuItems.contains(target),
      its_hamburger = target === menuBtn,
      menu_is_active = menuItems.classList.contains("open");

  if (!its_menu && !its_hamburger && menu_is_active) {
    toggle();
  }
}); // close menu

closeBtn.addEventListener("click", function (e) {
  toggle();
  expandBtn.forEach(function (btn) {
    btn.classList.remove("open");
  });
});
document.querySelectorAll(".fa-caret-down").forEach(function (icon) {
  icon.addEventListener("click", function (e) {
    var parentA = icon.closest("a");

    if (parentA) {
      parentA.classList.toggle("open");
    }

    e.preventDefault();
    e.stopPropagation();
  });
}); // ----------- Handle button change language

var dropdownLanguageBtn = document.getElementById("dropdown-language-btn");
var dropdownLanguageContent = document.getElementById("dropdown-language-content"); // Country codes

var locales = ["vi-VN", "en-GB", "zh-CN", "ja-JP", "ko-KR"]; // Get flag source URL based on country code

function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode) ? "https://flagsapi.com/".concat(countryCode.toUpperCase(), "/shiny/64.png") : "";
} // Set selected locale and update dropdown


function setSelectedLocale(locale) {
  var intlLocale = new Intl.Locale(locale);
  var langName = locale.slice(0, 2).toUpperCase();
  dropdownLanguageContent.innerHTML = "";
  var otherLocales = locales.filter(function (loc) {
    return loc !== locale;
  });
  otherLocales.forEach(function (otherLocale) {
    var otherIntlLocale = new Intl.Locale(otherLocale);
    var otherLangName = otherLocale.slice(0, 2).toUpperCase();
    var listEl = document.createElement("li");
    listEl.innerHTML = "<img src=\"".concat(getFlagSrc(otherIntlLocale.region), "\" />").concat(otherLangName);
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownLanguageContent.appendChild(listEl);
  });
  dropdownLanguageBtn.innerHTML = "<img src=\"".concat(getFlagSrc(intlLocale.region), "\"/>").concat(langName, "<span class=\"arrow-down\"></span>");
} // Initialize with the first locale


setSelectedLocale(locales[0]); // ----------- Handle animation scroll

function animateOnScroll(sectionId) {
  var animation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "animate__fadeInUp";
  var el = document.getElementById(sectionId);
  if (!el) return;

  function onScroll() {
    var rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      el.classList.remove("opacity-0");
      el.classList.add(animation);
      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
  onScroll(); // check on load
}

document.addEventListener("DOMContentLoaded", function () {
  animateOnScroll("section-courses");
  animateOnScroll("section-why");
  animateOnScroll("section-library");
  animateOnScroll("section-innovation");
  animateOnScroll("section-service");
  animateOnScroll("section-news");
  animateOnScroll("section-carousel-customer");
  animateOnScroll("section-carousel-expert");
}); // ----------- Handle button search
// Event click button search

function toggleSearch(event) {
  event.stopPropagation();
  var searchBox = document.getElementById("searchBox");
  var input = searchBox.querySelector("input");
  searchBox.classList.add("w-[270px]");
  searchBox.classList.remove("w-[40px]");
  input.classList.remove("hidden");
  input.focus();
} // Event click outside


document.addEventListener("click", function (e) {
  var searchBox = document.getElementById("searchBox");
  var input = searchBox.querySelector("input");

  if (!searchBox.contains(e.target)) {
    searchBox.classList.remove("w-[270px]");
    searchBox.classList.add("w-[40px]");
    input.classList.add("hidden");
    input.value = "";
  }
}); // ----------- Handle scroll on top

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

var scrollBtn = document.getElementById("scrollTopButton");
scrollBtn.style.display = "none";
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
}); // ----------- Handle scroll on top
// Modal

document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("registerModal");

  var toggleModal = function toggleModal() {
    modal.classList.toggle("hidden");
    modal.classList.toggle("flex");
  };

  modal.addEventListener("click", function (e) {
    if (e.target === modal) toggleModal();
  });
  window.toggleModal = toggleModal;
}); // ----------- Handle scroll on top
// Carousel

$(document).ready(function () {
  // Carousel customer
  $(".carousel-customer").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    infinite: true,
    speed: 500,
    prevArrow: "",
    nextArrow: "",
    pauseOnHover: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }]
  }); // Carousel

  $(".carousel").slick({
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    infinite: true,
    speed: 500,
    prevArrow: '<button class="slick-prev custom-prev"><em class="fa-solid fa-caret-left text-green-600"></em></button>',
    nextArrow: '<button class="slick-next custom-next"><em class="fa-solid fa-caret-right text-green-600"></em></button>',
    pauseOnHover: true,
    responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1
      }
    }, {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }]
  }); // Carousel banner

  $(".carousel-banner").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    speed: 500,
    prevArrow: '<button class="slick-prev custom-prev"><em class="fa-solid fa-caret-left text-white"></em></button>',
    nextArrow: '<button class="slick-next custom-next"><em class="fa-solid fa-caret-right text-white"></em></button>',
    pauseOnHover: true
  });
});