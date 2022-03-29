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

// Login
router.post('/login', async (req, res) => {
    try {
        const dbUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!dbUserData) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again!'});
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res
            .status(400)
            .json({ message: 'Incorrect email or password, please try again!'});
            return;
        }

        // When user logs in successfully, set up sessions variable loggedIn
        req.session.save(() => {
            req.session.loggedIn = true;

            res
            .status(200)
            .json({ user: dbUserData, message: 'Yay! You are now logged in!'});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post('/logout', (req, res) => {
    // Destroy session when user logs out
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;