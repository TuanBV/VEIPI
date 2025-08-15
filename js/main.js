// ----------- Handle menu
const overlay = document.querySelector(".overlay");
const body = document.querySelector("body");
const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");
const menuItems = document.querySelector(".menu-items");
const expandBtn = document.querySelectorAll(".expand-btn");
const closeBtn = document.querySelector(".close-btn");
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
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
	body.classList.toggle("overflow");
	// dark background
	overlay.classList.toggle("overlay--active");
	// add open class
	menuBtn.classList.toggle("open");
	menuItems.classList.toggle("open");
}

menuBtn.addEventListener("click", (e) => {
	e.stopPropagation();
	toggle();
});

window.onkeydown = function (event) {
	const key = event.key;
	const active = menuItems.classList.contains("open");
	if (key === "Escape" && active) {
		toggle();
	}
};

document.addEventListener("click", (e) => {
	let target = e.target,
		its_menu = target === menuItems || menuItems.contains(target),
		its_hamburger = target === menuBtn,
		menu_is_active = menuItems.classList.contains("open");
	if (!its_menu && !its_hamburger && menu_is_active) {
		toggle();
	}
});

// close menu
closeBtn.addEventListener("click", (e) => {
	toggle();
	expandBtn.forEach((btn) => {
		btn.classList.remove("open");
	});
});

document.querySelectorAll(".fa-caret-down").forEach(function (icon) {
	icon.addEventListener("click", function (e) {
		let parentA = icon.closest("a");
		if (parentA) {
			parentA.classList.toggle("open");
		}
		e.preventDefault();
		e.stopPropagation();
	});
});

// ----------- Handle button change language
const dropdownLanguageBtn = document.getElementById("dropdown-language-btn");
const dropdownLanguageContent = document.getElementById(
	"dropdown-language-content"
);

// Country codes
const locales = ["vi-VN", "en-GB", "zh-CN", "ja-JP", "ko-KR"];
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
		const otherLangName = otherLocale.slice(0, 2).toUpperCase();

		const listEl = document.createElement("li");
		listEl.innerHTML = `<img src="${getFlagSrc(
			otherIntlLocale.region
		)}" />${otherLangName}`;
		listEl.value = otherLocale;
		listEl.addEventListener("mousedown", function () {
			setSelectedLocale(otherLocale);
		});
		dropdownLanguageContent.appendChild(listEl);
	});

	dropdownLanguageBtn.innerHTML = `<img src="${getFlagSrc(
		intlLocale.region
	)}"/>${langName}<span class="arrow-down"></span>`;
}
// Initialize with the first locale
setSelectedLocale(locales[0]);

// ----------- Handle animation scroll
function animateOnScroll(sectionId, animation = "animate__fadeInUp") {
	const el = document.getElementById(sectionId);
	if (!el) return;
	function onScroll() {
		const rect = el.getBoundingClientRect();
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
});

// ----------- Handle button search
// Event click button search
function toggleSearch(event) {
	event.stopPropagation();
	const searchBox = document.getElementById("searchBox");
	const input = searchBox.querySelector("input");

	searchBox.classList.add("w-[270px]");
	searchBox.classList.remove("w-[40px]");
	input.classList.remove("hidden");
	input.focus();
}

// Event click outside
document.addEventListener("click", function (e) {
	const searchBox = document.getElementById("searchBox");
	const input = searchBox.querySelector("input");
	if (!searchBox.contains(e.target)) {
		searchBox.classList.remove("w-[270px]");
		searchBox.classList.add("w-[40px]");
		input.classList.add("hidden");
		input.value = "";
	}
});

// ----------- Handle scroll on top
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

const scrollBtn = document.getElementById("scrollTopButton");
scrollBtn.style.display = "none";
window.addEventListener("scroll", function () {
	if (window.scrollY > 0) {
		scrollBtn.style.display = "flex";
	} else {
		scrollBtn.style.display = "none";
	}
});

// ----------- Handle scroll on top
// Modal
document.addEventListener("DOMContentLoaded", () => {
	const modal = document.getElementById("registerModal");

	const toggleModal = () => {
		modal.classList.toggle("hidden");
		modal.classList.toggle("flex");
	};

	modal.addEventListener("click", (e) => {
		if (e.target === modal) toggleModal();
	});
	window.toggleModal = toggleModal;
});
// ----------- Handle scroll on top
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
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});

	// Carousel
	$(".carousel").slick({
		slidesToShow: 8,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 7000,
		infinite: true,
		speed: 500,
		prevArrow:
			'<button class="slick-prev custom-prev"><em class="fa-solid fa-caret-left text-green-600"></em></button>',
		nextArrow:
			'<button class="slick-next custom-next"><em class="fa-solid fa-caret-right text-green-600"></em></button>',
		pauseOnHover: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
		],
	});

	// Carousel banner
	$(".carousel-banner").slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
		infinite: true,
		speed: 500,
		prevArrow:
			'<button class="slick-prev custom-prev"><em class="fa-solid fa-caret-left text-white"></em></button>',
		nextArrow:
			'<button class="slick-next custom-next"><em class="fa-solid fa-caret-right text-white"></em></button>',
		pauseOnHover: true,
	});
});
