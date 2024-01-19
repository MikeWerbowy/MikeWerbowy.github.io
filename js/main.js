/* 

Vanilla Template

https://templatemo.com/tm-526-vanilla

*/

document.addEventListener('DOMContentLoaded', function() {
  const typedTextSpan = document.querySelector(".typed-text");
  const textArray = typedTextSpan.textContent.split(', ');
  let textArrayIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 100; // Milliseconds for typing
  let deletingDelay = 50; // Milliseconds for deleting
  let endPauseDelay = 1000; // Milliseconds to wait after finishing typing before deleting

  function type() {
      if (isDeleting) {
          if (charIndex > 0) {
              charIndex--;
              typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex);
              setTimeout(type, deletingDelay);
          } else {
              isDeleting = false;
              textArrayIndex++;
              if (textArrayIndex >= textArray.length) textArrayIndex = 0;
              setTimeout(type, typingDelay);
          }
      } else {
          if (charIndex < textArray[textArrayIndex].length) {
              charIndex++;
              typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex);
              setTimeout(type, typingDelay);
          } else {
              // Once the whole word is typed, pause before starting to delete
              isDeleting = true;
              setTimeout(type, endPauseDelay);
          }
      }
  }

  // Start the typing effect
  type();
});




jQuery(document).ready(function($) {

	'use strict';

    var top_header = $('.parallax-content');
    top_header.css({'background-position':'center center'}); // better use CSS

    $(window).scroll(function () {
    var st = $(this).scrollTop();
    top_header.css({'background-position':'center calc(50% + '+(st*.5)+'px)'});
    });


    $('body').scrollspy({ 
        target: '.fixed-side-navbar',
        offset: 200
    });
      
      // smoothscroll on sidenav click

    $('.tabgroup > div').hide();
        $('.tabgroup > div:first-of-type').show();
        $('.tabs a').click(function(e){
          e.preventDefault();
            var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('div').hide();
        $(target).show();
      
    })

    var owl = $("#owl-testimonials");

      owl.owlCarousel({
        
        pagination : true,
        paginationNumbers: false,
        autoPlay: 6000, //Set AutoPlay to 3 seconds
        items : 3, //10 items above 1000px browser width
        itemsDesktop : [1000,3], //5 items between 1000px and 901px
        itemsDesktopSmall : [900,2], // betweem 900px and 601px
        itemsTablet: [600,1], //2 items between 600 and 0
        itemsMobile : false // itemsMobile disabled - inherit from itemsTablet option
        
    });


});
