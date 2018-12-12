window.onload = function() {
   
   const THICKNESS_DIAMETER_UNITPOWER = {
    '10': { 15: 14.5,
            20: 17.7,
            25: 20.8,
            32: 25.2,
            40: 30.2,
            50: 36.4,
            65: 46,
            80: 55,
            100: 67,
            150: 98,
            200: 128,
            250: 159}, 
    '20': { 15: 9.4,
            20: 11.1,
            25: 12.8,
            32: 15.1,
            40: 17.7,
            50: 20.8,
            65: 26,
            80: 30,
            100: 36,
            150: 52,
            200: 67,
            250: 83}, 
    '30': { 15: 7.6,
            20: 8.8,
            25: 10.0,
            32: 11.6,
            40: 13.4,
            50: 15.5,
            65: 19,
            80: 22,
            100: 26,
            150: 36,
            200: 47,
            250: 57}, 
    '40': { 15: 6.6,
            20: 7.6,
            25: 8.5,
            32: 9.8,
            40: 11.1,
            50: 12.8,
            65: 15,
            80: 18,
            100: 21,
            150: 29,
            200: 36,
            250: 44}, 
    '50': { 15: 6.0,
            20: 6.8,
            25: 7.6,
            32: 8.6,
            40: 9.8,
            50: 11.1,
            65: 13,
            80: 15,
            100: 18,
            150: 24,
            200: 30,
            250: 36}};
   
   //Мощность, Длина, Стоимость
    const Nexans2R_17 = [
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
      
    const ProfithermEko = [
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
    
    const ProfithermFlex = [
      [80, 7.1, 498],
      [120, 9.8, 636],
      [150, 13.8, 672],
      [220, 20.0, 900],
      [300, 26.7, 1128],
      [385, 33.3, 1368],
      [425, 40.0, 1614],
      [565, 47.3, 1890],
      [600, 53.8, 2136],
      [650, 60.5, 2358],
      [770, 67.7, 2628],
      [815, 74.3, 2862],
      [935, 81.0, 3126],
      [1030, 94.8, 3570],
      [1120, 102.0, 3696],
      [1200, 108.7, 3804],
      [1340, 115.4, 4134],
      [1500, 135.9, 4716],
      [1650, 149.7, 5184],
      [2000, 176.9, 6834],
      [2205, 190.8, 7176]
      ];
    
    function nearest(dict, value) {
      for (var i = 0; i < dict.length; i++) {
          if (dict[i][0] > value) {
              return {p:dict[i][0], l:dict[i][1], c:dict[i][2]};
          }
      }
      return {p:"", l:"", c:""};
    }
    
    
    $(document).on("submit", false);
      
    $('.calculate').click(function(e) {
      calculate();
    });
  
    function calculate() {
      var thickness = $('select[name=insulatorThickness]').val();
      var diameter = $('select[name=tubeDiameter]').val();
      var len = $('input[name=tubeLength]').val();
      var length = parseFloat(len == '' ? 0 : len)
      console.log(thickness + ' мм, ' + diameter + " мм, " + length + ' м');
      if (thickness == null || diameter == null || length == 0) {
          throw "Толщина утеплителя, диаметр и длина трубы не заданы";
      }
      var unitPower = THICKNESS_DIAMETER_UNITPOWER[thickness][diameter];
      if (unitPower == null) {
          throw "Удельная мощность не найдена в таблице";
      }
      console.log(unitPower + ' Вт/м');
      var power = unitPower * length;
      console.log(power + ' Вт');
      
      var nexans2r_17 = nearest(Nexans2R_17, power);
      $('#cable1').html(nexans2r_17.p + " Вт | " + nexans2r_17.l + " м | " + nexans2r_17.c + "грн.");
      var profith_eko = nearest(ProfithermEko, power);
      $('#cable2').html(profith_eko.p + " Вт | " + profith_eko.l + " м | " + profith_eko.c + "грн.");
      var profith_flex = nearest(ProfithermFlex, power);
      $('#cable3').html(profith_flex.p + " Вт | " + profith_flex.l + " м | " + profith_flex.c + "грн.");
     
    }
  }