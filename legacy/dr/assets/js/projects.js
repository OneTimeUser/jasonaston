window.addEventListener('DOMContentLoaded', (event) => {


    const projects = document.querySelectorAll('.client__title');

    const close = document.querySelectorAll('.client__close');

    const archive = document.querySelectorAll('.client-name__archive');


    const MathUtils = {
        // map number x from range [a, b] to [c, d]
        map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,
        // linear interpolation
        lerp: (a, b, n) => (1 - n) * a + n * b,
        // Random float
        getRandomFloat: (min, max) => (Math.random() * (max - min) + min).toFixed(2),

        distance: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1)
    };

    const body = document.body;
    let winsize;
    const calcWinsize = () => winsize = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    calcWinsize();
    window.addEventListener('resize', calcWinsize);

    let isOnEl = false;

    $('#client-list article').mouseenter(function () {
        isOnEl = true;
    });

    $('#client-list article').mouseleave(function () {
        isOnEl = false;
    });

    // get the mouse position
    const getMousePos = (ev) => {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        } else if (ev.clientX || ev.clientY) {
            posx = ev.clientX + body.scrollLeft + docEl.scrollLeft;
            posy = ev.clientY + body.scrollTop + docEl.scrollTop;
        }
        return {
            x: posx,
            y: posy
        };
    }

    // mousePos: current mouse position
    // cacheMousePos: previous mouse position
    // lastMousePos: last last recorded mouse position (at the time the last image was shown)
    let mousePos = lastMousePos = cacheMousePos = {
        x: 0,
        y: 0
    };

    // update the mouse position
    window.addEventListener('mousemove', ev => mousePos = getMousePos(ev));

    // gets the distance from the current mouse position to the last recorded mouse position
    const getMouseDistance = () => MathUtils.distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);

    let docScroll;
    // for scroll speed calculation
    let lastScroll;
    let scrollingSpeed = 0;
    // scroll position update function
    const getPageYScroll = () => docScroll = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', getPageYScroll);


    class Item2 {
        constructor(el) {
            // the .item element
            this.DOM = {
                el: el
            };

            // the inner image


            this.DOM.title = this.DOM.el.querySelector('.section__title');

            this.renderedStyles = {
                // here we define which property will change as we scroll the page and the items is inside the viewport
                // in this case we will be translating the image on the y-axis
                // we interpolate between the previous and current value to achieve a smooth effect


                titleTranslationX: {
                    previous: 0,
                    current: 0,
                    ease: 0.1,
                    fromValue: Number(MathUtils.getRandomFloat(500, 700)),
                    setValue: () => {
                        const fromValue = this.renderedStyles.titleTranslationX.fromValue;
                        const toValue = -1 * fromValue;
                        const val = MathUtils.map(this.props.top - docScroll, winsize.height, -1 * this.props.height, fromValue, toValue);
                        return fromValue < 0 ? Math.min(Math.max(val, fromValue), toValue) : Math.max(Math.min(val, fromValue), toValue);
                    }
                }
            };
            // gets the item's height and top (relative to the document)
            this.getSize();
            // set the initial values
            this.update();
            // use the IntersectionObserver API to check when the element is inside the viewport
            // only then the element translation will be updated
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => this.isVisible = entry.intersectionRatio > 0);
            });
            this.observer.observe(this.DOM.el);
            // init/bind events
            this.initEvents();
        }
        update() {
            // gets the item's height and top (relative to the document)
            //            this.getSize();
            // sets the initial value (no interpolation)
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
            }
            // translate the image
            this.layout();
        }
        getSize() {
            const rect = this.DOM.el.getBoundingClientRect();
            this.props = {
                // item's height
                height: rect.height,
                // offset top relative to the document
                top: docScroll + rect.top
            }
        }
        initEvents() {
            window.addEventListener('resize', () => this.resize());
        }
        resize() {
            // gets the item's height and top (relative to the document)
            this.getSize();
            // on resize rest sizes and update the translation value
            this.update();
        }
        render() {
            // update the current and interpolated values
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
            }
            // and translates the image
            this.layout();
        }
        layout() {

            // translate the title
            this.DOM.title.style.transform = `translate3d(${(this.renderedStyles.titleTranslationX.previous)-(window.innerWidth/2)}px,0,0)`;

        }
    }


    class SmoothScroll {
        constructor() {
            // the <main> element
            this.DOM = {
                main: document.querySelector('main')
            };
            // the scrollable element
            // we translate this element when scrolling (y-axis)
            this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]');
            // the items on the page
            this.items = [];


               [...this.DOM.main.querySelectorAll('.main__content > section')].forEach(item => this.items.push(new Item2(item)));

            // here we define which property will change as we scroll the page
            // in this case we will be translating on the y-axis
            // we interpolate between the previous and current value to achieve the smooth scrolling effect
            this.renderedStyles = {
                translationY: {
                    // interpolated value
                    previous: 0,
                    // current value
                    current: 0,
                    // amount to interpolate
                    ease: 0.1,
                    // current value setter
                    // in this case the value of the translation will be the same like the document scroll
                    setValue: () => docScroll
                }
            };
            // set the body's height
            this.setSize();
            // set the initial values
            this.update();
            // the <main> element's style needs to be modified
            this.style();
            // init/bind events
            this.initEvents();
            // start the render loop
            requestAnimationFrame(() => this.render());
        }
        update() {
            // sets the initial value (no interpolation) - translate the scroll value
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].previous = this.renderedStyles[key].setValue();
            }
            // translate the scrollable element
            this.layout();
        }
        layout() {
            // translates the scrollable element
            this.DOM.scrollable.style.transform = `translate3d(0,${-1*this.renderedStyles.translationY.previous}px,0)`;
        }
        setSize() {
            // set the heigh of the body in order to keep the scrollbar on the page
            body.style.height = `${this.DOM.scrollable.scrollHeight}px`;
        }
        style() {
            // the <main> needs to "stick" to the screen and not scroll
            // for that we set it to position fixed and overflow hidden 
            this.DOM.main.style.position = 'fixed';
            this.DOM.main.style.width = this.DOM.main.style.height = '100%';
            this.DOM.main.style.top = this.DOM.main.style.left = 0;
            this.DOM.main.style.overflow = 'hidden';
        }
        initEvents() {
            // on resize reset the body's height
            window.addEventListener('resize', () => this.setSize());

            //                    document.querySelector('.client-name').addEventListener('click', () => this.setSize());

        }
        render() {
            // update the current and interpolated values
            for (const key in this.renderedStyles) {
                this.renderedStyles[key].current = this.renderedStyles[key].setValue();
                this.renderedStyles[key].previous = MathUtils.lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].ease);
            }
            // and translate the scrollable element
            this.layout();

            // for every item
            for (const item of this.items) {
                // if the item is inside the viewport call it's render function
                // this will update the item's inner image translation, based on the document scroll value and the item's position on the viewport
                if (item.isVisible) {
                    item.render();
                }
            }

            // loop..
            requestAnimationFrame(() => this.render());
        }
    }


    /***********************************/
    /********** Preload stuff **********/

    // Preload images


    const preloadProjectImages = () => {
        return new Promise((resolve, reject) => {
            imagesLoaded(document.querySelectorAll('.project__images img'), {
                background: true
            }, resolve);
        });
    };

    // And then..
    preloadProjectImages().then(() => {
        // Remove the loader
        document.body.classList.remove('loading');
        // Get the scroll position
        getPageYScroll();
        lastScroll = docScroll;
        // Initialize the Smooth Scrolling
        new SmoothScroll();


    });





    projects.forEach((project) => {
        project.addEventListener('click', function (e) {
            e.preventDefault();


            //            [].forEach.call(projects, function (project) {
            //                if (project !== this) {
            //                    project.getElementsByClassName("client-content").style.display = 'none';
            //                }
            //            });

            $('.client-content').html('');
            $('.client__close').fadeOut(100);

            var clientContent = this.parentElement.getElementsByClassName("client-content")[0];

            var new_position = $(this).offset();
            $('html, body').stop().animate({
                scrollTop: new_position.top
            }, 500);

            var url = this.getAttribute('href');
            getContent(url + ".json", clientContent);



            var closeProj = this.parentElement.querySelector(".client__close");

            $(closeProj).fadeIn(100);

            closeProj.addEventListener('click',
                function (e) {
                    e.preventDefault();

                    $(closeProj).fadeOut(100);
                    $(this).parent().children('.client-content').html('');
                    new SmoothScroll().initEvents();
                });


        });
    });

    archive.forEach((arch) => {
        arch.addEventListener('mouseenter', function (e) {
            e.preventDefault();
            $(arch).find('img').show();
        });
        arch.addEventListener('mouseleave', function (e) {
            e.preventDefault();
            $(arch).find('img').hide();
        });
    });

    function getContent(url, cc) {

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        xhr.onload = function () {
            if (this.status == 200) {
                cc.innerHTML = this.response;
                //console.log(this.response);
                xhr.addEventListener('loadend', checksize());




            }
        }

        function checksize() {
            preloadProjectImages().then(() => {
                new SmoothScroll().initEvents();
                $('.main-carousel').flickity({
                    // options
                    cellAlign: 'left',
                    contain: true,
                    wrapAround: true,
                    imagesLoaded: true,
                    percentPosition: false,
                    pageDots: false,
                    arrowShape: {
                        x0: 25,
                        x1: 65,
                        y1: 40,
                        x2: 70,
                        y2: 40,
                        x3: 30
                    }
                });
            });

        }

        xhr.send();
    }



    //
    //    function fade(element) {
    //        var op = 1; // initial opacity
    //        var timer = setInterval(function () {
    //            if (op <= 0.1) {
    //                clearInterval(timer);
    //                element.style.display = 'none';
    //            }
    //            element.style.opacity = op;
    //            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    //            op -= op * 0.1;
    //        }, 50);
    //    }
    //
    //    function unfade(element) {
    //        var op = 0.01; // initial opacity
    //        element.style.opacity = 0.01;
    //        element.style.display = 'flex';
    //        var timer = setInterval(function () {
    //            if (op >= 1) {
    //                clearInterval(timer);
    //            }
    //            element.style.opacity = op;
    //            element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    //            op += op * 0.1;
    //        }, 10);
    //    }

    // make it easier for yourself by not having to type as much to select an element
    function $qsa(el) {
        return document.querySelectorAll(el);
    }



});
