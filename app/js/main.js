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



// Checking if user uses mobile browser


(function () {
  var check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);

  if (check) {
    var carouselItems = document.querySelectorAll('.carousel-item');

    for (var i = 0; i < carouselItems.length; i++) {
      carouselItems[i].style.backgroundAttachment = 'scroll';
    }
  }
})()









