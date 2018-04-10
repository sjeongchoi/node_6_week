const express = require('express');
const tbl_user = require('../models/user');
const router = express.Router();

/* GET users listing. */

router.post('/', (req, res) => {
    tbl_user.create(req.body)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send(err)
        });
});

router.post('/login', (req, res) => {
    let id = req.body.user_id;
    let pw = req.body.user_pw;
    tbl_user.findOneByUserId(id)
        .then((user) => {
            if(user.password !== pw) {
                return res.status(404).send({ err: `비밀번호가 틀렸습니다.` });
            } else {
                console.log(user);
                res.json(user);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = router;
