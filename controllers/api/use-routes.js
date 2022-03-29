//user-routes

const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        // Set up sessions with loggedIn set to true
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(dbUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
//handling login request

//handling log out request

// handling sign  up request