var test = 124;


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

$(document).ready(function () {
  $(".animsition").animsition({
    inClass: 'fade-in',
    outClass: 'fade-out',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link:not([href^=#]);',
    // e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    unSupportCss: [],
    //"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    //The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body'
  });
});




