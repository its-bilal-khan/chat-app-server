import mongoose from 'mongoose';
import { MESSAGE_STATUS } from '../constants/events.constants';

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
    type: Date,
    index: true,
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
});

export const MessageModel = mongoose.model('Message', MessageSchema);
