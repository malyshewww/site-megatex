// Инициализация слайдеров
let sliderType = window.innerWidth < 991.98 ? "mobile" : "desktop";
// Слайдер "новинки"
const newSlider = document.querySelector(".new__wrapper");
if (newSlider) {
    let children = newSlider.children[0].children.length;
    const newSwiper = new Swiper(newSlider, {
        wrapperClass: "new__body",
        slideClass: "new__item",
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
            prevEl: newSlider.previousElementSibling?.querySelector(
                ".slider-button-prev"
            ),
            nextEl: newSlider.previousElementSibling?.querySelector(
                ".slider-button-next"
            ),
        },
        watchOverflow: true,
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
        },
    });
}

// Слайдер на странице "О компании", на текстовой странице, сладйер категорий
const aboutSlider = document.querySelector(".slider-about__body");
const productionSlider = document.querySelector(".production__wrapper");
const sliderCategories = document.querySelectorAll(".categories__wrapper");
let aboutSwiper = null;
let productionSwiper = null;
let categorySwiper = null;
function initializeSwiper() {
    if (!aboutSwiper && aboutSlider) {
        aboutSwiper = new Swiper(aboutSlider, {
            slideClass: "slider-about__item",
            wrapperClass: "slider-about__wrapper",
            spaceBetween: 20,
            slidesPerView: 3,
            speed: 800,
            breakpoints: {
                300: {
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                },
                767.98: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    }
    if (!productionSwiper && productionSlider) {
        productionSwiper = new Swiper(productionSlider, {
            slideClass: "production__item",
            wrapperClass: "production__body",
            spaceBetween: 20,
            slidesPerView: 3,
            speed: 800,
            breakpoints: {
                300: {
                    slidesPerView: 1.5,
                    spaceBetween: 8,
                },
                767.98: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            },
        });
    }
    if (!categorySwiper) {
        [...sliderCategories].forEach((slider) => {
            categorySwiper = new Swiper(slider, {
                slideClass: "categories__item",
                wrapperClass: "categories__body",
                slidesPerGroup: 1,
                // navigation: {
                // 	prevEl: slider.previousElementSibling.querySelector('.slider-button-prev'),
                // 	nextEl: slider.previousElementSibling.querySelector('.slider-button-next'),
                // },
                speed: 800,
                simulateTouch: true,
                breakpoints: {
                    300: {
                        slidesPerView: 1.3,
                        spaceBetween: 8,
                    },
                    576: {
                        slidesPerView: "auto",
                        spaceBetween: 20,
                    },
                },
            });
        });
    }
}
function destroySwiper() {
    if (aboutSwiper) {
        aboutSwiper.destroy();
        aboutSwiper = null;
    }
    if (productionSwiper) {
        productionSwiper.destroy();
        productionSwiper = null;
    }
    if (categorySwiper) {
        categorySwiper.destroy();
        categorySwiper = null;
    }
}
function checkScreenWidth() {
    if (window.matchMedia("(max-width: 991.98px)").matches) {
        // Инициализация Swiper, если ширина экрана меньше или равна 991.98 пикселей
        initializeSwiper();
    } else {
        // Отмена инициализации Swiper, если ширина экрана больше 991.98 пикселей
        destroySwiper();
    }
}
// Проверяем при загрузке страницы
checkScreenWidth();
// Проверяем при изменении размера экрана
window.addEventListener("resize", checkScreenWidth);

function stateWindow() {
    if (window.innerWidth < 991.98 && sliderType == "desktop") {
        sliderType = "mobile";
        initCardSlider(sliderType);
    } else if (window.innerWidth > 991.98 && sliderType == "mobile") {
        sliderType = "desktop";
        initCardSlider(sliderType);
    }
}
window.addEventListener("resize", stateWindow);

// Слайдеры в большой карточке товара
const cardMainSlider = document.querySelector(".main-slider__body");
const cardThumbsSlider = document.querySelector(".thumbs-slider__body");
const cardThumbschildren = cardThumbsSlider?.children[0].children.length;
const cardMainChildren = cardMainSlider?.children[0].children.length;
let cardNavSwiper;
let cardMainSwiper;
function initCardSlider(type) {
    var sliderSettings = {};
    if (type === "mobile") {
        sliderSettings = {
            // описание настроек для мобильной вариации.
            effect: "slide",
        };
    } else {
        sliderSettings = {
            // описание настроек для десктопной вариации.
            effect: "fade",
            // allowTouchMove: false,
            fadeEffect: {
                crossFade: true,
            },
        };
    }
    if (cardThumbsSlider && cardThumbschildren <= 5) {
        cardThumbsSlider.nextElementSibling.remove();
    }
    if (cardMainSlider && cardMainChildren <= 1) {
        cardMainSlider.querySelector(".main-slider__controls").remove();
    }
    if (cardMainSlider) {
        cardNavSwiper = new Swiper(cardThumbsSlider, {
            slidesPerView: 5,
            spaceBetween: 12,
            slideClass: "thumbs-slider__item",
            wrapperClass: "thumbs-slider__wrapper",
            speed: 600,
            navigation: {
                nextEl: cardThumbsSlider.nextElementSibling?.querySelector(
                    ".slider-button-next"
                ),
                prevEl: cardThumbsSlider.nextElementSibling?.querySelector(
                    ".slider-button-prev"
                ),
            },
        });
        cardMainSwiper = new Swiper(cardMainSlider, {
            ...sliderSettings,
            slidesPerView: 1,
            mousewheel: {
                releaseOnEdges: true,
                invert: false,
            },
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
                    direction: "horizontal",
                },
                991.98: {
                    allowTouchMove: false,
                    direction: "horizontal",
                },
            },
        });
    }
    // Проверяем, есть ли в объекте слайдера метод destroy, и если есть - вызываем его.
    // if (cardMainSwiper.destroy && typeof cardMainSwiper.destroy === 'function') {
    // 	cardMainSwiper.destroy(); // Возможно,если в круглые скобки передать true то будет лучше.
    // }
}
initCardSlider(sliderType);

// Поле поиска
const searchInput = searchForm.querySelector(".search-header__input");
if (searchInput) {
    searchInput.addEventListener("input", (event) => {
        let target = event.target;
        const form = target.closest("form");
        const result = form.querySelector(".search-header__result");
        form.classList[target.value !== "" ? "add" : "remove"]("changed");
        if (target.value !== "") {
            result.removeAttribute("hidden");
        } else {
            result.setAttribute("hidden", true);
        }
    });
    searchInput.addEventListener("blur", (event) => {
        let target = event.target;
        target.value = "";
        const form = target.closest("form");
        const result = form.querySelector(".search-header__result");
        result.setAttribute("hidden", true);
        form.classList.remove("changed");
    });
}
// Кнопка удаления введенной информации из поля поиска
const deleteButton = document.getElementById("delete-button");
if (deleteButton) {
    deleteButton.addEventListener("click", (event) => {
        let target = event.target;
        const form = target.closest("form");
        form.classList.remove("changed");
        searchInput.value = "";
        target.remove();
    });
}

// Блок табов с добавлением в url hash из ссылки
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

// Упрощенная версия табов в карточке
const featuresLink = document.querySelectorAll(".features-card__link");
if (featuresLink) {
    [...featuresLink].forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = event.target;
            event.preventDefault();
            let href = target.getAttribute("href").substring(1);
            // const scrollTarget = document.getElementById(href);
            // const targetLink = document.querySelector(`.tabs__link[href="#${href}"]`)
            // document.querySelectorAll('.tabs__link').forEach((child) => {
            // 	child.classList.remove('isActive');
            // })
            // document.querySelectorAll('.tabs__content').forEach((child) => {
            // 	child.classList.remove('isShow');
            // })
            // scrollTarget.classList.add('isShow');
            // targetLink.classList.add('isActive');
            const topOffset = document.querySelector(".tabs__body");
            // const elementPosition = scrollTarget.getBoundingClientRect().top;
            // const offsetPosition = elementPosition - topOffset;
            window.scrollTo({ top: topOffset.offsetTop, behavior: "smooth" });
        });
    });
}

