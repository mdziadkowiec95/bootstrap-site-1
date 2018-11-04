// navbar-toggler-icon customizing

var navbarToggler = document.querySelector('.navbar-toggler');

navbarToggler.addEventListener('click', function () {

  if (navbarToggler.nextElementSibling.classList.contains('collapsing')) {
    return false;
  } else {
    this.classList.toggle('js-active');
  }

});





// Scrool  




// Brands carousel slider settings
$ = jQuery;

$(document).ready(function () {


  // Hero slider touch funcionality

  var touchSensitivity = 5;
  $(".carousel").on("touchstart", function (event) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
      var xMove = event.originalEvent.touches[0].pageX;
      if (Math.floor(xClick - xMove) > touchSensitivity) {
        $(this).carousel('next');
      } else if (Math.floor(xClick - xMove) < -(touchSensitivity)) {
        $(this).carousel('prev');
      }
    });
    $(".carousel").on("touchend", function () {
      $(this).off("touchmove");
    });
  });


  // arrow down


  $('.js-arrow-down').on('click', function () {

    $('html, body').animate({
      scrollTop: ($('.why-us').offset().top)
    }, 500);

  });


  // brands slider options 
  // if (document.body.classList.contains('front-page')) {

  $('.brands__carousel').flickity({
    cellSelector: '.brands__item',
    wrapAround: true,
    pageDots: false,
    autoPlay: 2000,
    prevNextButtons: false,
    setGallerySize: false,
    cellAlign: 'left',
    imagesLoaded: true,
    draggable: false
  });

  // }

});





