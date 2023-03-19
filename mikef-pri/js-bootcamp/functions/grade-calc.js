// students score, total possible score
// 15/20 -> You got a C (75%)!
// A 90-100, B 80-89, C 70-79, D 60-69, F 0-59

const gradeCalc = function (score, totalScore) {
  if (typeof score !== 'number' || typeof totalScore !== 'number') {
    throw Error('Both values should be valid numbers');
  }

  const percent = (score / totalScore) * 100;
  let letterGrade = '';

  if (percent >= 90) {
    letterGrade = 'an A';
  } else if (percent >= 80) {
    letterGrade = 'a B';
  } else if (percent >= 70) {
    letterGrade = 'a C';
  } else if (percent >= 60) {
    letterGrade = 'a D';
  } else letterGrade = 'an F';

  return `You got ${letterGrade} (${percent}%)!`;
};

try {
  const result = gradeCalc('test', 20);
  console.log(result);
} catch (e) {
  console.log(e.message);
}

// Add error handling. Check that both arguments are numbers. If not, throw an error. Use try-catch with function call.
