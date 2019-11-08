const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

// get a list of ninjas from the db
//the res send tells what request we are sending
router.get("/ninjas", function(req, res, next) {
  Ninja.aggregate()
    .near({
      near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
      maxDistance: 100000,
      spherical: true,
      distanceField: "dist.calculated"
    })
    .then(function(ninjas) {
      res.send(ninjas);
    });
});

//add a new ninja to the data
router.post("/ninjas", function(req, res, next) {
  // var ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body)
    .then(function(ninja) {
      res.send(ninja);
    })
    .catch(next);
});

//update a data
router.put("/ninjas/:id", function(req, res, next) {
  // res.send({ type: "PUT" });
  Ninja.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function() {
    Ninja.findOne({ _id: req.params.id }).then(function(ninja) {
      res.send(ninja);
    });
  });
});

//delete a data
router.delete("/ninjas/:id", function(req, res, next) {
  Ninja.findByIdAndDelete(req.params.id).then(ninja => {
    res.send(ninja);
  });
});

module.exports = router;
