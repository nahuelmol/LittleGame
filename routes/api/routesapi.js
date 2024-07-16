const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/create-set', async (req, res) => {
    let url = 'https://mybackend-234b.onrender.com/api/create-data-set';
    axios.post(url)
        .then(response => {
            //res.json(response.data);
            let strjson = JSON.stringify(response.data);
            let message = { msg: strjson }
            //res.status(200).json(response.data);
            res.status(200).json(message);
        })
        .catch(error => {
            let err = { error : error.message };
            res.status(500).json(err);
      }); 
})

router.get('/delete-set', async (req, res) => {
    let url = 'https://backer.onrender.com/create-set';
    axios.get(url)
        .then(response => {
            let strjson = JSON.stringigy(response.data);
            let message = { msg: strjson }
            res.status(200).json(message);
        })
        .catch(error => {
            let err = { error : error.message };
            res.status(500).json(err);
      }); 
})

module.exports = router;
