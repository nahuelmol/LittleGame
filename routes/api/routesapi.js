import express  from 'express';
import axios    from 'axios';
import bcrypt   from 'bcryptjs';
import { faker }    from '@faker-js/faker';
import multer   from 'multer';

const router    = express.Router();

import { add_user, add_contact, del_contact }   from './../../db/script_firebase.js';
import { findUser, findContact }                from '../../db/utils.js';
import { requireAuth, TL }   from '../middlewares.js';
import { truncate }          from '../utils.js';

const upload = multer()

router.use(TL)

router.get('/create-set', async (_req, res) => {
    let url = process.env.BACKEND_HOST + '/create-data-set';
    axios.post(url)
        .then(response => {
            let strjson = JSON.stringify(response.data);
            console.log(response.data)
            let message = { msg: strjson }
            res.status(200).json(message);
        })
        .catch(error => {
            let err = { error : error.message };
            console.log(error.message)
            res.status(500).json(err);
      }); 
})

router.get('/delete-set', async (_req, res) => {
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
    let now = truncate(Date.now(), 2)
    let contact = {
        name:data.username,
        email:data.email,
        description:data.description,
        leido:false,
        respondido:false,
        seed:false,
        time:now
    }
    let resp = add_contact(contact);
    if (resp == true) {
        res.json({ ok:true });
        return res.redirect("/console");
    } else {
        res.json({ ok:false });
    }
})

router.get('/delete-contact/:id', async (req, _res) => {
    const { query } = req.query
    const contactID = req.params.id;
    console.log(query);
    del_contact(contactID);
})

router.post('/register', upload.none(), async (req, res) => {
    const data = req.body;
    let user = await findUser(data.name, "name");
    if(user){
        console.log('user already exists');
        return
    }
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(data.password, salt);
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
    const user = await findUser(data.name, "name");
    if(user){
        const ok = await bcrypt.compare(
            data.password,
            user.password
        )
        if(!ok){
            res.status(401).send("Invalid credentials");
        }
        req.session.user = {
            id: user.id,
            username: user.name
        };
        return res.redirect('/console')
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

router.post("/seed/find/contact", requireAuth,(req, res) => {
    var complete = req.body['fname'] +" "+ req.body['lname'];
    findContact(complete, 'name');
    res.json({ ok:true });
})

router.get("/seed/:n", requireAuth,(req, res) => {
    const n = req.params.n;
    const symbols = [".", "_"]
    for (let i = 0;i < n; i++){
        let name = faker.person.fullName();
        let fname = name.split(" ")[0];

        let numbr = faker.number.int(100);
        let symbn = faker.number.int(2);

        let email = fname + symbols[symbn] + numbr + "@gmail.com"
        let description = faker.lorem.sentences(5);
        let now = truncate(Date.now(), 2)

        let contact = {
            name,
            email,
            description,
            leido:false,
            respondido:false,
            seed:true,
            time:now
        }
        add_contact(contact);
    }
    res.json({ ok:true });
});

router.get("/seed/del/:opc", requireAuth, (req, res) => {
    const opc = req.params.opc;
    switch(opc) {
        case "all":{
            console.log("delete all");
            del_contact("all");
            break;
        }
        default:{
            if (/^\d+$/.test(opc)) {
                const id = Number(opc);
                console.log("delete id:", id);
                del_contact(id);
            } else {
                return res.status(400).json({
                    ok: false,
                    error: "Invalid option"
                });
            }
            break;
        }
    }
    res.json({ ok:true });
});

export default router;
