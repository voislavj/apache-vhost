var Backbone = require('backbone');
var _        = require('lodash');

module.exports = Backbone.View.extend({
    tagName:    'li',
    template:   _.template($('#vhost-item').html()),
    
    events: {
        "click a": "edit"
    },
    
    initialize: function(){
        this.content = $('#content');
        this.render();
    },
    
    render: function(){
        this.$el
            .html(this.template({
                name: this.model.name().toString(),
                attr: this.model.attributes
            }))
            .data('name', this.model.name());
        
        return this;
    },
    
    edit: function(e) {
    	this.$el.parent().find('a').removeClass('selected');
    	this.$el.find('a').addClass('selected');
        var template = _.template($('#vhost-form').html());
        
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
        
        html = template({data: data});
        
        this.content.html(html);
        
        $('#content').css('height', 'auto');
        var contentHeight = $('#content').height();
        var vhostsHeight  = $('#vhosts').height();
        if (contentHeight < vhostsHeight) {
        	$('#content').css('height', vhostsHeight);
        }
    }
});