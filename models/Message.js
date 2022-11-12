import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
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
    attachments: [
      {
        file: String,
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const MessageModel = mongoose.model('Message', MessageSchema);
