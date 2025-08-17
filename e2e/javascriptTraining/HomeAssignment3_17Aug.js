function evaluateGrade(score) {
	if (typeof score !== 'number' || !isFinite(score) || Number.isNaN(score) || score < 0 || score > 100) {
		return 'Invalid score';
	}
	let grade = 'Invalid score';
	switch (true) {
		case (score >= 90 && score <= 100):
			grade = 'A';
			break;
		case (score >= 80 && score < 90):
			grade = 'B';
			break;
		case (score >= 70 && score < 80):
			grade = 'C';
			break;
		case (score >= 60 && score < 70):
			grade = 'D';
			break;
		case (score >= 0 && score < 60):
			grade = 'F';
			break;
	}
	return grade;
}

console.log(evaluateGrade(95));
console.log(evaluateGrade(83));
console.log(evaluateGrade(76));
console.log(evaluateGrade(61));
console.log(evaluateGrade(45));
console.log(evaluateGrade(-5));
console.log(evaluateGrade(105));