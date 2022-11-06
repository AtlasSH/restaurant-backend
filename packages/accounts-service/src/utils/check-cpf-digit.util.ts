const CPF_BLACKLIST: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
  '12345678909',
];

const removeSpecialCharsFromCpf = (cpf: string): string => {
  return cpf.replace(/[\.]|[-]/g, '');
};

const formatValueToCpfPattern = (cpf: string): string => {
  const cpfValue = removeSpecialCharsFromCpf(cpf);

  const formattedValue = cpfValue.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    '$1.$2.$3-$4',
  );

  return formattedValue;
};

const calculateCpfDigits = (cpf: string): number => {
  const numbers = cpf.split('').map((number) => parseInt(number, 10));

  const modulus = numbers.length + 1;
  const multiplied = numbers.map((number, index) => number * (modulus - index));
  const mod = multiplied.reduce((buffer, number) => buffer + number) % 11;

  return mod < 2 ? 0 : 11 - mod;
};

const isValidCpfDigit = (cpf: string): boolean => {
  const onlyNumbers = removeSpecialCharsFromCpf(cpf);

  if (onlyNumbers.length !== 11) {
    return false;
  }

  if (CPF_BLACKLIST.includes(onlyNumbers)) {
    return false;
  }

  let numbers: string = onlyNumbers.substring(0, 9);
  numbers += calculateCpfDigits(numbers);
  numbers += calculateCpfDigits(numbers);

  const isValid = numbers.substring(-2) === onlyNumbers.substring(-2);

  if (!isValid) {
    return false;
  }

  return true;
};

export { isValidCpfDigit, removeSpecialCharsFromCpf, formatValueToCpfPattern };
