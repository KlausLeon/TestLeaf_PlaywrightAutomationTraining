var city = "Mumbai";
console.log("I live in " + city);
console.log("Value:", city, "| Type:", typeof city);


let marks = 85;
console.log("Marks + 10 =", marks + 10); // Output: Marks + 10 = 95
console.log("Value:", marks, "| Type:", typeof marks);

const isWeekend = true;
if (isWeekend) {
    console.log("Relax");
} else {
    console.log("Work");
}
console.log("Value:", isWeekend, "| Type:", typeof isWeekend);

var futureGoal;
console.log("Value:", futureGoal, "| Type:", typeof futureGoal);

// Short note about var vs let
/*
Difference observed:
- 'var' allows redeclaration and is function-scoped, which can lead to unexpected behavior.
- 'let' is block-scoped and does not allow redeclaration in the same scope, making code safer and easier to manage.
- 'const' is also block-scoped and cannot be reassigned.
*/
