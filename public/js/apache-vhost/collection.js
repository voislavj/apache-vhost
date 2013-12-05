var Backbone   = require('backbone');

module.exports = Backbone.Collection.extend({
    model: Vhost,
    comparator: 'ServerName'
});