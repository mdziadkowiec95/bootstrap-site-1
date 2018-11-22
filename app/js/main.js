// navbar-toggler-icon customizing

var navbar = document.querySelector('.navbar');
var navbarLogo = document.querySelector('.navbar-brand__image');

window.addEventListener('scroll', function (e) {
  if (window.pageYOffset !== 0) {

    navbar.classList.add('js-fixed-top');

  } else {

    navbar.classList.remove('js-fixed-top');

  }
})


var navbarToggler = document.querySelector('.navbar-toggler');

navbarToggler.addEventListener('click', function () {

  if (navbarToggler.nextElementSibling.classList.contains('collapsing')) {
    return false;
  } else {
    console.log(navbarToggler);
    navbarToggler.classList.toggle('js-open');
    navbar.classList.toggle('js-open');
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


  // Front Page Waypoints

  if (document.body.classList.contains('front-page')) {

    var waypoint_why_us = new Waypoint({
      element: document.querySelector('.js-wp-1'),
      handler: function (direction) {
        var children = this.element.children;
        console.log(children);

        for (let i = 0; i < children.length; i++) {
          setTimeout(function () {
            children[i].className = 'why-us__box is-visible';
            console.log(i);
            console.log(children[i].className);
          }, i * 700);
        }
      },
      offset: '50%'
    });

    var waypoint_about_us = new Waypoint({
      element: document.querySelector('.js-wp-2'),
      handler: function (direction) {
        this.element.classList.add('js-show');
        document.querySelector('.about-us__image').classList.add('js-show');
      },
      offset: '70%'
    })



    var waypoint_counters = new Waypoint({
      element: document.querySelector('.js-wp-3'),
      handler: function (direction) {

        this.element.classList.add('js-show');
        this.element.classList.remove('js-wp-3');

        var options = {
          useEasing: true,
          useGrouping: true,
          separator: ',',
          decimal: '.',
        };

        var counters = {
          counter_1: new CountUp('js-counter-1', 0, 21, 0, 2, options),
          counter_2: new CountUp('js-counter-2', 0, 34, 0, 3, options),
          counter_3: new CountUp('js-counter-3', 0, 17234, 0, 4, options),
          counter_4: new CountUp('js-counter-4', 0, 61242, 0, 5, options)
        }

        var notStarted = true;

        for (var counter in counters) {
          if (!counter.error && notStarted) {
            counters[counter].start(function () {
              waypoint_counters.destroy();
            });
          } else {
            console.error(counters[counter]);
          }
        }


      },
      offset: '70%'
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


// OPTIONS script


// $('.options__row').on('click', function () {
//   $('.options__box, .options__box-more').toggleClass('show');
// })

// var optionButtons = document.querySelectorAll('.btn--accordion');

// for (let i = 0; i < optionButtons.length; i++) {
//   optionButtons[i].addEventListener('click', function (e) {
//     var clickedBtn = e.target;
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






