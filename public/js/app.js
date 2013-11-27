requirejs.config({
    baseUrl: 'js',
    paths: {
        apache: 'apache-vhost'
    }
});

requirejs(['script', 'apache/router', 'apache/model', 'apache/collection', 'apache/view'],
function() {
    io
        .connect('http://' + host + ':' + port)
        .on('init', function(vhosts){
            appView = new VhostsApp({
                collection: Vhosts
            });
            Vhosts.add(vhosts);
            
            app = new App({
                view: appView
            });
            Backbone.emulateHTTP = true; 
            Backbone.emulateJSON = true; 
            Backbone.history.start();
        });
});