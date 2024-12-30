import { expect } from 'chai';
import { StringCalculator } from "../src/StringCalculator";

describe('StringCalculator', () => {
    let calculator: StringCalculator

    beforeEach(() => {
        calculator = new StringCalculator();
    })

    it('should return 0 for an empty string', () => {
        expect(calculator.add('')).to.equal(0);
    })

    it('should return the number for a single number input', () => {
        expect(calculator.add('1')).to.equal(1);
    });

    it('should return the sum of two numbers', () => {
        expect(calculator.add('1,2')).to.equal(3);
    });

    it('should return the sum of multiple numbers', () => {
        expect(calculator.add('1,2,3,4,5')).to.equal(15);
    });

    it('should handle numbers with leading and trailing whitespace', () => {
        expect(calculator.add(' 1 , 2 , 3 ')).to.equal(6);
    });

    it('should ignore empty values caused by extra commas', () => {
        expect(calculator.add('1,,2,3')).to.equal(6);
    });

    it('should handle new lines as delimiters', () => {
        expect(calculator.add('1\n2,3')).to.equal(6);
    });

    it('should support custom delimiters', () => {
        expect(calculator.add('//;\n1;2;3')).to.equal(6);
    });

    it('should throw an error when a negative number is provided', () => {
        expect(() => calculator.add('1,-2,3')).to.throw('negatives not allowed : -2');
    });

    it('should throw an error listing all negative numbers when multiple negatives are provided', () => {
        expect(() => calculator.add('1,-2,-3,4')).to.throw('negatives not allowed : -2,-3');
    });

    it('should support [**] delimiters', () => {
        expect(calculator.add('//[**]\n1**2**3')).to.equal(6);
    });

    it('should support multiple [**] and [%%] delimiters', () => {
        expect(calculator.add('//[**][%%]\n1**2%%3')).to.equal(6);
    });

})