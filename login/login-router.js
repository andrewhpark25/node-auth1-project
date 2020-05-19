const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/", (req, res) => {
    const { username, password } = req.body;
  
    if (isValid(req.body)) {
      Users.findBy({ username: username })
        .then(([user]) => {
          // compare the password the hash stored in the database
          if (user && bcryptjs.compareSync(password, user.password)) {
            // we can save information about the client inside the session (req.session)
            req.session.loggedIn = true;
            req.session.user = user;
  
            res.status(200).json({ message: "Welcome to our API" });
          } else {
            res.status(401).json({ message: "You shall not pass!" });
          }
        })
        .catch(error => {
          res.status(500).json({ message: error.message });
        });
    } else {
      res.status(400).json({
        message: "please provide username and password",
      });
    }
  });
  
  router.get("/logout", (req, res) => {
    if (req.session) {
      req.session.destroy(err => {
        if (err) {
          res.status(500).json({ message: "unable to log out" });
        } else {
          res.status(204).end();
        }
      });
    } else {
      res.status(204).end();
    }
  });
  

  module.exports = router;
