const User = require('../models/user.model');

module.exports.getAllUser = (req,res) => {
    User.find().then((user)=>{
        res.json({user});
    },(err)=>{
        res.status(400).send(err);
    })
};

// module.exports.Register = async (req, res)=> {
//     const email = req.body.email;
//     await User.findOne({email : email},(err, user)=>{
//         if(user == null){
//             const user = new User(req.body)
//             user.save((err,result)=>{
//                 if(err) {return res.json(err)};
//                 return res.json(result);
//             })
//         }
//     })
// };