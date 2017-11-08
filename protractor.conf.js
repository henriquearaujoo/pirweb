exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    "e2e/features/*.feature"

  ],
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),

  cucumberOpts: {
    compiler: "ts:ts-node/register",
    format: "json:e2e/reports/json/cucumber_report.json",
    require: ["e2e/step_definitions/*.js"],
    strict: true,
    tags: "@CucumberScenario",
  },

  onPrepare: () => {
    browser.manage().window().maximize();
    browser.manage().timeouts().implicitlyWait(5000);
  }
};
