function sumUpTo(n) {
	let sum = 0;
	for (let i = 1; i <= n; i++) {
		sum += i;
		console.log(i, sum);
	}
	return sum;
}

const finalSum = sumUpTo(5);
console.log('Final sum:', finalSum);
