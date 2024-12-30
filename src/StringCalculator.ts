class StringCalculator {
    public add(input: string): number {
        const numbersArrayString = this.splitString(input);
        const numbersArray = this.convertArrayToInt(numbersArrayString);
        let ans = 0;
        this.checkNegatives(numbersArray);
        for (let i = 0; i < numbersArray.length; i++) {
            // const temp = this.convertToInt(numbersArray[i]);
            if (this.checkCondition(numbersArray[i])) {
                ans += numbersArray[i];
            }
        }
        return ans;
    }
    checkCondition(num: number) {
        return num < 1000;
    }
    checkNegatives(numbers: number[]) {
        numbers = numbers.filter(n => n < 0);
        if (numbers.length) {
            throw new Error(`negatives not allowed : ${numbers}`);

        }
    }
    convertToInt(number: string) {
        number = number.trim();
        const num = parseInt(number, 10);
        if (isNaN(num)) {
            return 0;
        }
        return num;
    }
    convertArrayToInt(numbersArray: string[]) {
        let numbers: number[] = [];
        numbersArray.forEach(n => {
            const temp = this.convertToInt(n);
            numbers.push(temp);
        })
        return numbers;
    }
    splitString(input: string) {
        if (input.startsWith("//")) {
            const searchStringEnd = input.indexOf('\n');
            let searchString = input.substring(2, searchStringEnd);
            let numberString = input.substring(searchStringEnd + 1);
            let numbersArrayString:string[] = [];
            if(searchString.length == 1){
                searchString = searchString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // remove special chars
                numberString = numberString.replace(new RegExp(searchString, "g"), ",");
                return numberString.split(',')
            }
            for (let i = 0; i < searchString.length; i++) {
                if (searchString[i] == '[') {
                    i += 1;
                    let temp = "";
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

    }
}

// const calc = new StringCalculator();
export { StringCalculator };