function inputParse(input) {
    var data = {
        a: 0,
        b: 1
    }

    var string = input.value.trim().toLowerCase();
    var arrFromString = [],
        _arrFromString = string.split('');

    // создаём масив из символов, удаляем пробелы
    for (let i = 0; i < _arrFromString.length; i++) {
        if (_arrFromString[i] !== " " && _arrFromString[i] !== "*") {
            arrFromString.push(_arrFromString[i]);
        }
    }

    var xPosition = arrFromString.indexOf('x');

    if (xPosition !== -1) {

        if (xPosition === 0 && arrFromString.length === 1) {

            data.a = 0;
            data.b = 1;
            return data;

        } else if (xPosition === arrFromString.length - 1) {

            data.b = convertToFloatNum(arrFromString.slice(0, xPosition));

        } else if (arrFromString[xPosition + 1] === '+' || arrFromString[xPosition + 1] === '-') {

            data.a = +arrFromString.slice(xPosition + 1).join('');
            data.b = convertToFloatNum(arrFromString.slice(0, xPosition));
        }
    }
    return data;
}

function convertToFloatNum(arr) {
    var newArrChars = arr,
        argument1 = "",
        argument2 = "",
        breakpoint;
    console.log(arr)
    if (newArrChars.length == 0) {
        return 1;
    }

    // находим первый аргумент
    for (var j = 0; j < newArrChars.length; j++) {
        if (newArrChars[j] == "/") {
            breakpoint = j;
            break;
        }
        argument1 += newArrChars[j];
    } //console.log(argument1);

    // находим второй аргумент
    for (var k = breakpoint + 1; k < newArrChars.length; k++) {
        argument2 += newArrChars[k];
    } //console.log(argument2);

    // возвращаем число
    if (argument2 === "") {
        return +argument1;
    }
    //    console.log(+argument1 / +argument2)
    return +argument1 / +argument2;
};
