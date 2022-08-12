
//Helper function for Convert Handler
function splitNumStr(inputStr) {
  let num = inputStr.match(/[.\d\/]+/g) || "1";
  let str = inputStr.match(/[a-zA-Z]+/g)[0];

  return [num[0], str];
}
//Helper function for Convert Handler
function checkDiv(posFraction) {
  let nums = posFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  this.getNum = function (input) {
    let result = splitNumStr(input)[0];
    let nums = checkDiv(result);
    if (!nums) {
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";

    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }

    return result;
  };

  this.getUnit = function (input) {
    let result = splitNumStr(input)[1].toLowerCase();
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };

  this.getReturnUnit = function (initUnit) {
    let result = initUnit.LowerCase();
    switch (result) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "1":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function (initUnit) {
    let result = initUnit.LowerCase();
    switch (result) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "1":
        return "liters";
      case "kg":
        return "kilogramss";
      default:
        return "don't know";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
      case "gal":
        result = initNum * galToL;
      case "lbs":
        result = initNum * lbsToKg;
      case "mi":
        result = initNum * miToKm;
      case "l":
        result =  initNum / galToL;
      case "kg":
        result = initNum /  lbsToKg;
      default:
        result = undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initunit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
