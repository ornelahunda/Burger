
var express = require("express");
var router = express.Router();
var burger = require("../models/burger");

// Create all the routes and set up logic 

// Loads in the page all the burgers in the database
router.get("/", function(req, res) {
    burger.all(function(data){
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

// Adds a burger in the database
router.post("/api/burgers", function(req, res){
    burger.insert([
        "burger_name", "devoured"
    ], [req.body.burger_name, req.body.devoured], function(result){
        res.json({
            id: result.insertId
        });
    });
});

//Updates a burger from list of ready to eat to devoured
router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;





