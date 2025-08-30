// Returns length of last word using trim + split
function lengthOfLastWord_split(s) {
	// handle null/undefined
	if (!s) return 0;
	const parts = s.trim().split(/\s+/);
	return parts.length ? parts[parts.length - 1].length : 0;
}

// Returns length of last word using single-pass from end (no extra array)
function lengthOfLastWord_iterative(s) {
	if (!s) return 0;
	let i = s.length - 1;
	// skip trailing spaces
	while (i >= 0 && s[i] === ' ') i--;
	let len = 0;
	while (i >= 0 && s[i] !== ' ') {
		len++;
		i--;
	}
	return len;
}

// Check if two strings are anagrams (ignore spaces, case-insensitive)
function isAnagram(a, b) {
	if (a == null || b == null) return false;
	const normalize = str => str.replace(/\s+/g, '').toLowerCase().split('').sort().join('');
	return normalize(a) === normalize(b);
}

// Example usages
console.log(lengthOfLastWord_split("Hello World")); // 5
console.log(lengthOfLastWord_iterative(" fly me to the moon ")); // 4

console.log(isAnagram('listen', 'silent')); // true
console.log(isAnagram('hello', 'world')); // false