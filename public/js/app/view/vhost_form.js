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
        var param, paramGroup;
        for (key in data) {
            if (_.isObject(data[key])) {
                paramGroup = new VhostParamGroup({
                    model: new VhostParamGroupModel({
                        name:   key,
                        params: data[key]
                    })
                });
                this.$el.append(paramGroup.render().$el);
            } else {
                param = new VhostParam({
                    model: new VhostParamModel({
                        name:  key,
                        value: data[key]
                    })
                });
                this.$el.append(param.render().$el);
            }
        }
        
        return this;
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
            if (Lib.isArray(data[x])) {
                data[x] = data[x].pop();
            }
        }
        
        return data;
    }
    
    
});