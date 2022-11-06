const CNPJ_BLACKLIST: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

const removeSpecialCharsFromCnpj = (cnpj: string): string => {
  return cnpj.replace(/[\.]|[-]|[\/]/g, '');
};

const formatValueToCnpjPattern = (cnpj: string): string => {
  const cnpjValue = removeSpecialCharsFromCnpj(cnpj);

  const formattedValue = cnpjValue.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5',
  );

  return formattedValue;
};

const calculateCnpjDigits = (cnpj: string): number => {
  let index = 2;
  const reverse = cnpj
    .split('')
    .reduce((buffer, number) => [parseInt(number, 10)].concat(buffer), []);

  const sum = reverse.reduce((buffer, number) => {
    buffer += number * index;
    index = index === 9 ? 2 : index + 1;
    return buffer;
  }, 0);

  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

const isValidCnpjDigit = (cnpj: string): boolean => {
  const onlyNumbers = removeSpecialCharsFromCnpj(cnpj);

  if (onlyNumbers.length !== 14) {
    return false;
  }

  if (CNPJ_BLACKLIST.includes(onlyNumbers)) {
    return false;
  }

  let numbers: string = onlyNumbers.substring(0, 12);
  numbers += calculateCnpjDigits(numbers);
  numbers += calculateCnpjDigits(numbers);

  const isValid = numbers.substring(-2) === onlyNumbers.substring(-2);

  if (!isValid) {
    return false;
  }

  return true;
};

export {
  isValidCnpjDigit,
  removeSpecialCharsFromCnpj,
  formatValueToCnpjPattern,
};
