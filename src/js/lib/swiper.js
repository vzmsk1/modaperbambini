import Swiper from 'swiper';
import 'swiper/css';
import { removeClasses, remToPx } from '../utils/utils';
import { Navigation, Autoplay, Pagination, EffectFade, Thumbs, EffectCreative } from 'swiper/modules';

const mm = window.matchMedia('(max-width: 768px)');

export function initHeroSlider() {
    function addThumbsClasses(swiper) {
        const thumbs = document.querySelectorAll('.carousel-brands-hero__item');

        if (thumbs.length) {
            removeClasses(thumbs, '_is-active');
            thumbs[swiper.realIndex].classList.add('_is-active');
        }
    }

    if (document.querySelector('.hero_mainpage .hero__swiper')) {
        new Swiper('.hero_mainpage .hero__swiper', {
            modules: [Autoplay, EffectCreative, Pagination],
            speed: 800,
            loop: true,
            allowTouchMove: false,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            effect: 'creative',
            creativeEffect: {
                prev: {
                    translate: [0, 0, 0]
                },
                next: {
                    translate: [0, '-100%', 0]
                }
            },
            pagination: {
                el: '.hero_mainpage .hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            on: {
                realIndexChange: (swiper) => {
                    addThumbsClasses(swiper);
                }
            }
        });
    }
}

function setActiveClasses(idx, items) {
    const currentItem = items[idx];

    if (items.length && currentItem) {
        removeClasses(items, '_is-active');
        currentItem.classList.add('_is-active');
    }
}

function removeWrapperStylingOnDesk(swiper) {
    if (!mm.matches) {
        setTimeout(() => {
            swiper.autoplay && swiper.autoplay.pause();
            swiper.wrapperEl.removeAttribute('style');
            swiper.slides.forEach((slide) => slide.removeAttribute('style'));
        }, 1000);
    } else if (swiper.autoplay) {
        swiper.autoplay.resume();
    }
}

function initStaticSlider(prev, next, slides, items) {
    let i = 0;

    function addActiveClass() {
        removeClasses(slides, '_is-active');
        slides[i].classList.add('_is-active');

        if (items.length) {
            setActiveClasses(i, items);
        }
    }

    if (slides.length) {
        addActiveClass();

        if (next) {
            next.addEventListener('click', function () {
                i = i < slides.length - 1 ? ++i : 0;

                addActiveClass();
            });
        }
        if (prev) {
            prev.addEventListener('click', function () {
                i = i ? --i : slides.length - 1;

                addActiveClass();
            });
        }
    }
}

function initSlidersOnResize() {
    if (document.querySelector('.hero_franchising .hero__swiper')) {
        new Swiper('.hero_franchising .hero__swiper', {
            modules: [Autoplay, EffectCreative, Pagination],
            speed: 800,
            loop: true,
            effect: 'creative',
            creativeEffect: {
                prev: {
                    translate: [0, 0, 0]
                },
                next: {
                    translate: [0, '-100%', 0]
                }
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            pagination: {
                el: '.hero_franchising .hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                768: { enabled: false }
            },
            on: {
                afterInit: (swiper) => {
                    !mm.matches && removeWrapperStylingOnDesk(swiper);
                },
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.steps__swiper')) {
        new Swiper('.steps__swiper', {
            modules: [Autoplay],
            speed: 800,
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: remToPx(1.6),
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },
            breakpoints: {
                768: { enabled: false }
            },
            on: {
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.advantages__swiper')) {
        new Swiper('.advantages__swiper', {
            modules: [Autoplay],
            speed: 800,
            loop: true,
            slidesPerView: 'auto',
            spaceBetween: remToPx(1.6),
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            },

            breakpoints: {
                768: { enabled: false }
            },
            on: {
                resize: (swiper) => {
                    removeWrapperStylingOnDesk(swiper);
                }
            }
        });
    }
    if (document.querySelector('.brands__swiper')) {
        const nextEl = document.querySelector('.brands__swiper-navigation .i-btn_arr-next');
        const prevEl = document.querySelector('.brands__swiper-navigation .i-btn_arr-prev');

        if (!mm.matches) {
            initStaticSlider(
                prevEl,
                nextEl,
                document.querySelectorAll('.brands__swiper-slide'),
                document.querySelectorAll('.brands__group')
            );
        } else {
            new Swiper('.brands__swiper', {
                modules: [Pagination],
                speed: 800,
                loop: true,
                pagination: {
                    el: '.brands__carousel-pagination',
                    type: 'bullets',
                    clickable: true
                },
                breakpoints: { 768: { enabled: false } },
                on: {
                    afterInit: (swiper) => {
                        setActiveClasses(swiper.realIndex, document.querySelectorAll('.brands__group'));
                    },
                    slideChange: (swiper) => {
                        setActiveClasses(swiper.realIndex, document.querySelectorAll('.brands__group'));
                    },
                    resize: (swiper) => {
                        removeWrapperStylingOnDesk(swiper);
                    }
                }
            });
        }
    }
}

function initSliders() {
    if (document.querySelector('.stores__swiper')) {
        new Swiper('.stores__swiper', {
            modules: [EffectFade, Navigation, Pagination],
            speed: 800,
            loop: true,
            effect: 'fade',
            allowTouchMove: false,
            navigation: {
                prevEl: '.stores__swiper-navigation .i-btn_arr-prev',
                nextEl: '.stores__swiper-navigation .i-btn_arr-next'
            },
            pagination: {
                el: '.stores__carousel-pagination',
                type: 'bullets',
                clickable: true
            },
            on: {
                init: (swiper) => {
                    setActiveClasses(swiper.realIndex, document.querySelectorAll('.stores__image-wrap'));
                },
                realIndexChange: (swiper) => {
                    setActiveClasses(swiper.realIndex, document.querySelectorAll('.stores__image-wrap'));
                }
            }
        });
    }
}

window.matchMedia('(max-width: 768px)').addEventListener('change', initSlidersOnResize);

window.addEventListener('load', function () {
    initSlidersOnResize();
    initSliders();
});
