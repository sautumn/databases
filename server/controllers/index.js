var models = require('../models');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function (req, res) { res.send(200); }, // a function which handles a get request for all messages
    post: function (req, res) { res.send(201); } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

