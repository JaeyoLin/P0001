// 追號
var ADD_SEETING_DATA = null;

$(function() {
  mobileSelectInit();

  getData();

  initCountDown();
});

/**
 * mobileSelectInit
 * 
 * 
 */
function mobileSelectInit() {
  const buttonArr = [ '1', '2', '3', '4', '5', '10', '15', '20', '25', '30' ];

  new MobileSelect({
    trigger: document.querySelector("#add_setting_select"),
    wheels: [{ data: buttonArr }],
    initValue: ADD_SEETING_DATA,
    ensureBtnText: '確認',
    cancelBtnText: '取消',
    // onTransitionEnd: function (data, indexArr, msInstance) {
    // },
    onChange: function (data, indexArr, msInstance) {
      console.log(data);
    },
  });
}

/**
 * getData
 * 模擬取得後端假資料
 * 
 */
function getData() {
  const data = [
    {
      number: '0000000001',
      unit: '111',
    },
    {
      number: '0000000002',
      unit: '222',
    },
    {
      number: '0000000003',
      unit: '333',
    },
    {
      number: '0000000004',
      unit: '444',
    },
    {
      number: '0000000005',
      unit: '555',
    },
    {
      number: '0000000006',
      unit: '666',
    },
    {
      number: '0000000007',
      unit: '777',
    },
    {
      number: '0000000008',
      unit: '888',
    },
  ];

  var tmpHtml = '';

  for (var i = 0; i < data.length; i++) {
    tmpHtml = tmpHtml + '<div class="table_row">';
    tmpHtml = tmpHtml + '  <div class="column_number table_row_color">';
    tmpHtml = tmpHtml + data[i].number;
    tmpHtml = tmpHtml + '  </div>';
    tmpHtml = tmpHtml + '  <div class="column_time table_row_color"><span name="count_down">--</span></div>';
    tmpHtml = tmpHtml + '  <div class="column_unit table_row_color">';
    tmpHtml = tmpHtml + data[i].unit;
    tmpHtml = tmpHtml + '  </div>';
    tmpHtml = tmpHtml + '  <div class="column_action table_row_color">';
    tmpHtml = tmpHtml + '    <button class="cancel_button">取消</button>';
    tmpHtml = tmpHtml + '  </div>';
    tmpHtml = tmpHtml + '</div>';

  }

  $('#data_row').html(tmpHtml);
}

/**
 * initCountDown
 * 
 */
function initCountDown() {
  // 倒數三分鐘 60 X 3
  var countDown = 180;
  var timer = $("[name='count_down']");
  
  setInterval(function() {
    
  countDown = countDown - 1;
    if (countDown <= 0 ) {
      countDown = 0;
    }
    timer.text(countDown);
  }, 1000);  
}