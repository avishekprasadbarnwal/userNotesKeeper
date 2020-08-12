const express = require('express')
const randomstring = require('randomstring')
const router = express.Router()
const User = require('../models/users')
const bcrypt = require('bcrypt')
const saltRounds = 10;



router.get('/register', (req, res) => {
    res.render('register', { user: new User()})
})

router.post('/register', async(req, res) => {
    const secretToken = randomstring.generate()
    bcrypt.hash(req.body.password, saltRounds, async(err, hash) => {
        // Store hash in your password DB.
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            secretToken: secretToken,
            active: false        
        })
        try{
    
            // const emailPresentCheck = await User.findOne({'email': email})
            // if(emailPresentCheck){
            //     res.send('this email already exists')
            //     res.redirect('/')
            //     return;
            // }
    
            //const hash = await user.hashPassword(password);
    
            const newUser = await user.save()
            
    
            res.redirect('login')
        } catch {
            res.render('register', {
                    user: user,
                    errorMessage: "error creating the user" 
            })
        }
    });
    
    
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email}, (err, foundEmail) => {
        if(err){
            res.send('email could not be found')
        } else {
            if(foundEmail){
                bcrypt.compare(password, foundEmail.password, function(err, result) {
                    // result == true
                    if(result === true) {
                        res.render('home')
                    } else {
                        res.send('Kindly enter the correct password')
                    }
                });
            }
        }
    })


})


module.exports = router