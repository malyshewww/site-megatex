// import 'fslightbox'; // Lightbox: npm install fslightbox, site: https://fslightbox.com/javascript/documentation
// import Swiper from 'swiper'; // Slider: npm install swiper, site: https://swiperjs.com/get-started
// import AirDatepicker from 'air-datepicker'; // Datepicker: npm i air-datepicker -S, site: https://air-datepicker.com/ru
console.log('main init');

// Инициализация слайдеров
function initSliders() {
	const newSlider = document.querySelector(".new__wrapper");
	if (newSlider) {
		const newSliderSwiper = new Swiper(newSlider, {
			wrapperClass: "new__body",
			slideClass: "new__item",
			slidesPerView: 4,
			spaceBetween: 20,
			navigation: {
				prevEl: newSlider.previousElementSibling.querySelector('.slider-button-prev'),
				nextEl: newSlider.previousElementSibling.querySelector('.slider-button-next'),
			},
		});
	};

	const sliderCategories = document.querySelectorAll('.catalog .categories__wrapper');
	[...sliderCategories].forEach(slider => {
		const children = slider.children[0].children.length;
		if (children > 4) {
			const categorySwiper = new Swiper(slider, {
				wrapperClass: "categories__body",
				slideClass: "categories__item",
				slidesPerView: 4,
				spaceBetween: 20,
				navigation: {
					prevEl: slider.previousElementSibling.querySelector('.slider-button-prev'),
					nextEl: slider.previousElementSibling.querySelector('.slider-button-next'),
				},
				speed: 800,
			});
		} else {
			slider.previousElementSibling.querySelector('.heading-block__controls').style.display = "none";
			slider.classList.add('tile');
		}
	})
	const cardMainSlider = document.querySelector('.main-slider__body');
	const cardThumbsSlider = document.querySelector('.thumbs-slider__body');
	const cardThumbschildren = cardThumbsSlider.children[0].children.length;
	const cardMainChildren = cardMainSlider.children[0].children.length;
	let cardNavSwiper;
	if (cardThumbsSlider && cardThumbschildren <= 6) {
		cardThumbsSlider.nextElementSibling.remove();
	}
	if (cardMainSlider && cardMainChildren <= 1) {
		cardMainSlider.querySelector('.main-slider__controls').remove();
	}
	if (cardMainSlider) {
		cardNavSwiper = new Swiper(cardThumbsSlider, {
			direction: 'vertical',
			slidesPerView: 6,
			spaceBetween: 8,
			slideClass: "thumbs-slider__item",
			wrapperClass: "thumbs-slider__wrapper",
			speed: 600,
			navigation: {
				nextEl: cardThumbsSlider.nextElementSibling?.querySelector(".slider-button-next"),
				prevEl: cardThumbsSlider.nextElementSibling?.querySelector(".slider-button-prev"),
			},
		})
		let cardMainSwiper = new Swiper(cardMainSlider, {
			slidesPerView: 1,
			// mousewheel: {
			// 	releaseOnEdges: true,
			// },
			// direction: 'vertical',
			grabCursor: false,
			slideClass: "main-slider__item",
			wrapperClass: "main-slider__wrapper",
			speed: 600,
			spaceBetween: 10,
			thumbs: {
				swiper: cardNavSwiper,
			},
			navigation: {
				nextEl: ".slider-button-next",
				prevEl: ".slider-button-prev",
			},
			breakpoints: {
				300: {
					allowTouchMove: true,
				},
				767.98: {
					allowTouchMove: false,
				},
			}
		})
	}
}
window.addEventListener('load', () => {
	initSliders();
})
// Поле поиска
const searchInput = document.querySelector('.search-header__input');
if (searchInput) {
	searchInput.addEventListener('input', (event) => {
		let target = event.target;
		const parent = target.closest('form');
		parent.classList[target.value !== '' ? 'add' : 'remove']('changed');
	})
}
// Кнопка удаления введенной информации из поля поиска
const deleteButton = document.getElementById('delete-button');
if (deleteButton) {
	deleteButton.addEventListener('click', (event) => {
		let target = event.target;
		target.remove();
		searchInput.value = "";
	})
}

