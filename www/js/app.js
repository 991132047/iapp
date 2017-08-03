angular.module('podapp', [ /*starter*/
    'ionic',
    'ionic-datepicker',
    'highcharts-ng', 
    'app.services',
    'dash.ctrl',
    'chats.ctrl',
    'account.ctrl',
  ])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($stateProvider, $urlRouterProvider,ionicDatePickerProvider) {
    $stateProvider
      .state('tab', { //根节点
        url: '/tab', //url = #/tab
        abstract: true, //引导页，必需  不写默认加载子页面第一个页面  写了等子页面加载后显示自身
        templateUrl: 'views/tabs.html'
      })
      .state('tab.dash', { //子节点名称
        url: '/dash', //  url = #/tab/dash  可以和子节点名称不相同
        views: {
          'tab-dash': { // name:锚点
            templateUrl: 'views/dash/p.html',
            controller: 'dashCtrl'
          }
        }
      })

      .state('tab.chats', {
        url: '/chats',
        views: {
          'tab-chats': {
            templateUrl: 'views/chats/p.html',
            controller: 'chatsCtrl'
          }
        }
      })
      .state('tab.account', {
        url: '/account',
        views: {
          'tab-account': {
            templateUrl: 'views/account/p.html',
            controller: 'accountCtrl'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash'); //默认只写地址栏显示的第一个页面

    var datePickerObj = {
      setLabel: '确定',
      todayLabel: '今天',
      closeLabel: '关闭',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList: ["日", "一", "二", "三", "四", "五", "六"],
      monthsList: [
        "1月", "2月", "3月", "4月", "5月", "6月",
        "7月", "8月", "9月", "10月", "11月", "12月"
      ],
      templateType: 'popup',
      showTodayButton: true, // false
      dateFormat: 'yyyy-MM-dd',
      closeOnSelect: false,
      disableWeekdays: [],
      from: new Date(2016, 0, 1)
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  // ionic tabs 使得在安卓状态下 tabshtml 在底部显示
.config(['$ionicConfigProvider',function($ionicConfigProvider) {

$ionicConfigProvider.tabs.position('bottom');// other values: top

}]);
