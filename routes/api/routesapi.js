const express   = require('express');
const router    = express.Router();
const axios     = require('axios');
const bcrypt    = require('bcryptjs');

const { add_user, add_contact, del_contact } = require("./../../db/script_firebase.js");
const { findUser } = require('../../db/utils.js');

const multer = require('multer')
const upload = multer()

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

router.post('/create-contact', upload.none(), async (req, res) => {
    const data = req.body
    let contact = {
        name:data.username,
        email:data.email,
        description:data.description
    }
    add_contact(contact);
    res.json({ ok:true });
})

router.get('/delete-contact/:id', async (req, res) => {
    const { query } = req.query
    const contactID = req.params.id;
    console.log(query);
    del_contact(contactID);
})

router.post('/register', upload.none(), async (req, res) => {
    const data = req.body;
    let user = await findUser(data.name);
    if(user){
        console.log('user already exists');
        return
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(data.password, salt);
    console.log('hasshed_pass', hashed_pass)
    let new_user = {
        name:data.name,
        email:data.email,
        password:hashed_pass
    }
    add_user(new_user);
    res.json({ ok:true });
});

router.post('/login', upload.none(), async (req, res) => {
    const data = req.body;
    const user = await findUser(data.name);
    if(user){
        const ok = await bycrypt.compare(
            data.password,
            user.password
        )
        if(!ok){
            return res.status(401).send("Invalid credentials");
        }
        req.session.user = {
            id: user.id,
            username: user.username
        };
        res.send('Logged in')
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err)
            return res.sendStatus(500);
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

module.exports = router;
