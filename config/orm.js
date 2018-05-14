// Import MySQL connection.
var connection = require("../config/connection.js");

// Connect to database
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


// In this file,
//  I am going to create the methods that will execute the necessary MySQL commands in the controllers. 
//  These are the methods you need to use in order to retrieve and store data in your database.
// selectAll()
// insertOne()
// updateOne()


// The above helper function loops through and creates an array 
// of question marks - ["?", "?", "?"] - and turns it into a string.
function printQuestionMarks(num) {
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];
  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}



// Object for all our SQL statement functions.
var orm = {

  // selectAll()
  // Function that returns all table entries
  selectAll: function (tableInput, cb) {
    // Construct the query string that returns all rows from the target table
    var queryString = "SELECT * FROM " + tableInput + ";";

    // Perform the database query
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      // Return results in callback
      cb(result);
    });
  },


  // insertOne()
  insertOne: function (table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  // updateOne()
  updateOne: function (table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function (err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object 
module.exports = orm;