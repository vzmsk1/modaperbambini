import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { initHeroSlider } from '../lib/swiper';

const mm = gsap.matchMedia();

gsap.defaults({
    duration: 1
});
gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
    name: 'fadeIn',
    effect: (targets, config, pst) => {
        return gsap.fromTo(
            targets,
            { opacity: 0, visibility: 'hidden' },
            { opacity: 1, visibility: 'visible', config },
            pst ? { position: pst } : null
        );
    },
    extendTimeline: true
});
gsap.registerEffect({
    name: 'clipTTB',
    effect: (targets, config, pst) => {
        return gsap.fromTo(
            targets,
            { 'clip-path': 'polygon(0 0, 100% 0%, 100% 0, 0 0)' },
            { 'clip-path': 'polygon(0 0, 100% 0%, 100% 100%, 0 100%)', config },
            pst ? { position: pst } : null
        );
    },
    extendTimeline: true
});

function initHeroAnimation() {
    if (document.getElementById('animate-hero')) {
        const tl = gsap.timeline();

        tl.fromTo(
            '.header',
            {
                translateY: '-110%'
            },
            {
                translateY: 0
            },
            0.5
        );
        tl.fromTo(
            '.hero__head',
            {
                'clip-path': 'polygon(0 0, 0 0, 0 100%, 0% 100%)'
            },
            {
                'clip-path': 'polygon(0 0, 100% 0%, 100% 100%, 0% 100%)'
            },
            0.7
        );
        tl.fadeIn('.hero__body', {
            onStart: () => {
                initHeroSlider();
            },
            onComplete: () => {
                tl.kill();
                document.querySelector('.header').removeAttribute('style');
            }
        });
    }
}

function initAboutScreenAnimation() {
    if (document.getElementById('animate-about-screen')) {
        gsap.timeline({
            scrollTrigger: {
                trigger: '#animate-about-screen',
                start: 'top 40%',
                end: '+=500',
                once: true
            }
        })
            .to('.about__heading span', {
                '--width': '100%',
                duration: 0.6,
                stagger: 0.6
            })
            .fadeIn('.about__body', {}, 1)
            .fadeIn(document.querySelectorAll('.about__numbers')[0], {}, 1.2)
            .clipTTB('.numbers-about__item:not(:first-child)', { duration: 0.6, stagger: 0.6 }, 1.6);
    }
}
window.addEventListener('load', function () {
    document.body.style.opacity = 1;

    setTimeout(() => {
        document.documentElement.classList.add('_page-loaded');
    }, 1000);

    mm.add('(min-width: 768px)', () => {
        initHeroAnimation();
        initAboutScreenAnimation();
    });
});
