var Backbone             = require('backbone');
var _                    = require('lodash');
var Lib                  = require('../../lib');
var VhostParam           = require('./vhost_parameter');
var VhostParamModel      = require('../model/vhost_parameter');
var VhostParamGroup      = require('./vhost_parameter_group');
var VhostParamGroupModel = require('../model/vhost_parameter_group');

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
        var data = this.parseData();
        
        // add buttons
        $('<button class="submit">Save</button>')
            .appendTo(this.$el)
            .click(function(){
                alert('Saved.');
            });
        $('<button class="delete">Delete</button>')
            .appendTo(this.$el)
            .click(function(){
                if (confirm('Do you want to delete the item?')) {
                    alert('Deleted.');
                }
            });
        
        // add params, groups
        var param;
        var paramGroup;
        var paramContainer = $('<div class="params">');
        for (key in data) {
            if (_.isObject(data[key])) {
                paramGroup = new VhostParamGroup({
                    model: new VhostParamGroupModel({
                        name:   key,
                        params: data[key]
                    })
                });
                paramContainer.append(paramGroup.render().$el);
            } else {
                param = new VhostParam({
                    model: new VhostParamModel({
                        name:  key,
                        value: data[key]
                    })
                });
                paramContainer.append(param.render().$el);
            }
        }
        this.$el.append(paramContainer);
        
        // add buttons
        $('<button>add param</button>')
            .appendTo(this.$el)
            .data('view', this)
            .click(this.addParam);
        $('<button>add group</button>')
            .appendTo(this.$el)
            .data('view', this)
            .click(this.addParamGroup);
        
        return this;
    },

    parseData: function() {
        _.defaults(this.model.attributes, this.model.defaults());
        var data = _.cloneDeep(this.model.attributes);
        for (x in data) {
            if (Lib.isArray(data[x])) {
                data[x] = data[x].pop();
            }
        }
        
        return data;
    },
    
    addParam: function() {
        var _this = $(this).data('view');
        var name = prompt('Parameter name:');
        if (name) {
            var paramView = new VhostParam({
                model: new VhostParamModel({
                    name: name
                })
            });
            _this.$el.find('.params').append(paramView.render().$el);
        }
    },
    
    addParamGroup: function() {
        var _this = $(this).data('view');
        var name = prompt('Group name:');
        if (name) {
            var paramGroupView = new VhostParamGroup({
                model: new VhostParamGroupModel({
                    name: name
                })
            });
            _this.$el.append(paramGroupView.render().$el);
        }
    }
    
});