// Блок табов
window.addEventListener('hashchange', getHash);
function getHash(event) {
	event.preventDefault();
	let hash = window.location.hash;
	let target = event.target;
	const hashLink = document.querySelector(`.tabs__link[href$="${hash}"]`);
	const hashElement = document.querySelector(hash);
	document.querySelectorAll('.tabs__link').forEach((child) => {
		child.classList.remove('isActive');
	})
	setTimeout(() => {
		document.querySelectorAll('.tabs__content').forEach((child) => {
			child.classList.remove('isShow');
		})
		hashLink.classList.add('isActive');
		hashElement.classList.add('isShow');
		const hashElementParent = hashElement.closest('.tabs__body');
		if (hashElementParent) {
			const hashElementParentPosition = hashElementParent.getBoundingClientRect().top;
			const viewportHeight = window.innerHeight;
			if (hashElementParentPosition > (viewportHeight / 2)) {
				window.scrollTo({ top: hashElementParent.offsetTop, behavior: "smooth" });
			}
		}
	}, 100)
}
if (window.location.hash) {
	window.dispatchEvent(new Event("hashchange"))
}
const featuresLink = document.querySelectorAll('.features-card__link');
if (featuresLink) {
	[...featuresLink].forEach(link => {
		link.addEventListener('click', (event) => {
			const target = event.target;
			event.preventDefault();
			let href = target.getAttribute('href').substring(1);
			const scrollTarget = document.getElementById(href);
			const targetLink = document.querySelector(`.tabs__link[href="#${href}"]`)
			document.querySelectorAll('.tabs__link').forEach((child) => {
				child.classList.remove('isActive');
			})
			document.querySelectorAll('.tabs__content').forEach((child) => {
				child.classList.remove('isShow');
			})
			scrollTarget.classList.add('isShow');
			targetLink.classList.add('isActive');
			const topOffset = document.querySelector('.tabs__body');
			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollTo({ top: topOffset.offsetTop, behavior: "smooth" })
		});
	});
}

// Кнопка наверх
function scrollTop() {
	const buttonUp = document.querySelector('.scroll-top');
	if (buttonUp) {
		buttonUp.addEventListener('click', function (e) {
			e.preventDefault();
			const header = document.querySelector('.header');
			const topOffset = header.offsetHeight;
			const elementPosition = header.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			});
		});
		window.addEventListener('scroll', (event) => {
			const buttonUp = document.querySelector('.scroll-top');
			window.scrollY > 600 ? buttonUp.classList.remove('hidden') : buttonUp.classList.add('hidden')
		})
	}
}
scrollTop();

// Маска телефона
function maskPhone(elem = document) {
	let inputs = elem.querySelectorAll('input[type="tel"]');
	if (inputs.length) {
		//inputs = once("inputs",inputs);
		inputs.forEach(phone => {
			let code = '+7',
				find = /\+7/;
			code = '+7';
			find = /\+7/;
			phone.addEventListener('focus', function () {
				phone.value = code + " " + phone.value.replace(code + ' ', '');
			});
			phone.addEventListener('input', function () {
				let val = phone.value.replace(find, ''),
					res = code + " ";
				val = val.replace(/[^0-9]/g, '');
				for (let i = 0; i < val.length; i++) {
					res += i === 0 ? ' (' : '';
					res += i == 3 ? ') ' : '';
					res += i == 6 || i == 8 ? '-' : '';
					if (i == 10) break;
					res += val[i];
				};
				phone.value = res;
			});
			phone.addEventListener('blur', function () {
				let val = phone.value.replace(find, '');
				val = val.trim();
				if (!val) phone.value = null;
			});
		});
	};
};
maskPhone();