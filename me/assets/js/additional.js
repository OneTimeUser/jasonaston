$(document).ready(function () {



    // function extruding(){
    //     $(".site-title a").toggleClass("extruder");
    //     //$(".cd-nav-trigger").toggleClass("extruder"); 
    //     //if mobile....extriding
    //   if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    //     $(".thumbnail-title").toggleClass("extruder");
    //   }

    var myLazyLoad = new LazyLoad();

    //  function newTitleHeight(){
    //    var $fluidHeight = $('.site-title a');
    //    var titleHeight = $fluidHeight.height();
    //  
    //
    //    $('.site-title').css( "margin-bottom", titleHeight);
    //
    //  }
    //  
    //  
    //  newTitleHeight();


    // $('.cd-nav-trigger').on('click', function (event) {
    //   
    //   $(this).html() == "X" ? $(this).html('STUFF') : $(this).html('X');});
    //hover effect  but need to modify to make it look popping out!

    //  if( navigator.userAgent.match(/Android/i)  
    //  || navigator.userAgent.match(/iPhone/i)  
    //  || navigator.userAgent.match(/iPad/i)  
    //  || navigator.userAgent.match(/iPod/i)  
    //  || navigator.userAgent.match(/BlackBerry/i)  
    //  || navigator.userAgent.match(/webOS/i)) {  
    //   $( ".thumbnail-title" ).addClass( "extruder" );
    // } else {

    $(".project").hover(function () {
        $(this).find(".thumbnail-title").css("background-position", "100% 50%");
        $(this).find(".thumb img")
            .css("filter", "url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale')")
            .css("filter", "gray")
            .css("webkit-filter", "grayscale(100%)")
            .css("webkit-transition", "all .9s ease")
            .css("webkit-backface-visibility", "hidden");


    }, function () {
        $(this).find(".thumbnail-title").css("background-position", "0% 0%");
        $(this).find(".thumb img")
            .css("filter", "none")
            .css("webkit-filter", "grayscale(0%)");
    });

    $('.txt p').html(function (i, html) {
        var chars = $.trim(html).split("");

        return '<span>' + chars.join('</span><span>') + '</span>';
    });

    // Find all YouTube videos
    var $allVideos = $("iframe[src^='https://www.youtube.com']"),

        // The element that is fluid width
        $fluidEl = $("body");

    // Figure out and save aspect ratio for each video
    $allVideos.each(function () {

        $(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width')
            .prependTo('.project-assets');

    });

    // When the window is resized
    $(window).resize(function () {
        //newTitleHeight();
        var newWidth = $fluidEl.width();

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function () {

            var $el = $(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();

    //    $(function () {
    //        $('.site-title').data('size', 'big');
    //        $('.cd-nav-trigger').data('size', 'big');
    //
    //
    //    });

    //    $(window).scroll(function () {
    //        var headerHeight = $('header').height();
    //        if ($(window).width() > 600) {
    //            if ($(document).scrollTop() > headerHeight) {
    //                if ($('.site-title').data('size') == 'big') {
    //                    $('.site-title').data('size', 'small');
    //                    $('.cd-nav-trigger').data('size', 'small');
    //
    //                    $('.site-title').stop().animate({
    //                        fontSize: '2em'
    //                    }, 600);
    //                    $('.cd-nav-trigger').stop().animate({
    //                        fontSize: '2em'
    //                    }, 600);
    //
    //
    //                }
    //            } else {
    //                if ($('.site-title').data('size') == 'small') {
    //                    $('.site-title').data('size', 'big');
    //                    $('.site-title').stop().animate({
    //                        fontSize: '5vw'
    //                    }, 600);
    //                    $('.cd-nav-trigger').data('size', 'big');
    //                    $('.cd-nav-trigger').stop().animate({
    //                        fontSize: '5vw'
    //                    }, 600);
    //                }
    //            }
    //        }
    //    });

    // // delay element appearence
    // var delayElement = function ($element, delay) {
    //   setTimeout(function () {
    //     $element.addClass('loaded');
    //   }, delay);
    // };

    // // delay page fadein
    // var $body = $('body');
    // delayElement($body, 150);

    // // delay image div fadein
    // var $images = $('div.image, .projects-feed .project');
    // $.each($images, function (index, elem) {
    //   var $elem = $(elem);
    //   $elem.imagesLoaded(elem, function () {
    //     delayElement($elem, 250 * index);
    //   });
    // });

    // // open/close lateral navigation
    // $('.cd-nav-trigger').on('click', function (event) {
    //   event.preventDefault();
    //   $('body').toggleClass('navigation-is-open');
    // });


});
