export default function AnimatedModule() {
    let $window = $(window);

    function scrollAddClass(el, className) {
        $(el).each(function () {
            let el = this;
            if (
                $(el).offset().top <
                $window.scrollTop() + ($window.height() / 10) * 8
            ) {
                $(el).addClass(className);
            }
        });
    }

    function bindImageAnimations() {
        scrollAddClass(".load-img", "is-inview");
        scrollAddClass(".load-img-second", "is-inview");
        scrollAddClass(".load-img-third", "is-inview");



        $window.on("scroll", function () {
            scrollAddClass(".load-img", "is-inview");
            scrollAddClass(".load-img-second", "is-inview");
            scrollAddClass(".load-img-third", "is-inview");

        });
    }
    bindImageAnimations();


    // Scroll tranform
    let itemMoves = document.querySelectorAll('.move-item');
    let _h = window.innerHeight;
    if (itemMoves.length > 0 && window.innerWidth > 1024) {
        window.addEventListener('scroll', () => {
            itemMoves.forEach((el) => {
                let pos = el.getBoundingClientRect().top;
                if (pos > -_h / 2 && pos < _h) {
                    let Y = (pos / _h * 100);
                    el.style.transform = `translateX(` + Y + `px)`;
                }
            });
        });
    }


    const loadMap = document.querySelectorAll(".load-map")
    if (loadMap) {
        loadMap.forEach(item => {
            const map = item.querySelector('iframe');
            map.addEventListener('load', () => {
                item.classList.add('is-inview')
            })
        })
    }
}