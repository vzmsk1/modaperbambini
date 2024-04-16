import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { initHeroSlider } from '../lib/swiper';
import { _slideDown, _slideToggle, _slideUp, removeClasses } from '../utils/utils';

const mm = gsap.matchMedia();
const mq = window.matchMedia('(max-width: 768px)');

function setGsapDefaults() {
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
}
setGsapDefaults();

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

function initAccordionTabs() {
    const tabs = document.querySelectorAll('[data-accordion-tabs]');

    if (tabs.length) {
        tabs.forEach((block) => {
            const titles = Array.from(block.querySelectorAll('[data-accordion-tabs-item]'));
            const content = block.querySelectorAll('[data-accordion-tabs-content]');
            const body = block.querySelector('[data-accordion-tabs-body]');

            function removeActiveClasses() {
                removeClasses(titles, '_is-active');
                removeClasses(content, '_is-active');
            }

            function setActiveClasses(idx) {
                if (content[idx]) {
                    const isActive = titles[idx].classList.contains('_is-active');

                    removeActiveClasses();

                    if (mq.matches) {
                        content.forEach((el, index) => {
                            if (index !== idx) {
                                _slideUp(el);
                            }
                        });

                        if (!isActive) {
                            titles[idx].classList.add('_is-active');
                            _slideDown(content[idx]);
                        } else {
                            titles[idx].classList.remove('_is-active');
                            _slideUp(content[idx]);
                        }
                    } else {
                        content[idx].classList.add('_is-active');
                        titles[idx].classList.add('_is-active');
                    }
                }
            }

            function clickHandler(e) {
                const target = e.target.closest('[data-accordion-tabs-item]');

                if (target) {
                    setActiveClasses(titles.indexOf(target));
                }
            }

            if (!mq.matches) {
                content[0].classList.add('_is-active');
            } else {
                removeActiveClasses();
            }

            titles[0].classList.add('_is-active');

            for (let i = 0; i < titles.length; i++) {
                const title = titles[i];
                const contentItem = content[i];
                const parent = title.parentElement;

                if (mq.matches) {
                    parent.append(contentItem);
                    if (i !== 0) _slideUp(contentItem);
                } else if (body) {
                    body.append(contentItem);
                    contentItem.removeAttribute('hidden');
                }
            }

            block.addEventListener('click', clickHandler);
        });
    }
}

window.addEventListener('load', function () {
    document.body.style.opacity = 1;

    initAccordionTabs();

    setTimeout(() => {
        document.documentElement.classList.add('_page-loaded');
    }, 1000);

    mq.addEventListener('change', function () {
        initAccordionTabs();
    });
    mm.add('(min-width: 768px)', () => {
        initHeroAnimation();
        initAboutScreenAnimation();
    });
});
