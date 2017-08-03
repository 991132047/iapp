angular.module("app.services", [])
  .factory("Records", function () {
    var classif = [
      ["餐饮伙食", "出行交通", "休闲娱乐", "话费网费", "生活日用", "服装饰品", "电器家私", "教育培训", "育儿养老", "医疗保健", "红包礼金", "房租按揭", "善款彩票", "保险投资", "其它支出"],
      ["工资收入", "投资收入", "礼金收入", "其它收入"]
    ];
    var data = [];
    var key = "__DJJZ__";
    // 载入全部数据
    var loadData = function () {
      var rd = localStorage[key];
      if (typeof rd === 'undefined' || !angular.isString(rd) || rd === 'undefined' || rd.length < 2) {
        data = [];
      } else {
        data = angular.fromJson(rd);
      }
    };
    // 保存全部数据
    var saveData = function () {
      localStorage[key] = angular.toJson(data);
    };
    // 取得id对应数据的下标值
    var getIndex = function (id) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id == id) {
          return i;
        }
      }
      return -1;
    };
    // 载入数据: 取得指定年份和月份的所有记录
    var load = function (year, month) {
      loadData();
      var arr = [];
      var ts = (new Date(year, month - 1, 1)).getTime(); 
      var te = (new Date(year, month, 0)).getTime(); 
      for (var i = 0; i < data.length; i++) {
        // 在开始和结束日期之间
        if (data[i].date >= ts && data[i].date <= te) {
          arr.push(data[i]);
        }
      }
      return arr;
    };
    // 保存数据: 新增或更新
    var save = function (arr) {
      if (angular.isObject(arr)) {
        loadData();
        var index =
          (typeof arr.id === 'undefined' || arr.id == '') ?
          -1 : getIndex(arr.id);
        if (index > -1) {
          // 更新数据
          data[index].class = arr.class * 1;
          data[index].subClass = arr.subClass * 1;
          data[index].value = arr.value * 1;
          data[index].date = Date.now();
        } else {
          // 添加数据
          data.push({
            id: Date.now() + '' + Math.round(Math.random() * 899 + 100),
            class: arr.class * 1,
            subClass: arr.subClass * 1,
            value: arr.value * 1,
            date: arr.date
          });
        }
        saveData();
      }
    };
    var remove = function (id) {
    };
    return {
      get: function () {
        return classif;
      },
      all: function () {
        loadData();
        return data;
      },
      load: load,
      save: save,
      remove: remove,
      rand: function (n) {
        data = [];
        var values = [
          [
            [5, 50], // "餐饮伙食"
            [2, 30], // "出行交通"
            [50, 200], // "休闲娱乐"
            [50, 100], // "话费网费"
            [20, 150], // "生活日用"
            [100, 400], // "服装饰品" 
            [100, 1200], // "电器家私"
            [600, 3000], // "教育培训"
            [500, 2000], // "育儿养老"
            [200, 1000], // "医疗保健"
            [20, 200], // "红包礼金"
            [1500, 2200], // "房租按揭"
            [2, 50], // "善款彩票"
            [300, 3000], // "保险投资"
            [1, 100] // "其它支出"
          ],
           [
            [16000, 18000], // "工资收入"
            [1200, 5000], // "投资收入"
            [200, 600], // "礼金收入"
            [50, 300] // "其它收入"
          ]
        ];
        var chance = [];
        // 产生随机数据
        var year = n || 2017; // 开始年份, 默认2017
        var t = new Date();
        var dateStart = (new Date(year, 0, 1)).getTime(); // 开始: 年份1月1日
        var dateToday = (new Date(t.getFullYear(), t.getMonth(), t.getDate() + 1)).getTime(); // 结束：明天0点前
        var p = 1000 * 60 * 60 * (24 / 8.51); // 每日 8.51 数据项
        for (i = dateStart; i < dateToday; i += p) {
          var r = rnd(0, chance.length); // 随机收支类别
          k = values[chance[r][0]][chance[r][1]]; // 分类金额区间
          data.push({
            id: i, // + '' + rnd(0, 10000), // 时间序列值 + 随机字符, 尽量避免产生重复的 id
            class: chance[r][0], // 主类
            subClass: chance[r][1], // 子类
            value: rnd(k[0], k[1]), // 随机金额：在金额区间内取随机值
            date: i
          });
        }
        // 保存!
        saveData();
      }
    };
  });
