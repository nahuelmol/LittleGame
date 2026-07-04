const express   = require('express');
const router    = express.Router();
const axios     = require('axios');
const { add_contact, del_contact } = require("./../../db/script_firebase.js");

const TL = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(TL)

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
            let err = { error:error.message };
            res.status(500).json(err);
      }); 
})

router.post('/create-contact', async (req, res) => {
    res.send("Hello from A!")
    user_example = {
        name:"Nahuel Molina",
        age:27
    }
    add_contact(user_example);
})

router.get('/delete-contact', async (req, res) => {
    res.send('Hello deleting!')
    //I should study how to extract an ID and send it to del_contact(id)
    del_contact(id);
})

module.exports = router;
