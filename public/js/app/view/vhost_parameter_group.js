var Backbone        = require('backbone');
var VhostParam      = require('./vhost_parameter');
var VhostParamModel = require('../model/vhost_parameter');

module.exports = Backbone.View.extend({
    tagName: 'fieldset',
    
    initialize: function() {
        
    },
    
    render: function() {
        var name   = this.model.get('name');
        var params = this.model.get('params');
        
        // add legend
        var legend = $('<legend>').appendTo(this.$el);
        legend.html(name);
        
        // add params
        var param;
        for (x in params) {
            param = new VhostParam({
                model: new VhostParamModel({
                    group: name,
                    name:  x,
                    value: params[x]
                })
            });
            this.$el.append(param.render().$el);
        }
        
        return this;
    }
});