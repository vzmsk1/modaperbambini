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

window.addEventListener('load', function () {});
