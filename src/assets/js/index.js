$( document ).ready(function() {
  console.log('Hello World');

  $('.slideImageWrapper').slick();

  // click language option
  $('.langOption').on('click', function(e) {
    console.log('Hello Worldfewf');
    let locale = $(this).attr('val');
    alert(locale);
  });
});

