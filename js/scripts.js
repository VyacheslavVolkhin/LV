document.addEventListener("DOMContentLoaded", function() {

	const mediaQuery = window.matchMedia('(min-width: 1024px)');

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		Toolbar: {
			display: {
			left: [],
			middle: [],
			right: ["close"]
			}
		},
	});


	//reviews stat toggle
	const toggleBtns = document.querySelectorAll('.js-popup-review-toggle');
const popup = document.querySelector('.js-popup-review');

if (toggleBtns.length && popup) {
  // Открытие/закрытие по клику на любую кнопку toggle
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
	  e.preventDefault();
      popup.classList.toggle('active');
    });
  });

  // Закрытие по клику вне попапа
  document.addEventListener('click', function(e) {
    // Проверяем, что клик был не по кнопкам и не по попапу
    const isClickOnToggle = Array.from(toggleBtns).some(btn => btn.contains(e.target));
    
    if (!popup.contains(e.target) && !isClickOnToggle) {
      popup.classList.remove('active');
    }
  });

  // Предотвращаем закрытие при клике внутри попапа
  popup.addEventListener('click', function(e) {
    e.stopPropagation();
  });
}


	//sticky panel get active
	const stickyPanel = document.getElementById('stickyPanel');
	function updateStickyState() {
	const rect = stickyPanel.getBoundingClientRect();
	if (rect.top === 0) {
		stickyPanel.classList.add('active');
	} else {
		stickyPanel.classList.remove('active');
	}
	}
	let ticking = false;
	window.addEventListener('scroll', () => {
	if (!ticking) {
		requestAnimationFrame(() => {
		updateStickyState();
		ticking = false;
		});
		ticking = true;
	}
	});
	window.addEventListener('resize', updateStickyState);


	//mobile tabs active 
    if (mediaQuery.matches) {
        const firstTabMobileButton = document.querySelector('.tabs-mobile-box .menu li:first-child .btn');
        if (firstTabMobileButton) {
            firstTabMobileButton.classList.add('active');
        }
    }
	
	
	//textarea counter
    const textCounters = document.querySelectorAll('.field-textarea-counter');
    if (textCounters) {
		textCounters.forEach(counter => {
			const textarea = counter.closest('.frm-field-textarea').querySelector('.form-input');
			const maxLength = textarea.getAttribute('maxlength') || 1000;
			const warningThreshold = textarea.dataset.counterWarning || 80;
			
			function update() {
				const current = textarea.value.length;
				counter.textContent = `${current} / ${maxLength}`;
				
				// Динамическое изменение стилей
				const percent = (current / maxLength) * 100;
				if (percent >= warningThreshold) {
					counter.classList.add('warning');
					counter.classList.remove('normal');
				} else {
					counter.classList.add('normal');
					counter.classList.remove('warning');
				}
			}
			
			textarea.addEventListener('input', update);
			textarea.addEventListener('focus', update);
			textarea.addEventListener('blur', update);
			
			update();
		});
	}
	

	//copy button
	document.querySelectorAll('.js-btn-copy').forEach(function(btn) {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			const content = btn.getAttribute('data-content');
			if (content) {
				navigator.clipboard.writeText(content)
					.then(() => {
						// alert('Скопировано!');
					})
					.catch(err => {
						// Обработка ошибок, если не удалось скопировать
						alert('Ошибка копирования');
					});
			}
		});
	});


	// filter actions
	const filterButtonOpen = document.querySelector('.js-filter-open');
	const filterButtonClose = document.querySelector('.js-filter-close');
	const filterButtonApply = document.querySelector('.js-filter-apply');
	const filterButtonReset = document.querySelector('js-filter-reset');
	if (filterButtonOpen) {
		filterButtonOpen.addEventListener("click", function(event) {
				document.body.classList.add("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonClose) {
		filterButtonClose.addEventListener("click", function(event) {
				document.body.classList.remove("filter-show");
				event.preventDefault();
		})
	}
	if (filterButtonApply) {
		filterButtonApply.addEventListener('click', function() {
			event.preventDefault();
			setTimeout(() => {
				document.body.classList.remove("filter-show");
				if (filterButtonOpen) {
					const selectedCheckboxes = document.querySelectorAll('.frm-select input[type="checkbox"]:checked');
					
					if (selectedCheckboxes.length > 0) {
						filterButtonOpen.setAttribute('data-counter', selectedCheckboxes.length);
					} else {
						filterButtonOpen.removeAttribute('data-counter');
					}
				}
			}, 100);
		});
	}
	if (filterButtonReset) {
		filterButtonReset.addEventListener('click', function() {
			const filterButtonOpen = document.querySelector('.js-filter-open');
			if (filterButtonOpen) {
				filterButtonOpen.removeAttribute('data-counter');
			}
		});
	}

	


	//catalog menu mobile
    const menuToggles = document.querySelectorAll('.header .catalog-menu-wrap .js-menu-toggle');
    const catalogMenuWrap = document.querySelector('.header .catalog-menu-wrap');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parentLi = this.closest('li');
            if (parentLi.classList.contains('active')) {
                parentLi.classList.remove('active');
                catalogMenuWrap.classList.remove('active');
            } else {
                document.querySelectorAll('.menu-main > li').forEach(li => {
                    li.classList.remove('active');
                });
                parentLi.classList.add('active');
                catalogMenuWrap.classList.add('active');
            }
        });
    });
    document.addEventListener('click', function(e) {
        if (!catalogMenuWrap.contains(e.target)) {
            document.querySelectorAll('.menu-main > li').forEach(li => {
                li.classList.remove('active');
            });
            catalogMenuWrap.classList.remove('active');
        }
    });


	//search
	const searchInputs = document.querySelectorAll('.js-input-search');
	if (searchInputs) {
		searchInputs.forEach(input => {
			input.addEventListener('focus', function() {
				const searchWrap = this.closest('.search-inner-wrap');
				const resultsWrap = searchWrap.querySelector('.frm-results-wrap');
				const closeSearchButton = searchWrap.querySelector('.button-search-close');
				closeSearchButton.classList.add('active');
				resultsWrap.classList.add('active');
			});
			input.addEventListener('blur', function() {
				const searchWrap = this.closest('.search-inner-wrap');
				const resultsWrap = searchWrap.querySelector('.frm-results-wrap');
				setTimeout(() => {
					resultsWrap.classList.remove('active');
				}, 150);
			});
		});
	}


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	if (tglButtons) {
		for (i = 0; i < tglButtons.length; i++) {
			tglButtons[i].addEventListener('click', function(e) {
				const currentSync = this.getAttribute('data-sync');
				if (currentSync) {
					const isActive = this.classList.contains('active');
					const syncButtons = document.querySelectorAll(`.js-btn-tgl[data-sync="${currentSync}"]`);
					syncButtons.forEach(button => {
						if (isActive) {
							button.classList.remove('active');
						} else {
							button.classList.add('active');
						}
					});
				} else {
					this.classList.toggle('active');
				}
				
				e.preventDefault();
				return false;
			});
		}
	}
	if (addButtons) {
		for (i = 0; i < addButtons.length; i++) {
			addButtons[i].addEventListener('click', function(e) {
				const currentSync = this.getAttribute('data-sync');
				if (this.classList.contains('active')) {
					return;
				}
				if (currentSync) {
					document.querySelectorAll(`.js-btn-add[data-sync="${currentSync}"]`)
						.forEach(button => button.classList.add('active'));
				} else {
					this.classList.add('active');
				}
				
				e.preventDefault();
				return false;
			});
		}
	}
	if (buttonsTglOne) {
		buttonsTglOne.forEach(function(button) {
			button.addEventListener('click', function(e) {
				e.preventDefault();
				let toggleButtonsWrap = this.closest('.js-toggle-buttons');
		
				if (this.classList.contains('active')) {
					this.classList.remove('active');
				} else {
					toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
						btn.classList.remove('active');
					});
					this.classList.add('active');
				}
				return false;
			});
		});
	}


	//form input clear
	const inputFields = document.querySelectorAll(".frm-field-input-action .form-input");
	const clearButtons = document.querySelectorAll(".button-field-clear");
	
	for (let i = 0; i < inputFields.length; i++) {
	  const inputField = inputFields[i
		];
	  const form = inputField.closest(".frm-field-input-action");
	
	  inputField.addEventListener("input", function () {
		if (inputField.value.length > 0) {
		  form.classList.add("inp-valid");
			} else {
		  form.classList.remove("inp-valid");
			}
		});
	}
	for (let i = 0; i < clearButtons.length; i++) {
	  const clearButton = clearButtons[i
		];
	  clearButton.addEventListener("click", function (event) {
		this.closest(".frm-field-input-action").querySelector(".form-input").value = "";
		this.closest(".frm-field-input-action").classList.remove("inp-valid");
		event.preventDefault();
		});
	}


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive) > -1) {
							console.log(tabsBlocks[j].dataset.tab.toString().indexOf(tabsNavElementActive))
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()


	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')
	const wrapWidth = document.querySelector('.wrap').offsetWidth
	const bodyElem = document.querySelector('body')
	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box')

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
	element.addEventListener("click", function (e) {
		document.querySelector(".popup-outer-box").classList.remove("active");
		document.body.classList.add("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}

		popupCurrent = this.getAttribute("data-popup");
		document
		.querySelector(
			`.popup-outer-box[id="${popupCurrent}"
			]`
		)
		.classList.add("active");

		e.preventDefault();
		e.stopPropagation();
		return false;
		});
	});
	document.querySelectorAll(".js-popup-close").forEach(function (element) {
	element.addEventListener("click", function (event) {
		document.body.classList.remove("popup-open");
		for (i=0;i<popupsList.length;i++) {
			popupsList[i
				].classList.remove("active");
			}
		event.preventDefault();
		event.stopPropagation();
		});
	});
	document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	element.addEventListener("click", function (event) {
		if (!event.target.closest(".popup-box")) {
		document.body.classList.remove("popup-open");
		document.body.classList.remove("popup-open-scroll");
		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
			e.classList.remove("active");
				});
		return false;
			}
		});
	});


	//slider catalog item
	const sliderscatalogitem = document.querySelectorAll(".tile-slider-catalogitem");
	
	sliderscatalogitem.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".tile-slider-catalogitem-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: false,
		});
	});


	//slider
	const sliderscatalog = document.querySelectorAll(".slider-catalog");
	sliderscatalog.forEach((container) => {
		const swiperEl = container.querySelector(".slider-wrap.swiper");
		const nextEl = container.querySelector(".button-slider-catalog-next");
		const prevEl = container.querySelector(".button-slider-catalog-prev");

		if (!swiperEl) return;

		const hasCol6 = container.classList.contains('col-6');

		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
			breakpoints: hasCol6 ? {
				1024: { slidesPerView: 3 },
				1200: { slidesPerView: 4 },
				1400: { slidesPerView: 5 },
				1500: { slidesPerView: 6 },
			} : {
				1024: { slidesPerView: 3 },
				1200: { slidesPerView: 4 },
				1400: { slidesPerView: 5 },
			},
		});
	});


	//slider
	const sliderslogos = document.querySelectorAll(".slider-logos");
	
	sliderslogos.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const nextEl = container.querySelector(".button-slider-logos-next");
		const prevEl = container.querySelector(".button-slider-logos-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider services
	const slidersservices = document.querySelectorAll(".slider-services");
	
	slidersservices.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const nextEl = container.querySelector(".button-slider-services-next");
		const prevEl = container.querySelector(".button-slider-services-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: false,
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider main
	const slidersmain = document.querySelectorAll(".slider-main");
	
	slidersmain.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-main-pagination");
		const nextEl = container.querySelector(".button-slider-main-next");
		const prevEl = container.querySelector(".button-slider-main-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextMBtn = container.querySelector('.button-slider-photos-main-next');
		const prevMBtn = container.querySelector('.button-slider-photos-main-prev');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 6,
			spaceBetween: 0,
			threshold: 6,
			direction: 'vertical',
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: {
				nextEl: nextTBtn,
				prevEl: prevTBtn,
			},
			breakpoints: {
				1024: {
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextMBtn,
				prevEl: prevMBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});


})