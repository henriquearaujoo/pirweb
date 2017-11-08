
const { Given, When, Then } = require("cucumber");


Given(/^"([^"]*)" is opened$/, function (arg1, callback) {
  browser.get('/');
  element(by.xpath('/html/body/app-root/app-home-layout/app-side-bar/aside/section/ul/li/a/span')).click()

  });

