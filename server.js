var CONFIG = require('./config.json');

var public_html = __dirname + CONFIG.app.public_dir;

var app        = require('http').createServer(requestHandler);
var fs         = require('fs');
var browserify = require('browserify');
var uglify     = require('uglify-js');
var _          = require('lodash');
var apacheconf = require('apacheconf');
var query      = require('querystring');
VirtualHosts   = [];

app.listen(CONFIG.app.server.port);
console.log('Listening ' + CONFIG.app.server.port + "...");


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
        
        var controller = requestItems.shift() || CONFIG.app.defaults.controller;
        var action     = requestItems.shift() || CONFIG.app.defaults.action;
        
        try {
            var args  = requestItems || [];
            var ctrl  = require(CONFIG.app.root + "/" + controller);
            ctrl.data = query.parse(data);
            
            var html = ctrl[action].apply(ctrl, args) || '';
            httpOk(response, html);
            
        } catch (e) {
            httpError(response, e);
        }
    });
}

function handleLayout(request, response) {
    fs.readFile(public_html + CONFIG.app.layout_path, function(err, data){
        if (err) {
            return httpError(res, err);
        }
        getVirtualHosts(function(err, hosts){
            if (! err) {
                VirtualHosts = hosts;
            }
            
            httpOk(response, data);
        });
    });
}

function handleStatic(request, response) {
    var file = request.url;
    var path = public_html + file;
    
    if (file.match(/\.js$/)) {
    	var dispatcher_path = [
    	    public_html,
    	    CONFIG.app.server.js_dispatcher
        ];
        browsery(dispatcher_path.join("/"), function(err, script){
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
    apacheconf(CONFIG.apache.root + CONFIG.apache.vhost_path, function(err, config, parser){
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
        if (!err && CONFIG.app.script.compress) {
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
	console.log("msg: "+ message);
    response.writeHeader(500);
    response.end(message || "Error");
}
function httpOk(response, data) {
    response.writeHeader(200);
    response.end(data || "OK");
}