var VhostView = Backbone.View.extend({
        tagName:    'li',
    template:   _.template($('#vhost-item').html()),
    
    initialize: function(){
    },
    
    render: function(collection,options){
        this.$el
            .html(this.template({
                name: this.model.name(),
                attr: this.model.attributes
            }))
            .attr('id', 'li-'+this.model.name());
        return this;
    }
});

var VhostsApp = Backbone.View.extend({
    el: $(document.body),
    
    initialize: function() {
        this.ul = $('#vhosts');
        this.content = $('#content');
        this.items = {};
        
        this.listenTo(this.collection, 'add', this.add);
        this.listenTo(this.collection, 'sort', this.sort);
    },
    
    add: function(model, collection, options){
        var item = new VhostView({model: model});
        this.items[model.name()] = item;
    },
    
    sort: function(collection) {
        var ul = this.ul;
        var _this = this;
        
        ul.empty();
        collection.each(function(model){
            ul.append(_this.items[model.name()].render().el);
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