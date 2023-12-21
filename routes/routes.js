const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('main')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.get('/blogs', async (req, res) => {
    res.render('blogs')
})

module.exports = router;



