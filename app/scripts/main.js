// Инициализация слайдеров

function initSliders() {
	var sliderType = window.innerWidth <= 991.98 ? 'mobile' : 'desktop';
	const newSlider = document.querySelector(".new__wrapper");
	if (newSlider) {
		const newSliderSwiper = new Swiper(newSlider, {
			wrapperClass: "new__body",
			slideClass: "new__item",
			slidesPerView: 4,
			spaceBetween: 20,
			navigation: {
				prevEl: newSlider.previousElementSibling?.querySelector('.slider-button-prev'),
				nextEl: newSlider.previousElementSibling?.querySelector('.slider-button-next'),
			},
			breakpoints: {
				300: {
					slidesPerView: 1.1,
					spaceBetween: 8,
				},
				767.98: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
				1200: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
			}
		});
	};
	// Слайдер категорий
	function initCatagorySlider(type) {
		let categorySwiper;
		const sliderCategories = document.querySelectorAll('.categories__wrapper');
		if (sliderCategories) {
			[...sliderCategories].forEach(slider => {
				if (type === "mobile") {
					let children = slider.children[0].children.length;
					categorySwiper = new Swiper(slider, {
						slideClass: "categories__item",
						wrapperClass: "categories__body",
						slidesPerGroup: 1,
						freeMode: false,
						// navigation: {
						// 	prevEl: slider.previousElementSibling.querySelector('.slider-button-prev'),
						// 	nextEl: slider.previousElementSibling.querySelector('.slider-button-next'),
						// },
						speed: 800,
						breakpoints: {
							300: {
								slidesPerView: 1.1,
								spaceBetween: 8,
							},
							576: {
								slidesPerView: 'auto',
								spaceBetween: 20,
							}
						}
					});
				} else {
					categorySwiper?.destroy();
				}
			})
		}
	}
	initCatagorySlider(sliderType);
	window.addEventListener("resize", () => {
		if (window.innerWidth < 991.98 && sliderType == 'desktop') {
			sliderType = 'mobile';
			initCatagorySlider(sliderType)
		} else if (window.innerWidth > 991.98 && sliderType == 'mobile') {
			sliderType = 'desktop';
			initCatagorySlider(sliderType)
		}
	});
	window.dispatchEvent(new Event('resize'));
	// Слайдеры в карточке товара
	const cardMainSlider = document.querySelector('.main-slider__body');
	const cardThumbsSlider = document.querySelector('.thumbs-slider__body');
	const cardThumbschildren = cardThumbsSlider?.children[0].children.length;
	const cardMainChildren = cardMainSlider?.children[0].children.length;
	let cardNavSwiper;
	if (cardThumbsSlider && cardThumbschildren <= 5) {
		cardThumbsSlider.nextElementSibling.remove();
	}
	if (cardMainSlider && cardMainChildren <= 1) {
		cardMainSlider.querySelector('.main-slider__controls').remove();
	}
	if (cardMainSlider) {
		cardNavSwiper = new Swiper(cardThumbsSlider, {
			slidesPerView: 5,
			spaceBetween: 12,
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
			mousewheel: {
				releaseOnEdges: true,
				invert: false,
			},
			direction: 'vertical',
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
	const aboutSlider = document.querySelector('.slider-about__body');
	if (aboutSlider) {
		const aboutSwiper = new Swiper(aboutSlider, {
			slidesPerView: 'auto',
			spaceBetween: 20,
			speed: 800,
			navigation: {
				nextEl: aboutSlider.nextElementSibling?.querySelector(".slider-button-next"),
				prevEl: aboutSlider.nextElementSibling?.querySelector(".slider-button-prev"),
			},
		})
	}
}

// Поле поиска
const searchInput = searchForm.querySelector('.search-header__input');
if (searchInput) {
	searchInput.addEventListener('input', (event) => {
		let target = event.target;
		const form = target.closest('form');
		const result = form.querySelector('.search-header__result');
		form.classList[target.value !== '' ? 'add' : 'remove']('changed');
		if (target.value !== '') {
			result.removeAttribute('hidden');
		} else {
			result.setAttribute('hidden', true);
		}
	})
	searchInput.addEventListener('blur', (event) => {
		let target = event.target;
		target.value = "";
		const form = target.closest('form');
		const result = form.querySelector('.search-header__result');
		result.setAttribute('hidden', true);
		form.classList.remove('changed');
	})
}
// Кнопка удаления введенной информации из поля поиска
const deleteButton = document.getElementById('delete-button');
if (deleteButton) {
	deleteButton.addEventListener('click', (event) => {
		let target = event.target;
		searchInput.value = "";
		target.remove();
	})
}

// Блок табов с добавление в url hash из ссылки
// window.addEventListener('hashchange', getHash);
// function getHash(event) {
// 	event.preventDefault();
// 	let hash = window.location.hash;
// 	let target = event.target;
// 	const hashLink = document.querySelector(`.product-card .tabs__link[href$="${hash}"]`);
// 	const hashElement = document.querySelector(hash);
// 	document.querySelectorAll('.tabs__link').forEach((child) => {
// 		child.classList.remove('isActive');
// 	})
// 	setTimeout(() => {
// 		document.querySelectorAll('.tabs__content').forEach((child) => {
// 			child.classList.remove('isShow');
// 		})
// 		hashLink.classList.add('isActive');
// 		hashElement.classList.add('isShow');
// 		const hashElementParent = hashElement.closest('.tabs__body');
// 		if (hashElementParent) {
// 			const hashElementParentPosition = hashElementParent.getBoundingClientRect().top;
// 			const viewportHeight = window.innerHeight;
// 			if (hashElementParentPosition > (viewportHeight / 2)) {
// 				window.scrollTo({ top: hashElementParent.offsetTop, behavior: "smooth" });
// 			}
// 		}
// 	}, 100)
// }
// if (window.location.hash) {
// 	window.dispatchEvent(new Event("hashchange"))
// }
const featuresLink = document.querySelectorAll('.features-card__link');
if (featuresLink) {
	[...featuresLink].forEach(link => {
		link.addEventListener('click', (event) => {
			const target = event.target;
			event.preventDefault();
			let href = target.getAttribute('href').substring(1);
			const scrollTarget = document.getElementById(href);
			// const targetLink = document.querySelector(`.tabs__link[href="#${href}"]`)
			// document.querySelectorAll('.tabs__link').forEach((child) => {
			// 	child.classList.remove('isActive');
			// })
			// document.querySelectorAll('.tabs__content').forEach((child) => {
			// 	child.classList.remove('isShow');
			// })
			// scrollTarget.classList.add('isShow');
			// targetLink.classList.add('isActive');
			const topOffset = document.querySelector('.tabs__body');
			// const elementPosition = scrollTarget.getBoundingClientRect().top;
			// const offsetPosition = elementPosition - topOffset;
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


// Accordeon на странице с фильтрами
const filterGroups = document.querySelectorAll(".filter-group");
if (filterGroups) {
	[...filterGroups].forEach((item, index) => {
		const parent = item.closest('.filter-groups');
		filterOpen(item);
		resetFilter(parent);
		showRadiobuttons(item);
	})
}
// Показ / скрытие кнопки "Сбросить фильтры" при клике на чекбоксы на странице с фильтрами
function resetFilter(parent) {
	const checkboxes = parent.querySelectorAll('input');
	const btnReset = document.querySelector('.btn-reset');
	const checkboxesChecked = parent.querySelectorAll('input:checked');
	btnReset.style.display = "none";
	checkboxesChecked.length > 0 ? btnReset.style.display = "flex" : btnReset.style.display = "none";
	const arr = [];
	[...checkboxes].forEach((checkbox, i) => {
		checkbox.addEventListener('change', () => {
			checkbox.checked ? arr.push(i) : arr.splice(arr.indexOf(i), 1);
			arr.length > 0 ? btnReset.style.display = "flex" : btnReset.style.display = "none";
		})
	})
}
function showRadiobuttons(item) {
	const btnAll = item.querySelector('.filter-group__btn');
	if (btnAll) {
		const items = item.querySelectorAll('.filter-group li');
		items.length > 5 ? btnAll.removeAttribute('hidden') : btnAll.setAttribute('hidden', true)
		btnAll.addEventListener('click', (event) => {
			const btnDataText = event.target.dataset.text;
			item.classList.toggle('isShow');
			btnAll.innerHTML = item.classList.contains('isShow') ? btnDataText : "Показать все";
		})
	}
}
// Открытие фильтров
function filterOpen(item) {
	let button = item.querySelector(".filter-group__header");
	button.addEventListener("click", (event) => {
		item.classList.toggle("isOpen");
	})
	// let description = item.querySelector(".filter-group__choices");
	// if (item.classList.contains("isOpen")) {
	// 	description.style.height = `${description.scrollHeight}px`;
	// } else {
	// 	description.style.height = "0px";
	// }
}
// Закрытие всех пунктов кроме текущешл
// function removeOpen(index1) {
// 	box.forEach((item2, index2) => {
// 		if (index1 != index2) {
// 			item2.classList.remove("open");
// 			let des = item2.querySelector(".author-box__body");
// 			let btnText = item2.querySelector(".author-box__button-text");
// 			btnText.textContent = "Развернуть";
// 			// des.style.height = "0px";
// 		}
// 	})
// }

// Показать скрытые радиокнопки на странице Товара (Размер одежды, Размер обуви)
const groupCards = document.querySelectorAll('.group-card');
if (groupCards) {
	[...groupCards].forEach(groupItem => {
		const btnShow = groupItem.querySelector('.show-btn');
		if (btnShow) {
			btnShow.addEventListener('click', (event) => {
				const radiobuttons = btnShow.previousElementSibling;
				btnShow.remove();
				radiobuttons.classList.add('isShow');
			})
		}
	})
}
// Галерея на странице Карточка товара
function initGallery() {
	const galleries = document.querySelectorAll('.gallery');
	[...galleries].forEach(gallery => {
		lightGallery(gallery, {
			speed: 500,
			selector: '.gallery-item'
			// ... other settings
		});
	})
}

// Яндекс карта
const mapElem = document.getElementById("map");
if (mapElem) {
	let myMap,
		myPlacemark;
	let isLoaded = false;
	function loadMap() {
		var script = document.createElement("script");
		script.src = "https://api-maps.yandex.ru/2.1/?apikey=292672c7-fe24-4469-a901-e4fedb380302&lang=ru_RU";
		document.body.appendChild(script);
		isLoaded = true;
		script.onload = () => {
			if (typeof ymaps === 'undefined') {
				return;
			}
			ymaps.ready(() => {
				myMap = new ymaps.Map('office-ymap', {
					center: [56.248821, 43.877393],
					zoom: 16
				}, {
					searchControlProvider: 'yandex#search'
				}),
					myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
						balloonContent: 'Нижний Новгород, Автозаводский район, проспект Ленина 109, бизнес-центр «Чайка», офис 304'
					}, {
						iconLayout: 'default#image',
						iconImageHref: './images/icons/location.svg',
						iconImageSize: [44, 49],
						iconImageOffset: [-10, -30]
					});
				myMap.geoObjects.add(myPlacemark);
				myMap.controls.remove('geolocationControl'); // удаляем геолокацию
				myMap.controls.remove('searchControl'); // удаляем поиск
				myMap.controls.remove('trafficControl'); // удаляем контроль трафика
				myMap.controls.remove('typeSelector'); // удаляем тип
				myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
				myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
				myMap.controls.remove('rulerControl'); // удаляем контрол правил
				myMap.behaviors.disable('scrollZoom');
			});
			const mapTabTrigger = document.querySelectorAll('[data-map-trigger]');
			[...mapTabTrigger].forEach(tab => {
				tab.addEventListener('click', () => {
					const dataLat = Number(tab.dataset.lat);
					const dataLing = Number(tab.dataset.ling);
					console.log(typeof dataLat, typeof dataLing);
					[...mapTabTrigger].forEach(item => item.classList.remove('isActive'));
					tab.classList.add('isActive');
					myMap.setCenter([dataLat, dataLing], 16, {
						checkZoomRange: true
					});
					myPlacemark.geometry.setCoordinates([dataLat, dataLing]);
				})
			})
		};
	}
	if (mapElem.getBoundingClientRect().top < window.innerHeight) {
		loadMap();
	}
	window.addEventListener("scroll", function () {
		if (!isLoaded && mapElem.getBoundingClientRect().top < window.innerHeight) {
			loadMap();
		}
	});
}

// Подключение библиотеки для модальных окон
const modal = new GraphModal(
	{
		isOpen: (modal) => {
			const inputs = modal.modalContainer.querySelectorAll('input');
			if (inputs) {
				setTimeout(() => {
					inputs[0].focus();
				}, 200);
			}
		},
	}
);

// Подключение кастомного скроллбара
Array.prototype.forEach.call(
	document.querySelectorAll('[data-simplebar]'),
	(el) => new SimpleBar(el)
);

// Раскрытие информации в тектсовом блоке
const textBlock = document.querySelector('.text-block');
if (textBlock) {
	textBlock.addEventListener('click', (event) => {
		event.preventDefault();
		let target = event.target;
		if (target.closest('.text-block__gradient') || target.closest('.text-block__link')) {
			textBlock.classList.add('isOpen');
		}
	})
}

// Загрузка файла
const formOffer = document.getElementById('formOffer');
if (formOffer) {
	const inputUpload = formOffer.querySelector('#upload_file');
	const fileList = formOffer.querySelector('#fileList');
	const loadFile = formOffer.querySelector('#loadFile');
	const emptyList = formOffer.querySelector('#emptyList');
	let file;
	let files = inputUpload.files;
	// checkEmptyList(files);
	function uploadFile(event) {
		if (event.target.closest('#upload_file')) {
			file = event.target.files[0];
			renderFile(file);
		}
	}
	function deleteFile(event) {
		// Проверяем если клик был НЕ по кнопке "удалить файл"
		if (event.target.dataset.action !== 'delete') return;
		const parentNode = event.target.closest('.file-item');
		// Удаляем файл из разметки
		parentNode.remove();
		checkEmptyList(files);
	}
	function checkEmptyList(files) {
		if (files.length === 0) {
			const emptyListHTML = `<li id="emptyList">
				<label class="load-file__label">
					<input type="file" id="upload_file" class="load-file__input visuallyHidden">
					Прикрепить файл
				</label>
			</li>`;
			// fileList.insertAdjacentHTML('afterbegin', emptyListHTML);
			fileList.innerHTML = emptyListHTML;
		}
		if (files.length > 0) {
			const emptyListEl = document.querySelector('#emptyList');
			emptyListEl ? emptyListEl.remove() : null;
		}
	}
	function renderFile(file) {
		// Формируем разметку для нового файла
		let fileItem = `<li class="file-item">
				<span class="file-item__text">${file.name}</span>
				<button class="file-item__button" type="button" id="delete_file" data-action="delete"></button>
			</li>`;
		// Добавляем данные файла (file.name) на страницу
		fileList.innerHTML = fileItem;
		loadFile.remove();
	}
	fileList.addEventListener('click', deleteFile);
	formOffer.addEventListener('change', uploadFile);
}

const filterBtn = document.getElementById('filterBtn');
if (filterBtn) {
	filterBtn.addEventListener('click', (event) => {
		event.target.classList.toggle('isActive');
		event.target.nextElementSibling.classList.toggle('isOpen')
	})
}

window.addEventListener('DOMContentLoaded', () => {
	initGallery();
	initSliders();
})