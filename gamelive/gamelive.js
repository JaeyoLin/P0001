// 追號
var ADD_SEETING_DATA = null;

$(function() {
  mobileSelectInit();
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
    onTransitionEnd: function (data, indexArr, msInstance) {
    },
    onChange: function (data, indexArr, msInstance) {
      console.log(data);
    },
  });
}