// Кнопка наверх
function scrollUp() {
    const buttonUp = document.querySelector(".scroll-top");
    if (buttonUp) {
        buttonUp.addEventListener("click", function (e) {
            e.preventDefault();
            const header = document.querySelector(".header");
            const topOffset = header.offsetHeight;
            const elementPosition = header.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: "smooth",
            });
        });
        window.addEventListener("scroll", (event) => {
            const buttonUp = document.querySelector(".scroll-top");
            window.scrollY > 600
                ? buttonUp.classList.remove("hidden")
                : buttonUp.classList.add("hidden");
        });
        if (window.innerWidth > 767.98) {
            const footer = document.querySelector("footer");
            const options = {
                rootMargin: "0px 0px -90px 0px",
                threshold: 0,
            };
            const observer = new IntersectionObserver(([entry]) => {
                const targetInfo = entry.boundingClientRect;
                const rootBoundsInfo = entry.rootBounds;
                if (
                    targetInfo.top > rootBoundsInfo.bottom ||
                    targetInfo.isIntersecting
                ) {
                    buttonUp.classList.remove("active");
                } else {
                    buttonUp.classList.add("active");
                }
            }, options);
            observer.observe(footer);
        }
    }
}
scrollUp();

// Маска телефона
function maskPhone(elem = document) {
    let inputs = elem.querySelectorAll('input[type="tel"]');
    if (inputs.length) {
        //inputs = once("inputs",inputs);
        inputs.forEach((phone) => {
            let code = "+7",
                find = /\+7/;
            code = "+7";
            find = /\+7/;
            phone.addEventListener("focus", function () {
                phone.value = code + " " + phone.value.replace(code + " ", "");
            });
            phone.addEventListener("input", function () {
                let val = phone.value.replace(find, ""),
                    res = code + " ";
                val = val.replace(/[^0-9]/g, "");
                for (let i = 0; i < val.length; i++) {
                    res += i === 0 ? " (" : "";
                    res += i == 3 ? ") " : "";
                    res += i == 6 || i == 8 ? "-" : "";
                    if (i == 10) break;
                    res += val[i];
                }
                phone.value = res;
            });
            phone.addEventListener("blur", function () {
                let val = phone.value.replace(find, "");
                val = val.trim();
                if (!val) phone.value = null;
            });
        });
    }
}
maskPhone();

