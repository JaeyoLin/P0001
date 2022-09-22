$(function() {
  // 預設英文
  $.i18n({
    locale: 'en_US'
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
});

/**
 * changeLang
 * 語系切換
 * 
 * @param {*} lang 
 */
function changeLang(lang) {
  $.i18n({
    locale: lang
  });
  $('body').i18n();
}