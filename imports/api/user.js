import { Mongo } from 'meteor/mongo';
const MyEth = new Mongo.Collection('ether');

const Api = new Restivus({ prettyJson: true,});

// GET /api/myeth
Api.addRoute('myeth', {
    get: {
        action: function() {
            return {
                status: 'success',
                data: MyEth.findOne({name:Meteor.user().username}),
            };
        },
    },
});

