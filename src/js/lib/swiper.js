import Swiper from 'swiper';
import 'swiper/css';
import { removeClasses, remToPx } from '../utils/utils';
import { Navigation, Autoplay, Pagination, EffectFade, Thumbs, EffectCreative } from 'swiper/modules';

export function initHeroSlider() {
    function addThumbsClasses(swiper) {
        const thumbs = document.querySelectorAll('.carousel-brands-hero__item');

        if (thumbs.length) {
            removeClasses(thumbs, '_is-active');
            thumbs[swiper.realIndex].classList.add('_is-active');
        }
    }

    if (document.querySelector('.hero__swiper')) {
        new Swiper('.hero__swiper', {
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
                el: '.hero__carousel-pagination',
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

function initSlidersOnResize() {
    if (document.querySelector('.franchising-hero__swiper') && window.innerWidth <= 768) {
        new Swiper('.franchising-hero__swiper', {
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
                el: '.franchising-hero__carousel-pagination',
                type: 'bullets',
                clickable: true
            }
        });
    }
    if (document.querySelector('.advantages__swiper')) {
        const slider = new Swiper('.advantages__swiper', {
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
                768: {
                    enabled: false
                }
            },
            on: {
                afterInit: (swiper) => {
                    if (window.innerWidth > 768) {
                        setTimeout(() => {
                            swiper.wrapperEl.removeAttribute('style');
                            swiper.slides.forEach((slide) => slide.removeAttribute('style'));
                            swiper.destroy();
                        }, 500);
                    } else {
                        swiper.autoplay.resume();
                    }
                }
            }
        });
    }
}

window.matchMedia('(max-width: 768px)').addEventListener('change', initSlidersOnResize);

window.addEventListener('load', function () {
    initSlidersOnResize();
});
