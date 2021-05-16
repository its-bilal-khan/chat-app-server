const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message:{
        type:String,
        default:"NA"
    },
    attachment:{
        type:String,
        default:"NA"
    },
    attachmentType:{
        type:String,
        default:"NA"
    },
    sender:{
        type:Schema.Types.ObjectId, ref:"User"
    },
    receiver:{
        type:Schema.Types.ObjectId, ref:"User"
    },

});


const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;