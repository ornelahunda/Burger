// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

// Create the burger object
var burger = {
  // Select all burger table entries
  all: function(cb) {
    orm.selectAll('burgers', function(res) {
      cb(res);
      console.log(" selectAll is working");
    });
  },

  // The variables cols and vals are arrays
 insert: function(cols, vals, cb) {
    orm.insertOne('burgers', cols, vals, function(res) {
      cb(res);
      console.log(" insertOne is working");
    });
  },

  // The objColVals is an object specifying columns as object keys 
  // with associated values
  update : function(objColVals, condition, cb) {
    orm.updateOne('burgers', objColVals, condition, function(res) {
      cb(res);
      console.log("updateOne is working");
    });
  }
};

// Export the database functions for the controller (burgerController.js).
module.exports = burger;





