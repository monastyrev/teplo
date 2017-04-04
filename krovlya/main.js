window.onload = function() {

    var model = {};

    const NEXANS = [
        [12.2, 341],
        [15.7, 438],
        [18.8, 526],
        [23.2, 651],
        [27.5, 769],
        [36.7, 1029],
        [43.5, 1216],
        [52.0, 1453],
        [62.1, 1738],
        [69.6, 1949],
        [79.4, 2221],
        [86.9, 2435],
        [97.2, 2722],
        [120.5, 3376],
        [145.0, 4054],
        [164.2, 4603],
        [194.4, 5443],
      ];
    const PROFITHERM = [
        [6.3, 140],
        [6.9, 160],
        [10.0, 230],
        [14.5, 330],
        [19.4, 445],
        [24.3, 560],
        [28.8, 660],
        [33.6, 770],
        [38.5, 880],
        [43.6, 995],
        [48.2, 1100],
        [57.9, 1325],
        [67.6, 1545],
        [81.4, 1860],
        [99.9, 2285],
        [116.8, 2675],
        [146.9, 3360],
        [176.4, 4030],
        [194.4, 4445],
    ];
    
    function nearest(dict, value) {
      for (var i = 0; i < dict.length; i++) {
          if (dict[i][0] > value) {
              return {l:dict[i][0],p:dict[i][1]};
          }
      }
      return {l:"",p:""};
    }
//    
//     for(var i=0; i<300; i+=10)
//      console.log(i + "~" + nearest(NEXANS, i)); 
//    
    $(document).on("submit", false);
      
    $('.calculate').click(function(e) {
      calculate();
    });
  
    function calculate() {
      var l1 = $('input[name=l1]').val();
      model.l1 = parseFloat(l1 == '' ? 0 : l1);
      var l2 = $('input[name=l2]').val();
      model.l2 = parseFloat(l2 == '' ? 0 : l2);
      var l3 = $('input[name=l3]').val();
      model.l3 = parseFloat(l3 == '' ? 0 : l3);
      var L = l1 * 2 + l2 * 2 + l3 * 4;
      model.L = L;
      console.log("L=" + L);
      var P = l1 * 0.053 + l2 * 0.053 + l3 * 0.099;
      model.P = P;
      console.log("P=" + P);
      var nexans = nearest(NEXANS, L);
      $('#cable1').html(nexans.l + " м, " + nexans.p + " Вт");
      var profi = nearest(PROFITHERM, L);
      $('#cable2').html(profi.l + " м, " + profi.p + " Вт");
      $('#Pmin').html(L * 0.023);
      $('#Pmax').html(L * 0.030);
    }
  }