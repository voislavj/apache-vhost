var _     = require('lodash');
var http  = require('http');
var query = require('querystring');

module.exports = {
    host: location.hostname,
    port: 24612,
    
    _ajaxDefaultOptions: {
        type: 'GET',
        data: {},
        start: function(){},
        complete: function(){}
    },  
    ajax: function(options){
        options = _.extend(this._ajaxDefaultOptions, options);

        var post_data = query.stringify(options.data);
        
        var headers = {};
        if (options.type == 'POST') {
            headers = {
                'Content-Type':   'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
            };
        }

        options.start();
        var request = http.request({
                host: this.host,
                port: this.port,
                path: options.url,
                method: options.type,
                headers: headers
            }, function(response){
                var data = '';
                response.on('data', function(chunk){
                    data += chunk;
                });
                
                response.on('end', function(){
                    options.complete(data, response);
                });
            });

        request.write(post_data);
        request.end();
    }
};