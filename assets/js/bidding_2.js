(function ($) {
    'use strict';
  
    // Preloader
    $(window).on('load', function () {
      $('#preloader').fadeOut('slow', function () {
        $(this).remove();
      });
    });
  
    // Video Lightbox 
    $(document).on('click', '[data-toggle="lightbox"]', function (event) {
      event.preventDefault();
      $(this).ekkoLightbox();
    });

    $('.place-bid-button').on('click',function(){
      $("#complete-bid-form").removeClass("display-none");
      $('.place-bid-button').addClass("display-none");
    });

    $('#myModal').on('shown.bs.modal', function () {
      $('#myInput').trigger('focus')
    })
  
  })(jQuery);