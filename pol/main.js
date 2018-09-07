window.onload = function() {

    var model = {};
    
    const typePol = {CABLE:{}, MATE:{}, IRFILM:{}};

    const POWER = {
          'tp1': {
            'to1':136,
            'to2':165
            },
          'tp2': {
            'to1':170,
            'to2':185
        }
    };
    const STEP = [0.075, 0.0875, 0.1, 0.1125, 0.125];
    const POWER_LENGTH = [
      [140, 7.5],
      [200, 11.7],
      [210, 11.5],
      [270, 14.5],
      [300, 17.6],
      [355, 18.5],
      [400, 23.5],
      [445, 23.0],
      [530, 28.0],
      [500, 29.4],
      [600, 35.3],
      [630, 33.0],
      [700, 41.2],
      [725, 38.0],
      [850, 50.0],
      [900, 47.0],
      [1000, 58.8],
      [1070, 57.0],
      [1240, 65.0],
      [1250, 73.5],
      [1400, 82.3],
      [1450, 76.0],
      [1750, 102.9],
      [1790, 94.0],
      [2100, 114.0],
      [2200, 129.4],
      [2600, 156.0],
      [3100, 185.0],
      [3300, 194.0]
      ];
  
  const POWER_LENGTH_Nexans1r = [
      [300, 17.6, 1887],
      [400, 23.5, 1983],
      [500, 29.4, 2085],
      [600, 35.3, 2223],
      [700, 41.2, 2619],
      [850, 50.0, 2805],
      [1000, 58.8, 3225],
      [1250, 73.5, 3747],
      [1400, 82.3, 4293],
      [1750, 102.9, 5127],
      [2200, 129.4, 6117],
      [2600, 156.0, 7167],
      [3100, 185.0, 8505]
      ];
  
  const POWER_LENGTH_Nexans2r = [
      [200, 11.7, 2037],
      [300, 17.6, 2307],
      [400, 23.5, 2505],
      [500, 29.3, 2697],
      [600, 35.3, 3057],
      [700, 41.0, 3477],
      [840, 49.7, 3849],
      [1000, 58.3, 4287],
      [1250, 72.4, 5427],
      [1370, 80.8, 6015],
      [1500, 88.2, 6645],
      [1700, 100.0, 7335],
      [2100, 123.7, 8145],
      [2600, 154.5, 9123],
      [3300, 194, 10599]
      ];
  
  const POWER_LENGTH_Profitherm = [
      [140, 7.5, 1137],
      [210, 11.5, 1407],
      [270, 14.5, 1527],
      [355, 18.5, 1719],
      [445, 23.0, 1995],
      [530, 28.0, 2169],
      [630, 33.0, 2373],
      [725, 38.0, 2679],
      [900, 47.0, 3105],
      [1070, 57.0, 3645],
      [1240, 65.0, 4263],
      [1450, 76.0, 4527],
      [1790, 94.0, 5109],
      [2100, 114.0, 5925],
      [2600, 133.0, 7275],
      [3300, 175.0, 9267]
      ];
  
  const POWER_LENGTH_ProfithermEko = [
      [95, 5.8, 774],
      [140, 8.0, 954],
      [200, 12.0, 1050],
      [270, 16.0, 1212],
      [340, 20.0, 1386],
      [460, 24.0, 1470],
      [530, 32.0, 1728],
      [600, 36.0, 1950],
      [685, 40.0, 2184],
      [800, 48.0, 2430],
      [920, 57.0, 2694],
      [1115, 68.0, 3060],
      [1375, 83.0, 3720],
      [1610, 97.0, 4122],
      [2025, 122.0, 4842],
      [2420, 147.0, 5664],
      [2670, 162.0, 6150]
      ];
  
    function getPower(tp, to) {
      return POWER[tp][to];
    }
    
    function nearestStep(value) {
      var min = 1;
      var index = 0;
      for(var i = 0; i < STEP.length; i++) {
        var cur = Math.abs(value - STEP[i]);
        if (min > cur) {
          min = cur;
          index = i;
        }
      }
      return STEP[index];
    }
  
    // ближайшее четное
    function nearestEven(value) {
     return Math.round(value);
     // var max = Math.floor(value);
     // return max % 2 == 0 ? max : max - 1;
    }
    
     // for(var i=0; i<10; i+=0.1)
     // console.log(i + "~" + nearestEven(i));
    
    function nearestPower(value, lookupTable) {
      console.log("input: " + value);
      var index = 0;
      if (value <= lookupTable[0][0]) {
        return lookupTable[0];
      }
      if (value >= lookupTable[lookupTable.length - 1][0]) {
        return lookupTable[lookupTable.length - 1];
      }
      for(var i = 0; i < lookupTable.length; i++) {
        var powerMin = lookupTable[i][0];
        var powerMax = lookupTable[i + 1][0];
        if (value >= powerMin && value < powerMax) {
            index = value < powerMin * 1.09 ? i : i + 1;
            return lookupTable[index];
        }
      }
    }
    
    function calculateBySquareAndPrice(square, price) {
        return square * price;
    }
    
/*     for(var i=0; i<10000; i+=100)
      console.log(i + "~" + nearestPower(i)); */
    
    $(document).on("submit", false);
      
    $('.calculate-first').click(function(e) {
      $('.cable .form-group').hide();
      var choice = getPolType();
      var square = calculateSquare();
      if (choice == typePol.CABLE) {
          //3.1. Расчет мощности для кабеля
          calculatePol(square);
      } else if (choice == typePol.MATE) {
          calculateMate(square);
      } else if (choice == typePol.IRFILM) {
          calculateIrfilm(square);
      }
    });
    
    function getPolType() {
        //1. Выбор типа теплого пола: кабель или мат или пленка)
        var tipMon = $('select[name=tipMon]').val();
        if (tipMon == 'on') {
            return typePol.CABLE;
        }
        //2. Уточнение типа теплого пола: мат или пленка
        var tipPol = $('select[name=tipPol]').val();
        if (tipPol == 'tile') {
            return typePol.MATE;
        }
        if (tipPol == 'plank') {
            return typePol.IRFILM;
        }
        throw "Неверно выбраны значения в списках";
    }
    
    function calculateSquare() {
        //ввод данных Площадь помещения
        var S = $('input[name=S]').val();
        var modelS = parseFloat(S == '' ? 0 : S);
        if (modelS == 0) {
            throw "Не задана площадь помещения";
        }
        return parseFloat(modelS.toFixed(2));
    }
  
    function calculatePol(square) {
      var tipPom = $('select[name=tipPom]').val();
      var tipObo = $('select[name=tipObo]').val();
      if (tipPom === null || tipObo === null) return 0;
      model.p = getPower(tipPom, tipObo);
      console.log("p=" + model.p);

      // ------------------------------
      var recPow = square * model.p;
      var powerLength = nearestPower(recPow, POWER_LENGTH);
      var P = powerLength[0];
      model.P = P;
      $('input[name=P]').val(P.toFixed(0)); // фактическая мощность
      var L = powerLength[1];
      model.L = L;
      $('input[name=L]').val(L); // фактическая длина кабеля
      
      calculatePolPrice(recPow)
    }
    
    function calculatePolPrice(power) {
        var Nexans1r = nearestPower(power, POWER_LENGTH_Nexans1r);
        $('#cable1').html(Nexans1r[0] + "Вт | " + Nexans1r[1] + "м | " + Nexans1r[2] + "грн.");
        $('#cable1').parent().parent().show();
        var Nexans2r = nearestPower(power, POWER_LENGTH_Nexans2r);
        $('#cable2').html(Nexans2r[0] + "Вт | " + Nexans2r[1] + "м | " + Nexans2r[2] + "грн.");
        $('#cable2').parent().parent().show();
        var Profitherm = nearestPower(power, POWER_LENGTH_Profitherm);
        $('#cable3').html(Profitherm[0] + "Вт | " + Profitherm[1] + "м | " + Profitherm[2] + "грн.");
        $('#cable3').parent().parent().show();
        var ProfithermEko = nearestPower(power, POWER_LENGTH_ProfithermEko);
        $('#cable4').html(ProfithermEko[0] + "Вт | " + ProfithermEko[1] + "м | " + ProfithermEko[2] + "грн.");
        $('#cable4').parent().parent().show();
    }
    
    function calculateMate(square) {
        var priceMate = 111;
        $('#nMat').html(calculateBySquareAndPrice(square, priceMate) + "грн.");
        $('#nMat').parent().parent().show();
        var priceMate1 = 222;
        $('#pMat1').html(calculateBySquareAndPrice(square, priceMate1) + "грн.");
        $('#pMat1').parent().parent().show();
        var priceMate2 = 333;
        $('#pMat2').html(calculateBySquareAndPrice(square, priceMate2) + "грн.");
        $('#pMat2').parent().parent().show();
    }
    
    function calculateIrfilm(square) {
        var priceSlim = 444;
        $('#slim').html(calculateBySquareAndPrice(square, priceSlim) + "грн.");
        $('#slim').parent().parent().show();
    }
  
  }