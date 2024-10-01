// utils/numberToWords.js
export function convertNumberToWords(number) {
  if (number === 0) return 'Zero';

  const ones = [
    'Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
  ];
  
  const tens = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
  ];

  const thousands = ['', 'Thousand', 'Million', 'Billion', 'Trillion'];

  function convertChunk(number) {
    let words = '';

    if (number > 99) {
      words += ones[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }

    if (number > 19) {
      words += tens[Math.floor(number / 10)] + ' ';
      number %= 10;
    }

    if (number > 0) {
      words += ones[number] + ' ';
    }

    return words.trim();
  }

  let word = '';
  let chunkCount = 0;

  while (number > 0) {
    let chunk = number % 1000;
    if (chunk > 0) {
      word = convertChunk(chunk) + ' ' + thousands[chunkCount] + ' ' + word;
    }
    number = Math.floor(number / 1000);
    chunkCount++;
  }

  return word.trim();
}
