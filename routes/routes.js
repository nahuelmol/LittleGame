const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

router.get('/', async (req, res) => {
    res.render('main');
});

router.get('/register', csrfProtection, async (req, res) => {
    res.render('register', {
        csrfToken:req.csrfToken()
    });
});

router.get('/projects', async (req, res) => {
    res.render('projects');
});

router.get('/contact', csrfProtection, async (req, res) => {
    res.render('contact', {
        csrfToken:req.csrfToken()
    });
});

router.get('/login', async (req, res) => {
    res.render('login', {
        csrfToken:req.csrfToken()
    });
});

module.exports = router;

