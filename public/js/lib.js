var Lib = {
    host: location.hostname,
    port: 24612,
    
    _defaultOptions: {
        type: 'GET',
        data: {},
        complete: function(){}
    },
    
    extend: function(extendee, extender){
        return require('lodash').extend(extendee, extender);
    },
        
    ajax: function(options){
        options = this.extend(this._defaultOptions, options);
        
        var http  = require('http');
        var query = require('querystring');

        var post_data = query.stringify(options.data);
        
        var headers = {};
        if (options.type == 'POST') {
            headers = {
                'Content-Type':   'application/x-www-form-urlencoded',
                'Content-Length': post_data.length
            };
        }

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

module.exports = Lib;