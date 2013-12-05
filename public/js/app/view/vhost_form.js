var Backbone   = require('backbone');
var _          = require('lodash');
var Handlebars = require('handlebars');
var Lib        = require('../../lib');

module.exports = Backbone.View.extend({
    tagName: 'form',
    attributes: {
        action: 'javascript:void(0)',
        method: 'post'
    },
    template: _.template($('#vhost-form').html()),
    
    initialize: function() {
        this.render();
    },
    
    render: function() {
        var tpl = this.parseTemplate();
        this.$el.html(tpl);
    },
    
    parseTemplate: function() {
        var data = this.parseData();
        
        return this.template({
            data: data
        });
    },

    parseData: function() {
        _.defaults(this.model.attributes, this.model.defaults());
        var data = _.cloneDeep(this.model.attributes);
        for (x in data) {
            if (_.isArray(data[x])) {
                data[x] = data[x].pop();
            }
            if (! _.isObject(data[x])) {
                data[x] = _.escape(data[x]);
            }
        }
        
        return data;
    }
    
    
});