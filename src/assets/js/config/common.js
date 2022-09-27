var I18N_LANG_KEY = 'i18n_lang_key';

// chart data
var LINE_CHART_DATA = {
    labels: ["09-19", "09-20", "09-21", "09-22", "09-23", "09-24", "09-25"],  // x axis Date
    datasets: [
      {
        label: 'DATA-1',
        data: [],
        oriData: [48.6, 49.51, 51.28, 53.2, 47.62, 54.13, 52.94],
        borderColor: '#4bc0c0',
        tension: 0.1
      },
      {
        label: 'DATA-2',
        data: [],
        oriData: [99.12, 102.85, 100.33, 103.65, 102.42, 100.77, 99.54],
        borderColor: '#2196f3',
        tension: 0.1,
        hidden: true, // 預設要不要顯示
      },
    ]
  }