const routes = require('next-routes')();

routes
    .add('/admin/candidates/:address', '/admin/add');

module.exports = routes;