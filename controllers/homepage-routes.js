//create router
const router = require('express').Router();
const { Comment, Post, User } = require('../models');

// get request to get all posts/blogs in the db
router.get('/', (req, res) => {
    Post.findbyPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err)
    });
})

// get request for single post
router.get('/post/:id', (req, res) => {
    Post.findbyPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
                include: [User],
            },
        ],
    })
    .then((dbPostData) => {
        if (dbPostData) {
            const post = dbPostData.get({ plain: true });

            res.render('single-post', { post });
        } else {
            res.status(404).end();
        }
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});

// Login route
router.get('/login', (req, res) => {
    // If user already logged in, redirect to home page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Otherwise, render the login template
    res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
    // If user already logged in, redirect to home page
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Otherwise, render signup template
    res.render('signup');
});

module.exports = router;

