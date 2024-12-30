"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringCalculator = void 0;
var StringCalculator = /** @class */ (function () {
    function StringCalculator() {
    }
    StringCalculator.prototype.add = function (input) {
        var numbersArrayString = this.splitString(input);
        var numbersArray = this.convertArrayToInt(numbersArrayString);
        var ans = 0;
        this.checkNegatives(numbersArray);
        for (var i = 0; i < numbersArray.length; i++) {
            // const temp = this.convertToInt(numbersArray[i]);
            if (this.checkCondition(numbersArray[i])) {
                ans += numbersArray[i];
            }
        }
        return ans;
    };
    StringCalculator.prototype.checkCondition = function (num) {
        return num < 1000;
    };
    StringCalculator.prototype.checkNegatives = function (numbers) {
        numbers = numbers.filter(function (n) { return n < 0; });
        if (numbers.length) {
            throw new Error("negatives not allowed : ".concat(numbers));
        }
    };
    StringCalculator.prototype.convertToInt = function (number) {
        number = number.trim();
        var num = parseInt(number, 10);
        if (isNaN(num)) {
            return 0;
        }
        return num;
    };
    StringCalculator.prototype.convertArrayToInt = function (numbersArray) {
        var _this = this;
        var numbers = [];
        numbersArray.forEach(function (n) {
            var temp = _this.convertToInt(n);
            numbers.push(temp);
        });
        return numbers;
    };
    StringCalculator.prototype.splitString = function (input) {
        if (input.startsWith("//")) {
            var searchStringEnd = input.indexOf('\n');
            var searchString = input.substring(2, searchStringEnd);
            var numberString = input.substring(searchStringEnd + 1);
            var numbersArrayString = [];
            if (searchString.length == 1) {
                searchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // remove special chars
                numberString = numberString.replace(new RegExp(searchString, "g"), ",");
                return numberString.split(',');
            }
            for (var i = 0; i < searchString.length; i++) {
                if (searchString[i] == '[') {
                    i += 1;
                    var temp = "";
                    while (searchString[i] != ']') {
                        temp += searchString[i];
                        i++;
                    }
                    temp = temp.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // remove special chars
                    numberString = numberString.replace(new RegExp(temp, "g"), ",");
                    numbersArrayString = numberString.split(',');
                }
            }
            return numbersArrayString;
        }
        input = input.replace(/,|\n/g, ",");
        return input.split(',');
    };
    return StringCalculator;
}());
exports.StringCalculator = StringCalculator;
var calc = new StringCalculator();
console.log("ans:", calc.add("//[**][%%]\n1**2%%3"));
