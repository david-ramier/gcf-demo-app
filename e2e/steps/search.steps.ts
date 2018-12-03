import { expect } from 'chai';
import { AppPage } from './app.po';

import { Before } from 'cucumber';

const { Given, When, Then } = require('cucumber');
const { setDefaultTimeout } = require('cucumber');
setDefaultTimeout(60 * 1000);

let app: AppPage;

Before(() => {
  app = new AppPage();
});


// defineSupportCode(({Given, When, Then}) => {

  Given('I am on the angular.io site',
    () => app.navigateTo());

  When('I type "{string}" into the search input field',
    (text: string) => app.enterSearchInput(text));

  Then('I should see some results in the search overlay',
    () => app.getSearchResultItems()
      .then(elems => expect(elems.length).to.be.greaterThan(0)));

// });
