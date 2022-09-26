$(function() {
  // i18n 初始化
  i18nInit();

  // Go to top 初始化
  goToTopInit();

  // Pie Chart 初始化
  pieChartInit();

  // Login Validate Init
  loginValidateInit();

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

  
  // draggable bk/content, when mobile size: did not support draggable
  initDragContent();
  window.addEventListener('resize', initDragContent);
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
    'vi_VN': './i18n/vi_VN.json'
  }).done(function (){

    // 語系初始化
    $('body').i18n();
  });

  $.extend($.validator.messages, VALIDATE_LANG[lang]);

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

    $.extend($.validator.messages, VALIDATE_LANG[locale]);
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

/**
 * pieChartInit
 * Pie Chart 初始化
 * 
 */
function pieChartInit() {
  const ctx = document.getElementById('myChart');
  const data = {
    datasets: [
      {
        data: [10, 20, 15, 5, 50],
        backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', ],
        radius: '80%',
      },
    ],
  };
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          formatter: (value) => {
            return value + '%';
          },
          anchor: 'end',
          align: 'end',
        }
      }
    }
  });
}

/**
 * Draggable content initial
 */
function initDragContent() {
  var $drapList =  $("#achievementDragList");
  var $wrap = $(".achievementWrapper");
  $drapList.draggable({ disabled: false });
  // check width
  if (screen.width < 600 || window.innerWidth < 600) {
    // did not support draggable
     $drapList.parent().css({ 'width': '100%', left: 0 });
     $drapList.css({ 'width': '100%', 'left': 0 });
     $drapList.draggable({ disabled: true });
    return;
  }
  // draggable
  var length =  $drapList.children('li').length;
  var singleWidth =  $drapList.children('li').outerWidth();
  var distance = length * singleWidth - $wrap.width();
   $drapList.parent().css({ 'width': length * singleWidth * 2 - 960, left: -distance });
   $drapList.draggable(
    {
      axis: "x",
      containment: "parent",
      start: function () {
         $drapList.addClass('grabbing');
      },
      drag: function () {
         $drapList.addClass('grabbing');
        var offset = ($drapList.css('left').slice(0, -2) - distance) / distance * 0.1;
        $('#horizontalScrollBg').css('left', offset * 100 + '%');
      },
      stop: function () {
         $drapList.removeClass('grabbing');
      }
    }
  ).css({ 'width': length * singleWidth, 'left': distance });
}

/**
 * loginValidateInit
 * Login Validate Init
 * 
 */
function loginValidateInit() {
  var config = {
    // lang: 'vi',
    rules: {
      account: "required",
      password: "required",
    },
    submitHandler:function(form){
      alert("提交事件!");   
      form.submit();
    }
  };

  var validator = $("#loginForm").validate(config);

  $("#btn_signin").click(function() {
    $('#account').val(null);
    $('#password').val(null);
    
    validator.resetForm();
    $(".error").removeClass("error");
  });

  // click language option
  // $('.langOption').on('click', function(e) {
  //   var locale = $(this).attr('value');
  //   $.extend($.validator.messages, VALIDATE_LANG[locale]);
  // });
}