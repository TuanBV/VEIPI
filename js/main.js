const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
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

// Language dropdown
const dropdownLanguageBtn = document.getElementById("dropdown-language-btn");
const dropdownLanguageContent = document.getElementById("dropdown-language-content");

// Country codes
const locales = ["vi-VN", "en-GB","zh-CN","ja-JP","ko-KR"];
// Get flag source URL based on country code
function getFlagSrc(countryCode) {
  return /^[A-Z]{2}$/.test(countryCode)
      ? `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`
    : "";
}
// Set selected locale and update dropdown
function setSelectedLocale(locale) {
  const intlLocale = new Intl.Locale(locale);
  const langName = locale.slice(0, 2).toUpperCase();

  dropdownLanguageContent.innerHTML = "";

  const otherLocales = locales.filter((loc) => loc !== locale);
  otherLocales.forEach((otherLocale) => {
    const otherIntlLocale = new Intl.Locale(otherLocale);
    const otherLangName = otherLocale.slice(0,2).toUpperCase();

    const listEl = document.createElement("li");
    listEl.innerHTML = `<img src="${getFlagSrc(otherIntlLocale.region)}" />${otherLangName}`;
    listEl.value = otherLocale;
    listEl.addEventListener("mousedown", function () {
      setSelectedLocale(otherLocale);
    });
    dropdownLanguageContent.appendChild(listEl);
  });

  dropdownLanguageBtn.innerHTML = `<img src="${getFlagSrc(intlLocale.region)}"/>${langName}<span class="arrow-down"></span>`;
}
// Initialize with the first locale
setSelectedLocale(locales[0]);
