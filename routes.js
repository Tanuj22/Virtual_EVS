const routes = require('next-routes')();

routes
    .add('/admin/candidates/:address', '/admin/add')
    .add('/vote/candidateslist/:address', '/vote/candidatedetail');

module.exports = routes;