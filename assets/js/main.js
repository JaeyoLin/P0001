$.fn.exists = function () {
  return this.length !== 0;
}

$(function() {
  // i18n 初始化
  i18nInit();

  // News 初始化
  newsInit();

  // Go to top 初始化
  goToTopInit();

  // Pie Chart 初始化
  pieChartInit();

  // Line Chart 初始化
  lineChartInit();

  // Login Validate Init
  loginValidateInit();

  // Register Validate Init
  registerValidateInit();

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

  // Validation Language
  $.extend($.validator.messages, VALIDATE_LANG[lang]);

  // Language menu init
  var langOptions = $('.langOption');
  if (langOptions !== undefined && langOptions !== null) {
    for (var i = 0; i < langOptions.length; i++) {
      var $tmpObject = $(langOptions[i]);
      $tmpObject.removeClass('active');
      
      if ($tmpObject.attr('value') === lang) {
        $tmpObject.addClass('active');
      }
    }
  }

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
    }, 500, 'easeInOutExpo');
    return false;
  });
}

/**
 * newsInit
 * News 初始化
 * 
 */
function newsInit() {
  openLoader('news_loader');

  setTimeout(() => {
    var tmpHtml = '';
    var responseData = [
      {
        date: '2022-09-06',
        title: '花旗環球證券 Pan-Asia Regional Investor Conference',
      },
      {
        date: '2022-04-26',
        title: '富邦證券線上投資人會議',
      },
      {
        date: '2022-03-17',
        title: '美銀證券 2022 Virtual APAC TMT Conference',
      },
    ];

    responseData.forEach(function(news) {
      tmpHtml = tmpHtml + '<div class="newsInfoWrapper">';
      tmpHtml = tmpHtml + '  <div class="fColorGray">';
      tmpHtml = tmpHtml + news.date;
      tmpHtml = tmpHtml + '  </div>';
      tmpHtml = tmpHtml + '  <div>';
      tmpHtml = tmpHtml + news.title;
      tmpHtml = tmpHtml + '  </div>';
      tmpHtml = tmpHtml + '</div>';
    });

    $('#news_list').html(tmpHtml);

    closeLoader('news_loader');
    $('#news_container').show();
  }, 2000);
}

/**
 * pieChartInit
 * Pie Chart 初始化
 * 
 */
function pieChartInit() {
  openLoader('pieChart_loader');

  // 假裝呼叫 API 延遲，到時候依照 API 再改成 AJAX
  setTimeout(() => {
    const ctx = document.getElementById('pieChart');
    const data = {
      datasets: [
        {
          data: [10, 20, 15, 5, 50],
          backgroundColor: [ 'rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', ],
          radius: '80%',
        },
      ],
    };

    if (ctx !== undefined && ctx !== null) {
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

    closeLoader('pieChart_loader');
    $('#pieChart_container').show();
  }, 2000);
}

/**
 * LineChartInit
 * Line Chart 初始化
 * 
 */
 function lineChartInit() {
  const ctx = document.getElementById('myLineChart');

  if (ctx !== undefined && ctx !== null) {
    const lineChart = new Chart(ctx, {
      type: 'line',
      data: LINE_CHART_DATA,
      plugins: [{
        beforeInit: function(chart, options) {
          // before render char: 轉換數據為成長%數
          const charConfigData = chart.config.data;
          console.log(chart.config);
          for (var i = 0; i < charConfigData.datasets.length; i++) {
            const oriDataArr = charConfigData.datasets[i].oriData; // 原始數據
            const baseVal = charConfigData.datasets[i].oriData[0];  // 第一筆為基底
            for (var j = 0; j < charConfigData.labels.length; j++) {
              const curDataVal = oriDataArr[j];
              const growPercentage = (curDataVal - baseVal) / baseVal * 100;
              charConfigData.datasets[i].data[j] = growPercentage; // rewrite Data
            }
          }
        }
      }],
      options: {
        interaction: {
          mode: 'index'
        },
        plugins: {
          responsive: true,
          tooltip: {
            callbacks: {
                label: function(context) {
                    // 客製 tooltip 顯示
                    let label = context.dataset.label + ": ";
                    const percentage = context.parsed.y;
                    const realVal = context.dataset.oriData[context.dataIndex];
                    label += percentage.toFixed(2) + "%" + " (" + realVal + ")";
                    return label;
                }
            }
          }
        }
      }
    });
  }
}

/**
 * Draggable content initial
 */
function initDragContent() {
  var $drapList =  $("#achievementDragList");
  $drapList.draggable({ disabled: false });
  // check width
  if (screen.width < 600 || window.innerWidth < 600) {
    // did not support draggable
     $drapList.parent().css({ 'width': '100%', left: 0 });
     $drapList.css({ 'width': '100%', 'left': 0 });
     $drapList.draggable({ disabled: true });
    return;
  }
  var minSreenWidth = Math.min(screen.width, window.innerWidth);
  var padding = 40;
  minSreenWidth = minSreenWidth > 960 ? 960 : minSreenWidth - (padding * 2);
  // draggable
  var length =  $drapList.children('li').length;
  var singleWidth =  $drapList.children('li').outerWidth();
  var distance = length * singleWidth - minSreenWidth - padding;
  $drapList.parent().css({ 'width': length * singleWidth * 2 - minSreenWidth, left: -distance });
  $drapList.draggable({
    axis: "x",
    containment: "parent",
    start: function () {
      $drapList.addClass('grabbing');
    },
    drag: function (event, ui) {
      $drapList.addClass('grabbing');
      var offset = ($drapList.css('left').slice(0, -2) - distance) / distance * 0.1;
      $('#horizontalScrollBg').css('left', offset * 100 + '%');
    },
    stop: function (event, ui) {
        $drapList.removeClass('grabbing');
    }
  });
  $drapList.css({ 'width': length * singleWidth , 'left': distance });
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
      // form.submit();
      window.location.href = "./admin/lottery.html";
    }
  };

  var validator = $("#loginForm").validate(config);

  $("#btn_signin").click(function() {
    $('#account').val(null);
    $('#password').val(null);
    
    validator.resetForm();
    $(".error").removeClass("error");
  });
}

/**
 * registerValidateInit
 * Register Validate Init
 * 
 */
 function registerValidateInit() {
  var config = {
    // lang: 'vi',
    rules: {
      account: "required",
      password: {
        required: true,
        minlength: 8
      },
      confirm_password: {
        required: true,
        minlength: 8,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      mobile_phone: {
        required: true
        // required: true,
        // number: true
      },
      invitation_code: "required"
    },
    // messages: {
    //   mobile_phone: {
    //     number: $.i18n('browser_recommendation'),
    //   }
    // },
    submitHandler: function(form){
      // form.submit();
      console.log('TODO', 'Register');
    }
  };
  
  if ($("#registerForm").exists()) {
    var validator = $("#registerForm").validate(config);

    $("#btn_register").click(function() {
      $('#account').val(null);
      $('#password').val(null);
      $('#confirm_password').val(null);
      $('#email').val(null);
      $('#mobile_phone').val(null);
      $('#invitation_code').val(null);
      
      validator.resetForm();
      $(".error").removeClass("error");
    });
  }
}

/**
 * openLoader
 * 開啟 loader
 * 
 * @param {string} elementId HTML element id
 */
function openLoader(elementId) {
  $('#' + elementId).show();
  $('#' + elementId).scheletrone();
}

/**
 * closeLoader
 * 關閉 loader
 * 
 * @param {string} elementId HTML element id
 */
function closeLoader(elementId) {
  $('#' + elementId).hide();
}
