const express = require('express');
const { orders } = require('./data/orders');
const app = express();
var jwt = require('jsonwebtoken');

let privateKey = "ironmaiden"

app.use(express.json())

app.use((req, res, next) => {

    if (req.url == '/token') {
        next();
    }
    else {
        //kullanıcının bana gönderdiği tokenı header üzerinden aldım
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(' ')[1]
            try {

                jwt.verify(token, privateKey);
                next();

            } catch (error) {
                res.status(401).json({ "msg": "Hayırdır komşu nereye böyle..." })
            }
        }
        else {
            res.status(401).json({ "msg": "Hayırdır komşu nereye böyle..." })
        }


    }

})



app.get('/api/orders', (req, res) => {
    res.json(orders);
})


app.post('/token', (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    //username password doğru ise token generate edeceksin
    if (email == "gojira@mail.com" && password == "123") {

        let token = jwt.sign({ email: email }, privateKey,
            {
                // algorithm:'ES512'
                expiresIn: 300,
                issuer:'Code Academy'
            })
        res.json({ "token": token })

    }
    else {
        res.status(401).json({ "msg": "Email or password error" })
    }

})



app.listen(3000)