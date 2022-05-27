console.log('%c Crafted by Insight Creative, Inc. Designed and Developed by Justin Parsons', 'background: #1d1d1d; color: white; padding: 5px 10px;')

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const mobileMenu = document.querySelector('.site-header__mobile-nav')
const hamburger = document.querySelector('.hamburger')
const siteHeader = document.querySelector('.site-header')
const headerLogo = document.querySelector('.site-header__logo img')
const footerLogo = document.querySelector('.footer__logo img')
const videoTrigger = document.querySelector('.video-trigger')
const closeVideoBtn = document.querySelector('.video-overlay__button')
const videoOverlay = document.querySelector('.video-overlay')

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  headerLogo.src = "/uploads/electric-city-properties-logo-white.svg"
  footerLogo.src = "/uploads/electric-city-properties-logo-white.svg"
}

mobileMenu.style.height = 0

let scrollState = 0

var scrollTop = function() {
  return window.scrollY
}

var scrollDetect = function(collapse, expand) {
  var currentScroll = scrollTop()
  if (currentScroll > scrollState) {
    collapse()
  } else {
    expand()
  }
  scrollState = scrollTop()
}

function collapseNav() {
  siteHeader.classList.remove('expand')
  siteHeader.classList.add('collapse')
}

function expandNav() {
  siteHeader.classList.remove('collapse')
  siteHeader.classList.add('expand')
}

window.addEventListener('scroll', function() {
  scrollDetect(collapseNav, expandNav)
})

hamburger.addEventListener('click', toggleMobileMenu)

function toggleMobileMenu() {
    const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
    const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height

    mobileMenu.style.height = 0

    if(mobileMenu.classList.contains('nav-open')) {
        this.setAttribute('aria-expanded', 'false')
        this.setAttribute('aria-label', 'open mobile menu')
        mobileMenu.classList.remove('nav-open')
        mobileMenu.style.height = 0
        hamburger.classList.remove('is-active')
    } else {
        mobileMenu.classList.add('nav-open')
        mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
        hamburger.classList.add('is-active')
        this.setAttribute('aria-expanded','true')
        this.setAttribute('aria-label', 'close mobile menu')
    }
}

const mobileNavMenu = document.querySelector('.site-header__mobile-nav-menu')
const hasMobileDropdown = mobileNavMenu.querySelectorAll('.nav-list-has-dropdown')

hasMobileDropdown.forEach((dropdown) => {
  const dropdownToggle = dropdown.querySelector('.toggle-mobile-dropdown')

  dropdownToggle.addEventListener('click', event => {
    if(dropdown.classList.contains('active')) {
      dropdownToggle.setAttribute('aria-expanded', 'false')
      dropdownToggle.setAttribute('aria-label', 'open mobile dropdown menu')
      dropdown.classList.remove('active')
    } else {
      dropdown.classList.add('active')
      dropdownToggle.setAttribute('aria-expanded','true')
      dropdownToggle.setAttribute('aria-label','close mobile dropdown menu')
    }
    function updateMobileMenuHeight() {
      const mobileMenu = document.querySelector('.site-header__mobile-nav')
      const mobileMenuWrapper = document.querySelector('.site-header__mobile-nav-inner')
      const mobileMenuWrapperHeight = mobileMenuWrapper.getBoundingClientRect().height
      
      mobileMenu.style.height = mobileMenuWrapperHeight + 'px'
    }
  updateMobileMenuHeight()
  })
})

function fadeAnimations() {
    const fadeUp = document.querySelectorAll('.fade-up')

    gsap.utils.toArray(fadeUp).forEach((fade) => {
        gsap.to(fade, {
            opacity: 1,
            y: 0,
            duration: .5,
            ease: 'Power2.in',
            scrollTrigger: {
                trigger: fade,
                toggleActions: 'play none none none',
                start: "top bottom-=50"
            }
        })
    })

    gsap.set('.fade-staggered', {y: 50, autoAlpha: 0})

    ScrollTrigger.batch('.fade-staggered', {
        onEnter: batch => gsap.to(batch, {y: 0, autoAlpha: 1, stagger: 0.2}),
      })
}

fadeAnimations()

function initVideoTrigger () {
  if (!document.body.contains(videoTrigger)) return

  videoTrigger.addEventListener('click', event => {
      videoOverlay.classList.add('video-overlay--open')
  })
  
  closeVideoBtn.addEventListener('click', event => {
      videoOverlay.classList.remove('video-overlay--open')
  })
} 

initVideoTrigger()

var swiper = new Swiper(".image-swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 200,
    modifier: 2,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    type: 'bullets',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },
});