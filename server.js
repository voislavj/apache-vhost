var PORT   = 24612;
var apache = 'C:/webserver/Apache2.4';

var app   = require('http').createServer(server),
    io    = require('socket.io').listen(app),
    fs    = require('fs'),
    sys   = require('sys'),
    exec  = require('child_process').exec,
    _     = require('lodash'),
    apacheconf = require('apacheconf'),
    command;

io.sockets.on('connection', function(socket){
    getVirtualHosts(function(hosts){
        socket.emit('init', hosts);
    });
});

app.listen(PORT);


/*command = exec('httpd -t', function(err, stdout, stderr){
	sys.print(stderr);
	sys.print(stdout);
	
	if (err) {
		console.log('Error: ' + err);
	}
});*/


function server(req, res) {
    fs.exists(__dirname + req.url, function(exists){
        var path = __dirname + req.url;
        fs.stat(path, function(err, stats){
            if (! exists || stats.isDirectory() || err) {
                path = __dirname + '/index.html';
            }
            
            fs.readFile(path, function(err, data){
                if (err) {
                    res.writeHead(500);
                    return res.end('Server Error. ' + err);
                }
                
                res.writeHead(200);
                res.end(data);
            });
        });
    });
}

function getVirtualHosts(callback) {
    var hosts = [];
    
    apacheconf(apache + '/conf/extra/httpd-vhosts.conf', function(err, config, parser){
        _.each(config.VirtualHost, function(vhost){
            hosts.push(vhost);
        });
        
        callback(hosts);
    });
}