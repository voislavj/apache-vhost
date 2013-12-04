var PORT   = 24612;
var apache = 'C:/webserver/Apache2.4';
var public_html = __dirname + '/public';

var app        = require('http').createServer(server);
var io         = require('socket.io').listen(app);
var fs         = require('fs');
var apacheconf = require('apacheconf');
var browserify = require('browserify');
var uglify     = require('uglify-js');
var _          = require('lodash');

io.sockets.on('connection', function(socket){
    var hosts = [];
    getVirtualHosts(function(err, hosts){
        socket.emit('init', err, hosts);
    });
});

app.listen(PORT);
console.log('Linstening ' + PORT + "...");


function server(req, res) {
    var file = req.url == "/" ? "/index.html" : req.url;
    var path = public_html + file;
    
    fs.readFile(path, function(err, data){
        if (err) {
            return httpError(res, err);
        }
        
        if (file.match(/\.js$/)) {
            browsery("./public/js/index.js", function(err, script){
                if (err) {
                    return httpError(res, err);
                }
                
                res.writeHeader(200);
                res.end(script);
            });
        } else {
            res.writeHeader(200);
            res.end(data);
        }
    });
};

function getVirtualHosts(callback) {
    apacheconf(apache + '/conf/extra/httpd-vhosts.conf', function(err, config, parser){
        var hosts = [];
        if (! err) {
            _.each(config.VirtualHost, function(vhost){
                hosts.push(vhost);
            });
        }
        callback(err, hosts);
    });
}
function browsery(file, callback) {
    var b = browserify();
    b.add(file);
    b.bundle(function(err, script) {
        if (!err) {
            try {
                script = uglify.minify(script, { fromString: true }).code;
            }
            catch (e) {
                err = e;
            }
        }
        callback(err, script);
    });
};
function httpError(res, message) {
    res.writeHeader(500);
    res.end(message || "");
}