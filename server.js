var PORT   = 24612;
var apache = 'C:/webserver/Apache2.4';
var public_html = __dirname + '/public';

var app        = require('http').createServer(requestHandler);
var fs         = require('fs');
var browserify = require('browserify');
var uglify     = require('uglify-js');
var _          = require('lodash');

app.listen(PORT);
console.log('Listening ' + PORT + "...");


function requestHandler(req, res) {
    if (req.url == "/") {
        handleLayout(req, res);
    } else {
        fs.exists(public_html + req.url, function(exists){
            if (exists) {
                handleStatic(req, res);
            } else {
                handleRequest(req, res);
            }
        });
    }
};

function handleRequest(request, response) {
    var data = '';
    
    // collect request data
    request.on('data', function(chunk){
        data += chunk;
    });
    
    // request ended, handle it
    request.on('end', function(){
        var requestItems = request.url.replace(/^\//, '').split("/");
        
        var controller = requestItems.shift() || 'index';
        var action     = requestItems.shift() || 'index';
        
        try {
            var params = requestItems || [];
            var data   = require('querystring').parse(data);
            var ctrl   = require('./app/' + controller + '.js');
            ctrl.data  = data;
            eval('var html = ctrl.' + action + '("' + params.join('","') +'");');
            httpOk(response, html);
        } catch (e) {
            httpError(response, 'Error' + e);
        }
    });
}

function handleLayout(request, response) {
    var file = request.url == "/" ? "/index.html" : request.url;
    var path = public_html + file;
    
    fs.readFile(path, function(err, data){
        if (err) {
            return httpError(res, err);
        }
        httpOk(response, data);
    });
}

function handleStatic(request, response) {
    var file = request.url;
    var path = public_html + file;
    
    if (file.match(/\.js$/)) {
        browsery("./public/js/index.js", function(err, script){
            if (err) {
                return httpError(response, err);
            }
            
            httpOk(response, script);
        });
    } else {
        fs.readFile(path, function(err, data){
            if (err) {
                return httpError(res, err);
            }
            httpOk(response, data);
        });
    }
}

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

function httpError(response, message) {
    response.writeHeader(500);
    response.end(message || "");
}
function httpOk(response, data) {
    response.writeHeader(200);
    response.end(data || '');
}