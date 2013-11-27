var Vhost = Backbone.Model.extend({
    idAttribute: 'ServerName',
    defaults: function(){
        return {
            "$args":        "*:80",
            "ServerName":   "",
            "DocumentRoot": ""
        };
    },
    name: function() {
        return this.get('ServerName');
    }
});