const encodeString = (stringMessage) => {
// const mess = "incresing buffer size a bit snowman'☃'"
const bLength = Buffer.byteLength(stringMessage);
const buffArray = Buffer.alloc(bLength);
buffArray.write(stringMessage);
return buffArray;
// console.log(bLength, buffArray.toString("UTF-8"));
}

const decodeString = (bufferArray) => {
    return bufferArray.toString("UTF-8");
}
const getMessage = (respObj)=>{
    let respMessage = JSON.stringify(respObj);
    return encodeString(respMessage);
}
module.exports = {
    getMessage, 
    decodeString,
    encodeString
}