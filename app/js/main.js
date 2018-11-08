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

  $('.btn--header').on('click', function () {

    $('html, body').animate({
      scrollTop: ($('.why-us').offset().top)
    }, 500);

  });


  // Front Page Waypoint

  if (document.body.classList.contains('front-page')) {

    var waypoint = new Waypoint({
      element: document.querySelector('.js-wp-1'),
      handler: function (direction) {
        const children = this.element.children;
        console.log(children);

        for (let i = 0; i < children.length; i++) {
          setTimeout(function () {
            children[i].className += ' is-visible';
            console.log(i);
          }, i * 700);
        }
      },
      offset: '50%'
    })

  }

  // Brands slider options - Flickity.

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
});


// OPTIONS scripts

$('.options__row').on('click', function () {
  $('.options__box, .options__box-more').toggleClass('show');
})

// const optionButtons = document.querySelectorAll('.btn--accordion');

// for (let i = 0; i < optionButtons.length; i++) {
//   optionButtons[i].addEventListener('click', function (e) {
//     const clickedBtn = e.target;
//     clickedBtn.nextElementSibling.classList.toggle('is-visible');
//   });
// }
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






