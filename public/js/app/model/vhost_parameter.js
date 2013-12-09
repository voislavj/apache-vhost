var Backbone   = require('backbone');

module.exports = Backbone.Model.extend({
    idAttribute: "name",
    
    defaults: function(){
        return {
            "group": null,
            "name":  "Param",
            "value": ""
        };
    }
});