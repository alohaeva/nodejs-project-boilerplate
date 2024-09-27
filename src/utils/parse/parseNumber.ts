export const parseNumber = (number: string, def = 0): number => {
  const parsedNumber = parseInt(number, 10);

  return isNaN(parsedNumber) ? def : parsedNumber;
};
