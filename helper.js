export const encodeString = stringMessage => {
  // const mess = "incresing buffer size a bit snowman'☃'"
  const bLength = Buffer.byteLength(stringMessage);
  const buffArray = Buffer.alloc(bLength);
  if (typeof stringMessage === 'string') {
    buffArray.write(stringMessage);
  } else {
    buffArray.writeUInt8(stringMessage);
  }
  return buffArray;
  // console.log(bLength, buffArray.toString("UTF-8"));
};

export const decodeString = bufferArray => {
  return bufferArray.toString('UTF-8');
};
export const getMessage = respObj => {
  let respMessage = JSON.stringify(respObj);
  return encodeString(respMessage);
};
