'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    name: String,
    type: {
        type: String,
        default: 'admin'
    },
    role:{
        type:String
    },
    status:{
        type:Boolean,
        default:true
    },
    deleted:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

var Admin = module.exports = mongoose.model('admin', adminSchema);

var salt = bcrypt.genSaltSync(10);

module.exports.createUser = (newUser, callback) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
        // Store hash in your password DB.
        if(err) console.log(err)
        newUser.password = hash;
        newUser.save(callback);
    });
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    Admin.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    Admin.findById(id, callback);
}

module.exports.comparePassword = async (candidatePassword, hash, callback) => {
    try {
        let isMatch = await bcrypt.compareSync(candidatePassword.toString(), hash)     
        return (null, isMatch);
    } catch (error) {
        throw error
    }

    // bcrypt.compare(candidatePassword.toString(), hash, function(err, isMatch) {
    //     // res === true
    //     if(err) throw err;
    // });
}

module.exports.resetPassword = async (newUser, callback) => {

    let hash = await bcrypt.hashSync(newUser.password, salt)
    newUser.password = hash
    newUser.save(callback)

    // bcrypt.hash(newUser.password, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     newUser.password = hash;
    //     newUser.save(callback);
    // });
}