const routes = require('next-routes')();

 routes
  .add('/smartgym/newaccount', '/newaccount')
  .add('/smartgym/:address', '/smartgym/inputs/index')
  .add('/smartgym/:address/new', '/smartgym/inputs/new');

module.exports = routes;
