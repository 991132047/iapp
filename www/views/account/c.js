  angular.module('account.ctrl', [])
.controller("accountCtrl", [
  '$scope', 'Records', '$interval',
     function($scope, Records, $interval){
        $scope.classif = Records.get();            
    // 今年收支汇总统计清单
    $scope.lists = function () {
      $scope.data = [];
      $scope.list = [0, 0, 0];
      $scope.records = Records.all();
      // console.log("所有收支数据：", $scope.records);

      // 初始化统计数组
      for (var i = 0; i < $scope.classif.length; i++) {
        $scope.data.push([]);
        for (var j = 0; j < $scope.classif[i].length; j++) {
          $scope.data[i].push({
            name: $scope.classif[i][j],
            y: 0
          });
        }
      }
      // 筛选今年
      var year = (new Date()).getFullYear();
      var dateStart = (new Date(year, 0, 1)).getTime();
      var dateEnd = Date.now();

      // 汇总统计
      for (i = 0; i < $scope.records.length; i++) {
        var d = $scope.records[i].date;
        if (d >= dateStart && d <= dateEnd) {
          var c = $scope.records[i].class;
          var s = $scope.records[i].subClass;
          var v = $scope.records[i].value;
          $scope.data[c][s].y += v;
          $scope.list[c] += v;
          $scope.list[2] += v * (c ? 1 : -1);
        }
      }
      // 排序：按金额降序
      $scope.data[1].sort(function (a, b) {
        return a.y < b.y;
      });
      $scope.data[0].sort(function (a, b) {
        return a.y < b.y;
      });
      // console.log("收支分类汇总统计数据：", $scope.data);
      //console.log("：", $scope.data[0]);
    };
    $scope.lists();
    $scope.refresh = false;
    // 饼图
    $scope.pieConfig = {
      title: {
        text: "支出分类汇总统计"
      },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        events: { // ----- 饼图事件
          load: function (event) { // ----- 加载数据模块
            var _data = this.series[0]; // 必须转换饼图数据对象为静态值才能够在事件中调用到！
            $interval(function () {
              if ($scope.refresh) { // 标志值 $scope.refresh 为真才刷新饼图
                for (var i = 0; i < $scope.data[0].length; i++) {
                  // 动态加入数据：highcharts .series .addPoint(数据, 重绘布尔值, 即时布尔值)
                  _data.addPoint({
                    name: $scope.data[0][i].name,
                    y: $scope.data[0][i].y
                  }, true, true);
                }
                $scope.refresh = false; // 完成刷新，标志恢复为假值，直到下次真值……
              }
            }, 1000);
          }
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: "支出分类",
        data: $scope.data[0]
      }],
    };
    // 刷新饼图
    $scope.onup = function () {
      $scope.lists(); // 取新的数据
      $scope.refresh = true; // 激活饼图刷新事件！
      $scope.$broadcast("scroll.refreshComplete");
    };
  }
]);