// Accordeon на странице с фильтрами
const filterGroups = document.querySelectorAll(".filter-group");
if (filterGroups) {
    [...filterGroups].forEach((item, index) => {
        const parent = item.closest(".filter-groups");
        filterOpen(item);
        resetFilter(parent);
        showRadiobuttons(item);
    });
}
// Показ / скрытие кнопки "Сбросить фильтры" при клике на чекбоксы на странице с фильтрами
function resetFilter(parent) {
    const checkboxes = parent.querySelectorAll("input");
    const btnReset = document.querySelector(".btn-reset");
    const checkboxesChecked = parent.querySelectorAll("input:checked");
    btnReset.style.display = "none";
    checkboxesChecked.length > 0
        ? (btnReset.style.display = "flex")
        : (btnReset.style.display = "none");
    const arr = [];
    [...checkboxes].forEach((checkbox, i) => {
        checkbox.addEventListener("change", () => {
            checkbox.checked ? arr.push(i) : arr.splice(arr.indexOf(i), 1);
            arr.length > 0
                ? (btnReset.style.display = "flex")
                : (btnReset.style.display = "none");
        });
    });
}
function showRadiobuttons(item) {
    const btnAll = item.querySelector(".filter-group__btn");
    if (btnAll) {
        const items = item.querySelectorAll(".filter-group li");
        items.length > 5
            ? btnAll.removeAttribute("hidden")
            : btnAll.setAttribute("hidden", true);
        btnAll.addEventListener("click", (event) => {
            const btnDataText = event.target.dataset.text;
            item.classList.toggle("isShow");
            btnAll.innerHTML = item.classList.contains("isShow")
                ? btnDataText
                : "Показать все";
        });
    }
}
// Открытие фильтров
function filterOpen(item) {
    let button = item.querySelector(".filter-group__header");
    button.addEventListener("click", (event) => {
        item.classList.toggle("isOpen");
    });
    // Анимация аккордеона
    // const accTitle = item.querySelectorAll(".filter-group__header");
    // if (accTitle.length) {
    //   function openAcc(e) {
    //     e.classList.add("active");
    //     let t = e.nextElementSibling;
    //     t.style.maxHeight = t.scrollHeight + "px";
    //   }
    //   function closeAcc(e) {
    //     e.classList.remove("active"),
    //       (e.nextElementSibling.style.maxHeight = null);
    //   }
    //   accTitle.forEach((e) => {
    //     e.addEventListener("click", () => {
    //       if (e.classList.contains("active")) closeAcc(e);
    //       else {
    //         let t = document.querySelector(".accTitle.active");
    //         t && closeAcc(t), openAcc(e);
    //       }
    //     });
    //   });
    // }
}

