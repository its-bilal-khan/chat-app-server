const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique : "Email Already Exist",
        dropDups: true
    },
    password: {
        type:String,
        required:true
    },
    emailVerifiedAt: {
        type: Date,
        required:false
    },
    friendsId: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
}, { timestamps: true, toJSON: { virtuals: true } });

userSchema.plugin(uniqueValidator);
userSchema.virtual('friends', {
    ref: 'User',
    localField: 'friendsId',
    foreignField: '_id',
    justOne: false
  },{ toJSON: { virtuals: true } });
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;