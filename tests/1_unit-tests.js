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
});



// convertHandler should correctly convert gal to L.
// convertHandler should correctly convert L to gal.
// convertHandler should correctly convert mi to km.
// convertHandler should correctly convert km to mi.
// convertHandler should correctly convert lbs to kg.
// convertHandler should correctly convert kg to lbs.
