var Backbone = require('backbone');
var _        = require('lodash');

VhostView = Backbone.View.extend({
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
    }
});

VhostsApp = Backbone.View.extend({
    el: '#app-container',
    
    initialize: function() {
        this.menu = $('#vhosts');
        this.content = $('#content');
        this.items = {};
        
        var _this = this, item;
        this.collection.each(function(model){
            item = new VhostView({model: model});
            _this.menu.append(item.el);
        });
    },
    
    selectMenuItem: function(name) {
        var li = this.ul.children('li#li-'+$escape(name));
        
        this.ul.children('li').removeClass('selected');
        li.addClass('selected');
    },
    
    setContent: function(html) {
        this.content.html(html);
    }
});

module.exports = VhostsApp;