// Показать скрытые радиокнопки на странице Товара (Размер одежды, Размер обуви)
const groupCards = document.querySelectorAll(".group-card");
if (groupCards) {
    [...groupCards].forEach((groupItem) => {
        const btnShow = groupItem.querySelector(".show-btn");
        if (btnShow) {
            btnShow.addEventListener("click", (event) => {
                const radiobuttons = btnShow.previousElementSibling;
                btnShow.remove();
                radiobuttons.classList.add("isShow");
            });
        }
    });
}
// Галерея lightgallery.js
function initGallery() {
    const galleries = document.querySelectorAll(".gallery");
    [...galleries].forEach((gallery) => {
        lightGallery(gallery, {
            speed: 500,
            selector: ".gallery-item",
            // ... other settings
        });
    });
}
window.addEventListener("DOMContentLoaded", () => {
    initGallery();
});

// Яндекс карта
const mapElem = document.getElementById("map");
var myMap, myPlacemark;
function mapInit() {
    const map = document.getElementById("office-ymap");
    (myMap = new ymaps.Map(
        "office-ymap",
        {
            center: [56.248821, 43.877393],
            zoom: 16,
            controls: ["zoomControl"],
        },
        {
            searchControlProvider: "yandex#search",
        }
    )),
        (myPlacemark = new ymaps.Placemark(
            myMap.getCenter(),
            {
                // balloonContent: 'Нижний Новгород, Автозаводский район, проспект Ленина 109, бизнес-центр «Чайка», офис 304'
            },
            {
                iconLayout: "default#image",
                iconImageHref: "./images/icons/location.svg",
                iconImageSize: [44, 49],
                iconImageOffset: [-10, -30],
            }
        ));
    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove("geolocationControl"); // удаляем геолокацию
    myMap.controls.remove("searchControl"); // удаляем поиск
    myMap.controls.remove("trafficControl"); // удаляем контроль трафика
    myMap.controls.remove("typeSelector"); // удаляем тип
    myMap.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove("rulerControl"); // удаляем контрол правил
    myMap.behaviors.disable("scrollZoom");
    if (window.innerWidth < 991.98) {
        myMap.behaviors.disable("drag");
        let version = map.firstChild
            .getAttribute("class")
            .replace("ymaps-", "")
            .replace("-map", "");
        let pane = document.querySelector(".ymaps-" + version + "-events-pane");
        pane.innerHTML =
            "Чтобы переместить карту проведите по ней двумя пальцами";
        pane.style.cssText =
            "height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; z-index: 2500; color: #fff; font-size: 22px; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; text-align: center; background-color: rgba(0,0,0,0.45); opacity: 0; transition: opacity 0.45s; padding: 25px; box-sizing: border-box;";
        // Показать надпись
        map.addEventListener("touchmove", function (e) {
            let touches = e.touches.length;
            if (touches > 1) {
                // Если точек касания больше одной
                pane.style.opacity = "0";
            } else {
                pane.style.opacity = "1";
            }
        });
        // Скрыть надпись
        map.addEventListener("touchend", function () {
            pane.style.opacity = "0";
        });
    }
}
if (mapElem) {
    let isLoaded = false;
    const loadMap = () => {
        // создаем и вставляем апи карт
        var script = document.createElement("script");
        script.src =
            "https://api-maps.yandex.ru/2.1/?apikey=292672c7-fe24-4469-a901-e4fedb380302&lang=ru_RU";
        document.body.appendChild(script);
        isLoaded = true;
        //инициализируем карту
        script.onload = function () {
            if (typeof ymaps === "undefined") return;
            ymaps.ready(mapInit);
            const mapTabTrigger =
                document.querySelectorAll("[data-map-trigger]");
            [...mapTabTrigger].forEach((tab) => {
                tab.addEventListener("click", () => {
                    const dataLat = Number(tab.dataset.lat);
                    const dataLing = Number(tab.dataset.ling);
                    const dataZoom = Number(tab.dataset.zoom);
                    // const dataAddress = tab.dataset.address;
                    [...mapTabTrigger].forEach((item) =>
                        item.classList.remove("isActive")
                    );
                    tab.classList.add("isActive");
                    myMap.setCenter([dataLat, dataLing], dataZoom, {
                        checkZoomRange: true,
                    });
                    myPlacemark.geometry.setCoordinates([dataLat, dataLing]);
                });
            });
        };
    };
    let observerOptions = {
        // root: по умолчанию window, но можно задать любой элемент-контейнер
        rootMargin: "0px 0px 0px 0px",
    };
    let observer = new IntersectionObserver(([entry]) => {
        const targetInfo = entry.boundingClientRect;
        const rootBoundsInfo = entry.rootBounds;
        if (
            (!isLoaded && targetInfo.top < rootBoundsInfo.bottom) ||
            targetInfo.isIntersecting
        ) {
            loadMap();
            // observer.unobserve(entry.target)
        }
    }, observerOptions);
    observer.observe(mapElem);
}
let isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Mozilla: function () {
        return navigator.userAgent.match(/Mozilla/i);
    },
    Firefox: function () {
        return navigator.userAgent.match(/Firefox/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};
function addTouchClass() {
    if (isMobile.any()) {
        document.body.classList.add("_touch");
    } else {
        document.body.classList.add("_pc");
    }
}
addTouchClass();
// Подключение библиотеки для модальных окон
const modal = new GraphModal({
    isOpen: (modal) => {
        const inputs = modal.modalContainer.querySelectorAll("input");
        if (inputs) {
            setTimeout(() => {
                inputs[0].focus();
            }, 200);
        }
    },
});
// Подключение кастомного скроллбара
Array.prototype.forEach.call(
    document.querySelectorAll("[data-simplebar]"),
    (el) => new SimpleBar(el)
);
// Раскрытие информации в тектсовом блоке (в финальной версии - толкьо главаня страница)
const textBlock = document.querySelector(".text-block");
if (textBlock) {
    textBlock.addEventListener("click", (event) => {
        event.preventDefault();
        let target = event.target;
        if (
            target.closest(".text-block__gradient") ||
            target.closest(".text-block__button")
        ) {
            const button = target.closest(".text-block__button");
            textBlock.classList.toggle("isOpen");
            button.classList.toggle("isActive");
            button.innerHTML = textBlock.classList.contains("isOpen")
                ? "Свернуть"
                : "Читать далее";
            // target.closest('.text-block__button').remove();
        }
    });
}
// Наведение на пункты меню каталога
const menuCatalog = document.querySelector(".menu-footer__nav--catalog");
if (menuCatalog) {
    const menuLinks = menuCatalog.querySelectorAll("a");
    menuCatalog.addEventListener("mouseover", addMenuClass);
    menuCatalog.addEventListener("mouseleave", removeMenuClass);
    function addMenuClass(event) {
        let target = event.target;
        if (target.closest("a")) {
            const activeLink = document.querySelector("a.active");
            if (activeLink) {
                // return;
                activeLink.classList.remove("active");
            }
            [...menuLinks].forEach((link) => {
                link.classList.remove("active");
                link.classList.add("in-active");
            });
            target.classList.add("active");
        }
    }
    function removeMenuClass() {
        [...menuLinks].forEach((link) => {
            link.removeAttribute("class");
        });
    }
}

// Загрузка файла (форма - заказать коммерческое предложение)
function attachFile(formId) {
    const form = document.getElementById(formId);
    if (form) {
        const inputUpload = form.querySelector("[data-upload-file]");
        const fileList = form.querySelector("[data-file-list]");
        const loadFile = form.querySelector("[data-load-file]");
        const emptyList = form.querySelector("[data-empty-list]");
        let file;
        let files = inputUpload?.files;
        // checkEmptyList(files);
        function uploadFile(event) {
            if (event.target.closest("[data-upload-file]")) {
                file = event.target.files[0];
                renderFile(file);
            }
        }
        function deleteFile(event) {
            // Проверяем если клик был НЕ по кнопке "удалить файл"
            if (event.target.dataset.action !== "delete") return;
            const parentNode = event.target.closest(".file-item");
            // Удаляем файл из разметки
            parentNode.remove();
            checkEmptyList(files);
        }
        function checkEmptyList(files) {
            if (files.length === 0) {
                const emptyListHTML = `<li data-empty-list>
						<label class="load-file__label">
							<input type="file" id="upload_file" class="load-file__input visuallyHidden" data-upload-file>
							Прикрепить файл
						</label>
					</li>`;
                // fileList.insertAdjacentHTML('afterbegin', emptyListHTML);
                fileList.innerHTML = emptyListHTML;
            }
            if (files.length > 0) {
                const emptyListEl = document.querySelector("#emptyList");
                emptyListEl ? emptyListEl.remove() : null;
            }
        }
        function renderFile(file) {
            // Формируем разметку для нового файла
            let fileItem = `<li class="file-item">
						<span class="file-item__text">${file.name}</span>
						<button class="file-item__button" type="button" data-action="delete"></button>
					</li>`;
            // Добавляем данные файла (file.name) на страницу
            fileList.innerHTML = fileItem;
            loadFile.remove();
        }
        fileList.addEventListener("click", deleteFile);
        form.addEventListener("change", uploadFile);
    }
}
attachFile("formOffer");
attachFile("formOfferModal");

// Кнопка показать фильтры на мобильной версии
const filterBtn = document.getElementById("filterBtn");
if (filterBtn) {
    filterBtn.addEventListener("click", (event) => {
        event.target.classList.toggle("isActive");
        event.target.nextElementSibling.classList.toggle("isOpen");
    });
}

// Меню
let iconMenu = document.querySelector(".menu-icon");
if (iconMenu) {
    let menuBody = document.querySelector(".menu");
    iconMenu.addEventListener("click", (event) => {
        document.body.classList.toggle("lock");
        event.currentTarget.classList.toggle("active");
        menuBody.classList.toggle("open");
    });
}

// var sticky = new Sticky("[data-sticky]", {});
// console.log(sticky);
// sticky.options.stickyContainer = ".category-list__body";

// Первая версия с фиксированным фильтром в списке товаров
const inner = document.querySelector(".category-list__body");
const filter = document.querySelector(".filter-form");
let direction = "up";
let total;
function scrollDetect() {
    var lastScroll = 0;
    window.onscroll = function () {
        let currentScroll =
            document.documentElement.scrollTop || window.scrollY; // Get Current Scroll Value
        if (currentScroll > 0 && lastScroll <= currentScroll) {
            lastScroll = currentScroll;
            direction = "down";
        } else {
            lastScroll = currentScroll;
            direction = "up";
        }
    };
}
// scrollDetect();
// document.addEventListener("scroll", (e) => {
//     const { bottom, height, top } = filter.getBoundingClientRect();
//     let heightOne = inner.scrollTop + window.innerHeight;
//     let heightTwo = inner.scrollTop + bottom;
//     let innerBottom = inner.getBoundingClientRect().bottom + window.scrollY;
//     let innerTop = inner.getBoundingClientRect().top;
//     let filterTop = top + window.scrollY;
//     let center = filter.offsetTop - (window.innerHeight - filter.scrollHeight);
//     if (heightOne >= heightTwo && !filter.classList.contains("work")) {
//         filter.classList.add("fixed");
//         filter.classList.add("work");
//         // filter.style.marginTop = `${inner.scrollTop - top}px`;
//     }
//     if (heightOne + window.scrollY >= innerBottom) {
//         filter.classList.replace("fixed", "absolute");
//     }
//     // if (heightOne + window.scrollY < innerBottom && direction == "up") {
//     //     filter.style.top = `${innerTop}px`;
//     // }
//     if (
//         window.scrollY <= center &&
//         filter.classList.contains("work") &&
//         direction == "up"
//     ) {
//         filter.classList.remove("absolute");
//         filter.classList.remove("fixed");
//         filter.classList.add("sticky");
//     }
//     if (
//         filterTop <= heightOne &&
//         filter.classList.contains("work") &&
//         direction == "up"
//     ) {
//         filter.classList.remove("fixed");
//         filter.classList.remove("absolute");
//         filter.classList.remove("sticky");
//         filter.classList.remove("work");
//     }
//     // let footerTop = document
//     //     .querySelector(".footer")
//     //     .getBoundingClientRect().top;
//     // if (
//     //     innerTop + window.scrollY >= window.scrollY &&
//     //     filter.classList.contains("work") &&
//     //     direction == "up"
//     // ) {
//     //     filter.classList.remove("fixed");
//     //     filter.classList.remove("absolute");
//     //     filter.classList.add("sticky");
//     //     filter.classList.remove("work");
//     //     var topPosition = Math.min(
//     //         topPosition,
//     //         footerTop - window.scrollY - height
//     //     );
//     //     filter.style.top = `${topPosition}px`;
//     // }
//     // if (
//     //     top + height > window.innerHeight &&
//     //     filter.classList.contains("work") &&
//     //     direction == "up"
//     // ) {
//     //     console.log("top filter");
//     //     total = top - innerTop;
//     //     filter.style.top = `${total}px`;
//     // }
//     // let footerTop = document
//     //     .querySelector(".footer")
//     //     .getBoundingClientRect().top;
//     // if (
//     //     window.scrollY + height > footerTop &&
//     //     filter.classList.contains("work") &&
//     //     direction == "up"
//     // ) {
//     //     filter.classList.remove("fixed");
//     //     filter.classList.remove("absolute");
//     //     filter.classList.add("sticky");
//     //     filter.classList.remove("work");
//     //     var topPosition = Math.min(
//     //         topPosition,
//     //         footerTop - window.scrollY - height
//     //     );
//     //     filter.style.top = `${topPosition}px`;
//     // }
// });
// window.addEventListener("mousewheel", function (event) {
//     if (event.wheelDelta >= 0) {
//         direction = "up";
//     } else {
//         direction = "down";
//     }
// });

if (window.innerWidth > 991.98) {
    var sidebar = document.querySelector(".filter");
    var content = document.querySelector(".category-list__wrapper");
    var floatSidebar = FloatSidebar({
        sidebar: sidebar,
        relative: content,
        topSpacing: 40,
        bottomSpacing: 40,
    });
}
