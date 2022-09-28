var area_a_539 = null;
var area_b_539 = null;
var area_c_539 = null;

var AREA_TYPE = {
  A: 'A',
  B: 'B',
  C: 'C',
  ALL: 'ALL',
};

$(function() {
  clearSelectBalls(AREA_TYPE.ALL);
  setSelectedBallStatus();
  
  // 點擊 Balls 的事件初始化
  clickBallsInit();

  // 清空 Balls 事件初始化
  clearBallsInit();
});

/**
 * clearSelectBalls
 * 
 * @param {string} areaType A, B, C, All 區塊
 */
function clearSelectBalls(areaType) {
  switch (areaType) {
    case AREA_TYPE.A:
      area_a_539 = [];
      break;
    case AREA_TYPE.B:
      area_b_539 = [];
      break;
    case AREA_TYPE.C:
      area_c_539 = [];
      break;
    case AREA_TYPE.ALL:
      area_a_539 = [];
      area_b_539 = [];
      area_c_539 = [];
      break;
  }
}

/**
 * clickBallsInit
 * 點擊 Balls 的事件初始化
 * 
 */
function clickBallsInit() {

  // A 區塊點擊 Balls 的事件
  $('div#area_a .ball').on('click', function(e) {
    var tmpValue = null;
    tmpValue = $(this).find('span').text();

    if (tmpValue !== undefined && tmpValue !== null) {
      const isExist = area_a_539.find(element => element === tmpValue);

      if (isExist) {
        $(this).removeClass('active');
        area_a_539 = area_a_539.filter(element => element !== tmpValue)
      } else {
        $(this).addClass('active');
        area_a_539.push(tmpValue);
      }
    }
    area_a_539.sort();
    setSelectedBallStatus();
  });

  // B 區塊點擊 Balls 的事件
  $('div#area_b .ball').on('click', function(e) {
    var tmpValue = null;
    tmpValue = $(this).find('span').text();

    if (tmpValue !== undefined && tmpValue !== null) {
      const isExist = area_b_539.find(element => element === tmpValue);

      if (isExist) {
        $(this).removeClass('active');
        area_b_539 = area_b_539.filter(element => element !== tmpValue)
      } else {
        $(this).addClass('active');
        area_b_539.push(tmpValue);
      }
    }
    area_b_539.sort();
    setSelectedBallStatus();
  });

  // C 區塊點擊 Balls 的事件
  $('div#area_c .ball').on('click', function(e) {
    var tmpValue = null;
    tmpValue = $(this).find('span').text();

    if (tmpValue !== undefined && tmpValue !== null) {
      const isExist = area_c_539.find(element => element === tmpValue);

      if (isExist) {
        $(this).removeClass('active');
        area_c_539 = area_c_539.filter(element => element !== tmpValue)
      } else {
        $(this).addClass('active');
        area_c_539.push(tmpValue);
      }
    }
    area_c_539.sort();
    setSelectedBallStatus();
  });
}

/**
 * 清空 Balls 事件初始化
 * clearBallsInit
 * 
 */
function clearBallsInit() {
  
  // A 區塊點擊 Clear Balls 的事件
  $('#btn_clear_a').on('click', function(e) {
    clearSelectBalls(AREA_TYPE.A);
    setSelectedBallStatus();

    $('div#area_a .ball').removeClass('active');
  });

  // B 區塊點擊 Clear Balls 的事件
  $('#btn_clear_b').on('click', function(e) {
    clearSelectBalls(AREA_TYPE.B);
    setSelectedBallStatus();

    $('div#area_b .ball').removeClass('active');
  });

  // C 區塊點擊 Clear Balls 的事件
  $('#btn_clear_c').on('click', function(e) {
    clearSelectBalls(AREA_TYPE.C);
    setSelectedBallStatus();

    $('div#area_c .ball').removeClass('active');
  });
}

/**
 * countSelectedBalls
 * 取得目前已選擇的球數
 * 
 * @returns 
 */
function countSelectedBalls() {
  return area_a_539.length + area_b_539.length + area_c_539.length;
}

/**
 * setSelectedBallStatus
 * 
 */
function setSelectedBallStatus() {
  var tmpCount = countSelectedBalls();
  $('#span_count').text(tmpCount);

  if (tmpCount < 1 || tmpCount > 39) {
    $('#btn_submit').prop('disabled', true);
  } else {
    $('#btn_submit').prop('disabled', false);
  }
}

/**
 * handleSubmit
 * 
 */
function handleSubmit() {
  console.log('TODO');
  console.log('A Area: ', area_a_539);
  console.log('B Area: ', area_b_539);
  console.log('C Area: ', area_c_539);
}

/**
 * handleEdit
 * 
 */
function handleEdit() {
  console.log('TODO', 'handleEdit');
}

/**
 * handleHistoryEdit
 * 
 */
function handleHistoryEdit() {
  console.log('TODO', 'handleHistoryEdit');
}

/**
 * handleCurrentEdit
 * 
 */
function handleCurrentEdit() {
  console.log('TODO', 'handleCurrentEdit');
}