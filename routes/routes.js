const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('main');
})

router.get('/register', async (req, res) => {
    res.render('register');
})

router.get('/projects', async (req, res) => {
    res.render('projects');
})

router.get('/contact', async (req, res) => {
    res.render('contact');
})

router.get('/login', async (req, res) => {
    res.render('login');
})

module.exports = router;

