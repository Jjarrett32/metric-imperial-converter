const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("Function converhandler.getNum(input)", function () {
    test("Whole number input", function (done) {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    test("Decimal number input", function (done) {
      let input = "12.2L";
      assert.equal(convertHandler.getNum(input), 12.2);
      done();
    });

    test("Fractional input", function (done) {
      let input = "1/4L";
      assert.equal(convertHandler.getNum(input), 1 / 4);
      done();
    });

    test("Fractional input with decimal", function (done) {
      let input = "1.5/4L";
      assert.equal(convertHandler.getNum(input), 1.5 / 4);
      done();
    });

    test("Invalid input double fraction", function (done) {
      let input = "1/5/4L";
      assert.equal(convertHandler.getNum(input), undefined);
      done();
    });

    test("No numerical input", function (done) {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", function () {
    test("For each valid input units", function (done) {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      let output = [
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
        "gal",
        "L",
        "mi",
        "km",
        "lbs",
        "kg",
      ];

      input.forEach(function (ele, index) {
        assert.equal(convertHandler.getUnit(ele), output[index]);
      });
      done();
    });
    test("Invalid input unit", function (done) {
      assert.equal(convertHandler.getUnit("32kilograms"), undefined);
      done();
    });
  });
  suite("Function convertHandler.getReturnUnit(input)", function(){
    test("For each Valid Input Unit", function(done) {
        let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
        let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs']
        input.forEach(function(el, index) {
            assert.equal(convertHandler.getReturnUnit(el), expect[index]);
        })
        done()
    })
  })
  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Input Unit", function(done) {
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg']
      let expect = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms']
      
      input.forEach((unit, index) => {
        assert.equal(convertHandler.spellOutUnit(unit), expect[index])
      })
      done();
    })
  })

  suite("Function convertHandler.convert(num, unit)", function () {
    test("Gal to L", function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;

      assert.approximately(convertHandler.convert(input[0], input[1]),
        expected,
        0.1
    );
      done();
    });

    test("L to gal", function (done) {
      let input = [5, "L"];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    });
    test("Km to Mi", function (done) {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done(); 
    })
    test("Lbs to Kg", function (done) {
      let input = [5, "Lbs"];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
    test("Kg to Lbs", function(done) {
      let input = [5, "Kg"];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1);
      done();
    })
  });

})

// convertHandler should correctly convert gal to L.
// convertHandler should correctly convert L to gal.
// convertHandler should correctly convert mi to km.
// convertHandler should correctly convert km to mi.
// convertHandler should correctly convert lbs to kg.
// convertHandler should correctly convert kg to lbs.
