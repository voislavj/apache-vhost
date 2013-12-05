var Backbone = require('backbone');
var Vhost    = require('../model/vhost');

module.exports = Backbone.Collection.extend({
    model: Vhost,
    comparator: 'ServerName'
});