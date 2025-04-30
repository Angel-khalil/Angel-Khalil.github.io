$(document).ready(function() {
    $('.thumb').click(function() {
      const newSrc = $(this).attr('src');
      const newCaption = $(this).data('caption');
      $('#mainImage').attr('src', newSrc);
      $('#caption').text(newCaption);
    });
  });
  