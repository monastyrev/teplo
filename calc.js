window.onload = function() {
    
    var model = {};

    const POWER = {
          'tp1': {
            'to1':136,
            'to2':170
            },
          'tp2': {
            'to1':170,
            'to2':190
        }
    };
    const STEP = [0.075, 0.0875, 0.1, 0.1125, 0.125];
    const POWER_LENGTH = [
      [300, 17.6],
      [400, 23.5],
      [500, 29.4],
      [600, 35.3],
      [700, 41.2],
      [850, 50],
      [1000, 58.8],
      [1250, 73.5],
      [1400, 82.3],
      [1750, 102.9],
      [2200, 129.4],
      [2600, 156],
      [3100, 185]
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
  
    // ближайшее меньшее четное
    function nearestEven(value) {
      if (value == 0) return 0;
      var min = Math.floor(value - 1);
      var max = Math.ceil(value - 1);
      return max % 2 == 0 ? max : min;
    }
    
/*     for(var i=0; i<10; i+=0.1)
      console.log(i + "~" + nearestEven(i)); */
    
    function nearestPower(value) {
      var index = 0;
      if (value <= POWER_LENGTH[0][0]) {
        return POWER_LENGTH[0];
      }
      if (value >= POWER_LENGTH[POWER_LENGTH.length - 1][0]) {
        return POWER_LENGTH[POWER_LENGTH.length - 1];
      }
      for(var i = 0; i < POWER_LENGTH.length; i++) {
      var powerMin = POWER_LENGTH[i][0];
      var powerMax = POWER_LENGTH[i + 1][0];
      if (value >= powerMin && value < powerMax) {
        index = value < powerMin * 1.09 ? i : i + 1;
        return POWER_LENGTH[index];
      }
      }
    }
    
/*     for(var i=0; i<10000; i+=100)
      console.log(i + "~" + nearestPower(i)); */
    
    $(document).on("submit", false);
      
    $('.calculate-first').click(function(e) {
      calculateParams();
      calculateData();
      calculateResult();
    });
    
    $('.calculate-second').click(function(e) {
      calculateResult();
    });
  
    function calculateParams() {
      model.size1 = true;
      var tipPom = $('select[name=tipPom]').val();
      var tipObo = $('select[name=tipObo]').val();
      if (tipPom === null || tipObo === null) return;
      model.p = getPower(tipPom, tipObo);
      console.log("p=" + model.p);
      // --------------------------
      var a = $('input[name=a]').val();
      model.a = parseFloat(a == '' ? 0 : a);
      var b = $('input[name=b]').val();
      model.b = parseFloat(b == '' ? 0 : b);
      if (model.a == 0 || model.b == 0) return;
      var a1 = $('input[name=a1]').val();
      model.a1 = parseFloat(a1 == '' ? 0 : a1);
      var b1 = $('input[name=b1]').val();
      model.b1 = parseFloat(b1 == '' ? 0 : b1);
      if (model.a1 == 0 || model.b1 == 0) model.size1 = false;
      var S = a * b + a1 * b1;
      model.S = parseFloat(S.toFixed(2));
      $('input[name=S]').val(model.S);
      // ------------------------------
      var recPow = model.S * model.p;
      var powerLength = nearestPower(recPow);
      var P = powerLength[0];
      model.P = P;
      $('input[name=P]').val(P.toFixed(0)); // фактическая мощность
      var L = powerLength[1];
      model.L = L;
      $('input[name=L]').val(L); // фактическая длина кабеля
    }
    
    function calculateData() {
      // ------------------------------
      var p1 = $('input[name=p1]').val(); // вынос кабеля за ленту
      model.p1 = parseFloat(p1);
      var p2 = $('input[name=p2]').val(); // отступ ленты от А
      model.p2 = parseFloat(p2);
      var p3 = $('input[name=p3]').val(); // отступ ленты от С
      model.p3 = parseFloat(p3);
      var p4 = (model.b - model.p2 - model.p3) / 0.6 + 1;
      model.p4 = Math.ceil(p4);
      $('input[name=p4]').val(model.p4); // число полос ленты
          var p5 = (model.b - model.p2 - model.p3) / (model.p4 - 1)
          p5 = p5.toFixed(2);
          $('input[name=p5]').val(p5); // шаг укладки ленты
          var q = model.S / model.L;
          q = nearestStep(q);
          $('input[name=q]').val(q.toFixed(3)); // шаг укладки кабеля
          var k = model.a / q + 1;
          k = nearestEven(k);
          $('input[name=k]').val(k); // число полос кабеля
          if (model.size1) {
            var k1 = model.a1 / q + 1;
              k1 = nearestEven(k1);
              $('input[name=k1]').val(k1); // число полос кабеля
          }
    }
    
    function calculateResult() {
      if (model.p == undefined) return;
      var q = $('input[name=q]').val(); // шаг укладки кабеля
      q = parseFloat(q);
      var k = $('input[name=k]').val(); // число полос кабеля
      k = parseFloat(k); 
      var L1 = model.L * model.a * model.b / model.S + 0.7; // длина кабеля для зоны обогрева
      console.log("L1=" + L1);
      var l = (L1 - model.a - q * 0.5 * k) / k;
      l = parseFloat(l.toFixed(2));
      $('input[name=l]').val(l); // длина полосы кабеля
      // ------------------------------
      var sizeA = (k - 1) * q;
      sizeA = sizeA.toFixed(2);
      $('input[name=sizeA]').val(sizeA); // размер
      var sizeB = l + 0.1;
      sizeB = sizeB.toFixed(2);
      $('input[name=sizeB]').val(sizeB); // размер
      // ------------------------------
      if (model.size1) {
          var k1 = $('input[name=k1]').val(); // число полос кабеля
          k1 = parseFloat(k1);
          var L2 = model.L - L1; // длина кабеля для зоны обогрева 2
          console.log("L2=" + L2);
          var l1 = (L2 - model.a1 - q * 0.5 * k1) / k1;
          l1 = parseFloat(l1.toFixed(2));
          $('input[name=l1]').val(l1); // длина полосы кабеля
          var sizeA1 = k1 * q;
          sizeA1 = sizeA1.toFixed(2);
          $('input[name=sizeA1]').val(sizeA1); // размер
          var sizeB1 = l1 + 0.1;
          sizeB1 = sizeB1.toFixed(2);
          $('input[name=sizeB1]').val(sizeB1); // размер
      }
    }
  }