$(function() {
  // i18n 初始化
  i18nInit();

  // Go to top 初始化
  goToTopInit();

  $('.slideImageWrapper').slick({
    dots: false,
    infinite: true,
    speed: 500,
    // fade: true,
    cssEase: 'linear',
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  
  // draggable bk
  $('div.draggableBK').backgroundDraggable();
});

/**
 * i18nInit
 * i18n 初始化
 * 
 */
function i18nInit() {
  var lang = localStorage.getItem(I18N_LANG_KEY);
  
  // 預設英文
  if (lang === undefined || lang === null) {
    lang = 'en_US';
  }

  $.i18n({
    locale: lang,
  });

  // 讀取語系檔
  $.i18n().load({
    'en_US': './i18n/en_US.json',
    'zh_TW': './i18n/zh_TW.json',
    'zh_CN': './i18n/zh_CN.json'
  }).done(function (){

    // 語系初始化
    $('body').i18n();
  });
  
  // click language option
  $('.langOption').on('click', function(e) {
    let locale = $(this).attr('value');
    $('.langOption').removeClass('active');
    $(this).addClass('active');
    
    localStorage.setItem(I18N_LANG_KEY, locale);

    $.i18n({
      locale: locale
    });
    $('body').i18n();
  });
}

/**
 * goToTopInit
 * Go to top 初始化
 * 
 */
function goToTopInit() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });
}