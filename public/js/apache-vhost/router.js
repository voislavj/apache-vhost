var Backbone   = require('backbone');

module.exports = Backbone.Router.extend({
    restfulUrl:"http://api.openkeyval.org/",
    routes: {
        ":name": "edit",
        "destroy/:name": "destroy"
    },
    
    initialize: function(options){
        this.view = options.view;
    },
    
    edit: function(name) {
        this.view.selectMenuItem(name);
        
        // show vhost
        var vhost = Vhosts.get(name);
        
        var html  = '';
        var template = _.template($('#vhost-form').html());
        if (vhost) {
            _.defaults(vhost.attributes, vhost.defaults());
            var data = _.cloneDeep(vhost.attributes);
            
            for (x in data) {
                if (_.isArray(data[x])) {
                    data[x] = data[x].pop();
                }
                if (! _.isObject(data[x])) {
                    data[x] = _.escape(data[x]);
                }
            }
            
            html = template({data: data});
        } else {
            html = 'Unknown host: ' + name;
        }
        this.view.setContent(html);
    },
    destroy: function(name) {
        console.log('destroy', name);
    },
    save: function(form) {
        var data = $(form).serializeArray();
    }
});