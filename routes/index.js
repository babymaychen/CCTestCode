var express = require("express");
var router = express.Router();
var db = require("../db");

/* GET Profiles. */
router.get("/", function (request, response) {
  db.getProfiles(function (error, profiles) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(200).json(profiles);
    }
  });
  res.send();
});
/* Update Profile by id. */
router.put("/:id", function (request, response) {
  const id = request.params.id;
  const userName = request.body.userName;
  const email = request.body.email;
  const phone = request.body.phone;
  db.updateProfileById(id, userName, email, phone, function (error) {
    if (error) {
      if (error.message == "SQLITE_CONSTRAINT: FOREIGN KEY constraint failed") {
        response.status(400).json(["profileDoesNotExist"]);
      } else {
        response.status(500).end();
      }
    } else {
      response.status(204).end();
    }
  });
});

/* Create Profile. */
router.post("/", function (request, response) {
  const { userName, email, phone } = request.body;
  db.createProfile(id, userName, email, phone, function (error) {
    if (error) {
      response.status(500).end();
    } else {
      response.status(201).end();
    }
  });
});

module.exports = router;
