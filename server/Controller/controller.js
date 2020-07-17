const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.getAllUser = (req,res) => {
    User.find().then((user)=>{
        res.json({user});
    },(err)=>{
        res.status(400).send(err);
    })
};

module.exports.Register = (req,res) => {
    const email = req.body.data.email;
    User.findOne({email : email},(err,user)=>{
        if(err){
            return res.json({err});
        }
        if(user == null){
            const user = new User(req.body.data)
            user.save((err, result) => {
                if(err){
                    return res.json(err);
                }
                return res.json({result});
            })
        }
        User.create(user);
    });
};

module.exports.Login = (req,res) =>{
    const email = req.body.data.email;
    console.log(email,'[email]');
    
    const password = req.body.data.password;
    console.log(password,'[password]');
    
    User.findOne({email : email}).exec((err,user)=>{
        if(err){
            return res.json({err});
        }
        if(!user){
            return res.json({err : 'username are incorrect'});
        }
        if(user.password !== password){
            return res.json({
                'login' : 'password are incorrect'
            });
        }
        const token = jwt.sign(email, process.env.TOKEN_SECRET);
        res.json({
            email : user.email,
            password : user.password,
            token : token,
            'login' : 'success'
        })
    })   
};

