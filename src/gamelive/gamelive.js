// 追號
var ADD_SEETING_DATA = null;

$(function() {
  mobileSelectInit();

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