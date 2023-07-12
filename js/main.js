import swiper from "./modules/swiper/swiper-bundle.min";
import fancybox from "./modules/fancybox/fancybox.umd";
import AosModule from "./modules/aos/Animated";
import AosModulejs from "./modules/aos/AosModule";
import Aosjs from "./modules/aos/aos";


window.addEventListener("DOMContentLoaded", () => {
    swiper();
    fancybox();
    AosModule();
    AosModulejs();
    Aosjs();
});

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.addEventListener("scroll", function(e) {
    let value = e.target.documentElement.scrollTop;
    let btnscr = document.getElementById("btn-scr");
    const header = $('#header');

    if (value > 80) {
        btnscr.style.opacity = 1;
        header.classList.add('transparent');

    } else {
        btnscr.style.opacity = 0;
        header.classList.remove('transparent');
    }
})

//backtotop
$('#btn-scr').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: "smooth" })
})

//tab
const tabItem = $$('.tab_item');
const tabPaner = $$('.tab_paner');
tabItem.forEach((tab, index) => {
    const pane = tabPaner[index];
    tab.onclick = function() {
        $(".tab_item.active").classList.remove("active");
        $(".tab_paner.active").classList.remove("active");

        this.classList.add("active");
        pane.classList.add("active");
    };
})

// header
//submenu


//slide post
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    loop: true,
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: "2",
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: "3",
        }
    }
});


//fancybox
Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

//slide gallery
var swiper1 = new Swiper(".slide_gallery", {
    effect: "cards",
    grabCursor: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    loop: true,
});

//reviews_slide
var reviews = new Swiper(".reviews_slide", {
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        768: {
            slidesPerView: "2",
            spaceBetween: 30,
        },
        1200: {
            slidesPerView: "4.25",
        }
    },
    slidesPerView: 5,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },


});

//toggle bar
$('.toggle_bar').addEventListener('click', function() {
    $('.men_primary').classList.toggle('active');
    $('.overlay').classList.toggle('active');
    $('.toggle_bar').classList.toggle('active');
});

//aos

AOS.init({
    offset: 0,
    duration: 1200,
    delay: '200',
    easing: 'ease',
    once: true,
    mirror: true,
    // disable: function() {
    //     return $(window).width() <= 768;
    // },
});