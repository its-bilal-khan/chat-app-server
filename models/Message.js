import mongoose from 'mongoose';
import { MESSAGE_STATUS, USER_STATUS } from '../constants/events.constants';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  id: {
    type: String,
  },
  text: {
    type: String,
    default: 'NA',
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Number,
  },
  isSaved: {
    type: Boolean,
    default: true,
  },
  status: {
    type: String,
    enum: Object.keys(MESSAGE_STATUS),
    default: MESSAGE_STATUS.SENT,
  },
  userStatus: {
    type: String,
    enum: Object.keys(USER_STATUS),
    default: USER_STATUS.ONLINE,
  },
  chatId: {
    type: String,
  },
});

export const MessageModel = mongoose.model('Message', MessageSchema);
