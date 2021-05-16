const models = require('./../models');
const mongoose = require("mongoose");
const ResponseHelper = require('./../shared/ResponseHelper');

module.exports = {

    AddMessage: (msg, callback) => {
        const dbMessage = {
            _id: new mongoose.Types.ObjectId().toHexString(), //5cd5308e695db945d3cc81a9
            message: msg.text,
            attachment: msg.attachment,
            attachmentType: msg.attachmentType,
            sender: msg.senderId,
            receiver: msg.receiverId,
        }
        const message = new models.Message(dbMessage);
        message.save().then((resp)=>{
        }).catch((e)=>{
            resp.status(500).send(ResponseHelper.GetErrorMessage(e))
        })
    }
}