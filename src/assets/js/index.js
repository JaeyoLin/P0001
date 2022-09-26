$(function() {
  // i18n 初始化
  i18nInit();

  // Go to top 初始化
  goToTopInit();

  // Pie Chart 初始化
  pieChartInit();

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

  
  // draggable bk/content
  dragContentInit();
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
function dragContentInit() {
  var length = $("#achievementDragList").children('li').length;
  var singleWidth = $("#achievementDragList").children('li').outerWidth();
  var distance = length * singleWidth - $(".achievementWrapper").width();
  $("#achievementDragList").parent().css({ 'width': length * singleWidth * 2 - 960, left: -distance });
  $("#achievementDragList").draggable(
    {
      axis: "x",
      containment: "parent",
      start: function () {
        $("#achievementDragList").addClass('grabbing');
      },
      drag: function () {
        $("#achievementDragList").addClass('grabbing');
        var offset = ($('#achievementDragList').css('left').slice(0, -2) - distance) / distance * 0.1;
        $('#horizontalScrollBg').css('left', offset * 100 + '%');
      },
      stop: function () {
        $("#achievementDragList").removeClass('grabbing');
      }
    }
  ).css({ 'width': length * singleWidth, 'left': distance });
}