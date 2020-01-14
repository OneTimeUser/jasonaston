(function ($) {
  'use strict';

  // delay element appearence
  var delayElement = function ($element, delay) {
    setTimeout(function () {
      $element.addClass('loaded');
    }, delay);
  };

  // delay page fadein
  var $body = $('body');
  delayElement($body, 150);

  // delay image div fadein
  var $images = $('div.image, .projects-feed .project');
  $.each($images, function (index, elem) {
    var $elem = $(elem);
    $elem.imagesLoaded(elem, function () {
      delayElement($elem, 250 * index);
    });
  });

  //open/close lateral navigation
  $('.cdnav').on('click', function (event) {
    event.preventDefault();
    $('body').toggleClass('navigation-is-open');
    $('cd-nav-close').toggle();
  });


})(jQuery);
