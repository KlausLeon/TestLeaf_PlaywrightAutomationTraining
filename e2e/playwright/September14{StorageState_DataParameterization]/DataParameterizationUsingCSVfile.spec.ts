// Step 1: Install csv-parse package
//   npm install csv-parse
// Step 2: Use the parse() function imported from 'csv-parse/sync'
//   Example: parse(pathOfTheFile)
// Step 3: Install the 'fs' (file system) module if needed
//   npm install fs
// Each row in the CSV file will be considered as one test.
// For example, if there are 2 rows, there will be 2 unique test descriptions.
// Use path.join(__dirname, "") or path.resolve(__dirname, "") to get the current directory with the file path.
// Set columns: true in the parser options to read the first row as the header.