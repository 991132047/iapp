 angular.module('chats.ctrl', [])
.controller("chatsCtrl", ['$scope', '$state', 'Records',
    function($scope, $state, Records){
    $scope.classif = Records.get();
    $scope.data = [];
    // 记一笔
    $scope.J = function(){
        $state.go('tab.dash');
    };
    // 日常记账数据：
    $scope.info = {
        id: '',
        class: 0,
        subClass: 0,
        value: '0',
        date: Date.now()
    };
    // 取得本月所有记录数据
    $scope.list = function(){
        var md = new Date($scope.info.date * 1);
        $scope.data = Records.load(md.getFullYear(), md.getMonth() + 1);
        // console.log("list data:", $scope.data);
        $scope.tabstat();
    };
    // 监视刷新列表
    $scope.$watch("info.date", function(){
        // console.log("刷新数据...");
        $scope.list();
    });
    // 数据汇总统计
    $scope.sum = [0, 0, 0];
    $scope.tabstat = function(){
        $scope.sum = [0, 0, 0];
        for(var i = 0; i < $scope.data.length; i++){
            $scope.sum[$scope.data[i].class] += $scope.data[i].value * 1;
        }
        $scope.sum[2] = $scope.sum[1] - $scope.sum[0];
    };
    // 刷新数据
      $scope.down= function(){
        $scope.list();
        $scope.$broadcast("scroll.refreshComplete");
    }  
}])


