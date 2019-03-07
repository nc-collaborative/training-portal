// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const db = require('../fixtures/db-config.json');
const { execSync } = require('child_process');

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on('task', {
    'db:init': () => {
      execSync(
        `mysql -u ${db.user} -p${db.pass} ${db.db_name} < ../data/test-db-init.sql`, //prettier-ignore
        { stdio: 'inherit' },
      );
      return true;
    },
  });
};
