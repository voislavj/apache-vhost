var Backbone   = require('backbone');
var _          = require('lodash');
var Lib        = require('../../lib');
var VhostParam = require('./vhost_parameter');

module.exports = Backbone.Model.extend({
    idAttribute: "name",
    defaults: function(){
        return {
            "name":   "ParamGroup",
            "params": {
                "$args": ""
            }
        };
    },

    initialize: function() {
        this.parseData();
    },
    
    parseData: function() {
        for (x in this.attributes.params) {
            if (Lib.isArray(this.attributes.params[x])) {
                this.attributes.params[x] = this.attributes.params[x].pop();
            }
        }
    }
});