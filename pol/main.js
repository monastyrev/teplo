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
  
  
  //мат под плитку без стяжки
  const SQUARE_PRICE_NexansMat = [
   [150, 1.0, 3213],
   [225, 1.5, 3828],
   [300, 2.0, 4410],
   [375, 2.5, 5034],
   [450, 3.0, 5595],
   [525, 3.5, 6171],
   [600, 4.0, 6720],
   [750, 5.0, 7692],
   [900, 6.0, 8622],
   [1050, 7.0, 9570],
   [1200, 8.0, 10539],
   [1500, 10.0, 12429],
   [1800, 12.0, 14409]
   ];
   
   const SQUARE_PRICE_NexansFlex = [
   [375, 2.5, 3984],
   [450, 3.0, 4452],
   [525, 3.5, 4878],
   [600, 4.0, 5565],
   [750, 5.0, 5973],
   [900, 6.0, 6771],
   [1050, 7.0, 7887],
   [1200, 8.0, 8136],
   [1500, 10.0, 10551],
   [1800, 12.0, 11871],
   ];
   
   const SQUARE_PRICE_ProfithermMat = [
   [75, 0.5, 1452],
   [150, 1.0, 1959],
   [225, 1.5, 2277],
   [300, 2.0, 2643],
   [375, 2.5, 3030],
   [450, 3.0, 3699],
   [525, 3.5, 4017],
   [600, 4.0, 4809],
   [750, 5.0, 5145],
   [900, 6.0, 5952],
   [1050, 7.0, 6654],
   [1200, 8.0, 7464],
   [1350, 9.0, 8070],
   [1500, 10.0, 8667],
   [1800, 12.0, 9717]
   ];
   
   const SQUARE_PRICE_ProfithermEkoMat = [
   [80, 0.5, 1083],
   [120, 0.75, 1164],
   [150, 1.0, 1248],
   [220, 1.5, 1719],
   [300, 2.0, 2016],
   [385, 2.5, 2199],
   [425, 3.0, 2244],
   [565, 3.5, 2487],
   [600, 4.0, 3006],
   [650, 4.5, 3144],
   [770, 5.0, 3798],
   [815, 5.5, 4026],
   [935, 6.0, 4152],
   [980, 6.5, 4251],
   [1030, 7.0, 4398],
   [1120, 7.5, 4437],
   [1200, 8.0, 4878],
   [1340, 8.5, 5280],
   [1500, 10.0, 5484],
   [1650, 11.0, 5697],
   [2000, 13.0, 8304],
   [2205, 14.0, 9288]
   ];
   
const SQUARE_PRICE_ProfithermEkoFlex = [
   [80, 0.5, 633],
   [120, 0.75, 777],
   [150, 1.0, 816],
   [220, 1.5, 1053],
   [300, 2.0, 1287],
   [385, 2.5, 1539],
   [425, 3.0, 1857],
   [565, 3.5, 2145],
   [600, 4.0, 2400],
   [650, 4.5, 2634],
   [770, 5.0, 2916],
   [815, 5.5, 3222],
   [935, 6.0, 3495],
   [1030, 7.0, 3765],
   [1120, 7.5, 4158],
   [1200, 8.0, 4269],
   [1340, 8.5, 4614],
   [1500, 10.0, 5280],
   [1650, 11.0, 5769],
   [2000, 13.0, 7548],
   [2205, 14.0, 7965]
   ];
 
 //инфракр.пленка, без стяжки, под ламинат
  const SQUARE_PRICE_ProfithermSlim = [
   [110, 0.5, 357],
   [220, 1.0, 537],
   [440, 2.0, 1077],
   [660, 3.0, 1623],
   [880, 4.0, 2157],
   [1100, 5.0, 2679],
   [1320, 6.0, 3231],
   [1540, 7.0, 3687],
   [1760, 8.0, 4137],
   [1980, 9.0, 4665],
   [2200, 10.0, 5115],
   [3300, 15.0, 7557]
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
    
    function nearestPower(value, lookupTable) {
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
    
    function nearestSquare(value, lookupTable) {
        var index = 0;
        if (value <= lookupTable[0][1]) {
          return lookupTable[0];
        }
        if (value >= lookupTable[lookupTable.length - 1][0]) {
          return lookupTable[lookupTable.length - 1];
        }
        for(var i = 0; i < lookupTable.length; i++) {
          var squareMin = lookupTable[i][1];
          var squareMax = lookupTable[i + 1][1];
          if (value >= squareMin && value < squareMax) {
              index = value < squareMin * 1.09 ? i : i + 1;
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
      if (tipPom === null || tipObo === null) {
          throw "Не задан тип помещения или тип обогрева";
      }
      model.p = getPower(tipPom, tipObo);
      console.log("Мощность: " + model.p);

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
        render('#cable1', POWER_LENGTH_Nexans1r, power);
        render('#cable2', POWER_LENGTH_Nexans2r, power);
        render('#cable3', POWER_LENGTH_Profitherm, power);
        render('#cable4', POWER_LENGTH_ProfithermEko, power);
    }
    
    function calculateMate(square) {
        render1('#nMat', SQUARE_PRICE_NexansMat, square);
        render1('#nFlex', SQUARE_PRICE_NexansFlex, square);
        render1('#pMat1', SQUARE_PRICE_ProfithermMat, square);
        render1('#pMat2', SQUARE_PRICE_ProfithermEkoMat, square);
        render1('#pFlex', SQUARE_PRICE_ProfithermEkoFlex, square);
    }
    
    function calculateIrfilm(square) {
        render1('#slim', SQUARE_PRICE_ProfithermSlim, square);
    }
    
    function render(id, data, input) {
        var row = nearestPower(input, data);
        $(id).html(row[0] + "Вт | " + row[1] + "м | " + row[2] + "грн.");
        $(id).parent().parent().show();
    }
    
    function render1(id, data, input) {
        var row = nearestSquare(input, data);
        $(id).html(row[0] + "Вт | " + row[1] + "м | " + row[2] + "грн.");
        $(id).parent().parent().show();
    }
  
  }