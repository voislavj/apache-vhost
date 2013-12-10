var Backbone   = require('backbone');
var _          = require('lodash');

module.exports = Backbone.Model.extend({
    idAttribute: 'ServerName',
    defaults: function(){
        return {
            "$args":        "*:80",
            "ServerName":   "",
            "DocumentRoot": ""
        };
    },
    
    initialize: function() {
        this.sortAttrs();
    },
    
    name: function() {
        return this.get('ServerName').toString();
    },
    
    sortAttrs: function() {
        var _this = this;
        var attrs = {};
        var keys = _.map(this.attributes, function(value, index){
            return index;
        }).sort();
        _.each(keys, function(key) {
            attrs[key] = _this.attributes[key];
        });
        
        this.attributes = attrs;
    }
});