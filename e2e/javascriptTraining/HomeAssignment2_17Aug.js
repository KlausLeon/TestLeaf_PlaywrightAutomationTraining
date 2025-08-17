function launchBrowser(browserName) {
  if (browserName === "chrome") {
    console.log("Launching browser: chrome");
  } else {
    console.log("Launching browser: " + browserName);
  }
}

function runTests(testType) {
  switch (testType) {
    case "smoke":
      console.log("Running smoke tests");
      break;
    case "sanity":
      console.log("Running sanity tests");
      break;
    case "regression":
      console.log("Running regression tests");
      break;
    default:
      console.log("Unknown test type provided. Defaulting to smoke tests");
      console.log("Running smoke tests");
      break;
  }
}

launchBrowser("chrome");
launchBrowser("firefox");

runTests("smoke");
runTests("sanity");
runTests("unknown");
