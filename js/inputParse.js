function convertToFloatNum(arr) {
  const newArrChars = arr;

  let argument1 = '';

  let argument2 = '';

  let breakpoint;
  console.log(arr);
  if (newArrChars.length == 0) {
    return 1;
  }

  // находим первый аргумент
  for (let j = 0; j < newArrChars.length; j++) {
    if (newArrChars[j] == '/') {
      breakpoint = j;
      break;
    }
    argument1 += newArrChars[j];
  } // console.log(argument1);

  // находим второй аргумент
  for (let k = breakpoint + 1; k < newArrChars.length; k++) {
    argument2 += newArrChars[k];
  } // console.log(argument2);

  // возвращаем число
  if (argument2 === '') {
    return +argument1;
  }
  //    console.log(+argument1 / +argument2)
  return +argument1 / +argument2;
}

function inputParse(input) {
  const data = {
    a: 0,
    b: 1,
  };

  const string = input.value.trim().toLowerCase();
  const arrFromString = [];

  const _arrFromString = string.split('');

  // создаём масив из символов, удаляем пробелы
  for (let i = 0; i < _arrFromString.length; i++) {
    if (_arrFromString[i] !== ' ' && _arrFromString[i] !== '*') {
      arrFromString.push(_arrFromString[i]);
    }
  }

  const xPosition = arrFromString.indexOf('x');

  if (xPosition !== -1) {
    if (xPosition === 0 && arrFromString.length === 1) {
      data.a = 0;
      data.b = 1;
      return data;
    }
    if (xPosition === arrFromString.length - 1) {
      data.b = convertToFloatNum(arrFromString.slice(0, xPosition));
    } else if (arrFromString[xPosition + 1] === '+' || arrFromString[xPosition + 1] === '-') {
      data.a = +arrFromString.slice(xPosition + 1).join('');
      data.b = convertToFloatNum(arrFromString.slice(0, xPosition));
    }
  }
  return data;
}
