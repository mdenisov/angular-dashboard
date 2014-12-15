/**
* News.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        active: {
            type: 'boolean',
            defaultsTo: true
        },
        banks: {
            type: 'array'
        },
        banks_info: {
            type: 'array'
        },
        block: {
            type: 'boolean',
            defaultsTo: false
        },
        correction: {
            type: 'boolean',
            defaultsTo: false
        },
        date_create: {
            type: 'datetime',
            defaultsTo: function() {
                return new Date();
            }
        },
        date_finish: {
            type: 'datetime'
        },
        date_start: {
            type: 'datetime'
        },
        date_update: {
            type: 'datetime',
            defaultsTo: function() {
                return new Date();
            }
        },
        illustrations: {
            type: 'array'
        },
        image: {
            type: 'string'
        },
        insurance: {
            type: 'array'
        },
        leasing: {
            type: 'array'
        },
        mainnews: {
            type: 'boolean',
            defaultsTo: false
        },
        mfo: {
            type: 'array'
        },
        preview_text: {
            type: 'string',
            required: true
        },
        products: {
            type: 'array'
        },
        regions: {
            type: 'array'
        },
        rss: {
            type: 'array'
        },
        status: {
            type: 'integer',
            defaultsTo: 1
        },
        sub_category: {
            type: 'string'
        },
        text: {
            type: 'string',
            required: true
        },
        title: {
            type: 'string',
            required: true
        },
        topic: {
            type: 'array'
        },
        video: {
            type: 'array'
        }
    },

    beforeUpdate: function (values, cb) {
        values.date_update = new Date();
        cb();
    }
};

