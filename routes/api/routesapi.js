const express   = require('express');
const router    = express.Router();
const axios     = require('axios');
const firestore = require("./../../db/script_firebase.js");

router.get('/create-set', async (req, res) => {
    let url = process.env.BACKEND_HOST + '/create-data-set';
    axios.post(url)
        .then(response => {
            //res.json(response.data);
            let strjson = JSON.stringify(response.data);
            console.log(response.data)
            let message = { msg: strjson }
            //res.status(200).json(response.data);
            res.status(200).json(message);
        })
        .catch(error => {
            let err = { error : error.message };
            console.log(error.message)
            res.status(500).json(err);
      }); 
})

router.get('/delete-set', async (req, res) => {
    let url = process.env.BACKEND_HOST + '/delete-set';
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

router.get('/create-cotact-infb', async (req, res) => {
    firestore();
    //I dont know if I have to execute the function above before sending posts
    /*
    let url = process.env.BACKEND_HOST + '/delete-set';
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
    */
})

module.exports = router;
