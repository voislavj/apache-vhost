var Backbone   = require('backbone');
var _          = require('lodash');
var Lib        = require('../../lib');

module.exports = Backbone.Model.extend({
    idAttribute: "name",
    defaults: function(){
        return {
            "name":   "ParamGroup",
            "params": []
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