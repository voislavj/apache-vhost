require('./jquery-2.0.3.min.js');

/**
 * Dependency injection for Backbone
 */
var Backbone   = require('backbone');
Backbone.$ = $;

var lib        = require('./lib');
var AppView    = require('./app/view/app');
var Collection = require('./app/collection/vhosts');

// Fetch Vhosts from server
lib.ajax({
    url: '/index/index',
    
    // show throbber before loading Vhosts
    start: function() {
        $('#vhosts').addClass('loading');
    },
    
    // Vhosts are loaded
    complete: function(html, response) {
    	// hide throbber
    	$('#vhosts').removeClass('loading');
    	
    	// parse VirtualHosts into JSON from string
    	html = html || '[]';
        var hosts = JSON.parse(html);
        
        // build BBone app
        var hostsCollection = new Collection();
        hostsCollection.add(hosts);
        appView = new AppView({
            collection: hostsCollection
        });
        
        // select first VirtualHost from the list
        if (appView.collection.length) {
            var a;
            if (location.href.indexOf("#") > 0) {
                var theHost = location.href.substr(location.href.indexOf("#")+1);
                theHost = hostsCollection.get(theHost);
                a = appView.$el.find('li#'+theHost.cid+' a');
            } else {
                a = appView.items[0].$el.find('a').eq(0);
            }
            
            a.click();
        }
    }
});