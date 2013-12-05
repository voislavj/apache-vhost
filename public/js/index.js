require('./jquery-2.0.3.min.js');
require('./apache-vhost/model');

var lib        = require('./lib');
var AppView    = require('./apache-vhost/view');
var Collection = require('./apache-vhost/collection');
var Backbone   = require('backbone');
Backbone.$ = $;

// Fetch Vhosts from server
lib.ajax({
    url: '/index/index',
    start: function() {
        
    },
    complete: function(html, response) {
        var hosts = JSON.parse(html);
        var hostsCollection = new Collection();
        hostsCollection.add(hosts);
        appView = new AppView({
            collection: hostsCollection
        });
    }
});