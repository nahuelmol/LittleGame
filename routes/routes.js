const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { requireAuth }   = require('./middlewares.js');

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

router.get('/login', csrfProtection, async (req, res) => {
    res.render('login', {
        csrfToken:req.csrfToken()
    });
});

router.get("/console", requireAuth, (req, res) => {
    res.render('console');
});

module.exports = router;

