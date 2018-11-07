// navbar-toggler-icon customizing

const navbarToggler = document.querySelector('.navbar-toggler');

navbarToggler.addEventListener('click', function () {

  if (navbarToggler.nextElementSibling.classList.contains('collapsing')) {
    return false;
  } else {
    this.classList.toggle('js-active');
  }

});


/* ---- FRONT-PAGE scripts ---- */


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


  // arrow-down animation

  $('.js-arrow-down').on('click', function () {

    $('html, body').animate({
      scrollTop: ($('.why-us').offset().top)
    }, 500);

  });


  // brands slider options 
  if (document.body.classList.contains('front-page')) {

    document.body.onscroll = sectionFadeIn;

    function sectionFadeIn() {
      const whyUs = document.querySelector('.why-us');
      let whyUsOffset = whyUs.offsetTop;
      const header = document.querySelector('.header');
      let headerH = getComputedStyle(header).getPropertyValue('height');



      if (((whyUsOffset < window.innerHeight) && (pageYOffset > 50)) ||
        window.pageYOffset > (parseInt(headerH) * 0.6)) {

        whyUs.classList.remove('fade-out');

      }
    }


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
  }

});


// OPTIONS scripts

const $optionsButtons = $('.options__button');

$optionsButtons.on('click', function () {
  $(this).next().slideToggle(300);
});


/* ---- CONTACT-PAGE scripts ---- */

// Maps settings

var currentPageURL = window.location.pathname;
var currentPageName = currentPageURL.substring(currentPageURL.lastIndexOf('/') + 1);

if ((currentPageName === "kontakt.php") || (currentPageName === "kontakt.html")) {

  var map = L.map('map').setView([50.069638, 19.943788], 25);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([50.069638, 19.943788]).addTo(map)
    .bindPopup('Serwis <strong>carFix</strong>')
    .openPopup();

}






