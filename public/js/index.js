var host = location.host;
var port = 24612;

io
    .connect('http://' + host + ':' + port)
    .on('init', function(err, vhosts){
        console.log(err, vhosts);
        /*appView = new VhostsApp({
            collection: Vhosts
        });
        Vhosts.add(vhosts);
        
        app = new App({
            view: appView
        });
        Backbone.emulateHTTP = true;
        Backbone.emulateJSON = true;
        Backbone.history.start();*/
    });