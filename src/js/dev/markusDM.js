import Swiper from 'swiper';
import 'swiper/css';
import { removeClasses, remToPx } from '../utils/utils';
import { Navigation, Autoplay, Pagination, EffectFade, Thumbs, EffectCreative } from 'swiper/modules';

if (document.querySelector('.show-d')) {
    const detailedGalleryThumbs = new Swiper('.show-d__right-swiper', {
        modules: [Thumbs, Navigation, EffectFade],
        slidesPerView: 1,
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        },
     
        freeMode: true,
        watchSlidesProgress: true,
        speed: 1200,
        slideToClickedSlide: true,
        breakpoints: {
            0: {
                spaceBetween: remToPx(1.6)
            },
            768: {
                spaceBetween: remToPx(2.8)
            }
        }
    });

    new Swiper('.show-d__swiper', {
        modules: [Thumbs, Navigation, EffectFade],
        speed: 1200,
        effect: 'fade',
        navigation: {
            prevEl: '.show-d__right-navigation-prev',
            nextEl: '.show-d__right-navigation-next'
        },
        pagination: {
            el: '.show-d__left-bullets',
            type: 'bullets',
            clickable: true
        },
    fadeEffect: {
      crossFade: true
    },
        grabCursor: true,
        thumbs: {
            swiper: detailedGalleryThumbs
        },
        slidesPerView: 1,
        breakpoints: {
            0: {
                spaceBetween: remToPx(3.2)
            },
            768: {
                spaceBetween: remToPx(1.6)
            }
        }
    });
}