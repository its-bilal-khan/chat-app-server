import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: 'User name already exist',
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
    },
    friendsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    chatIds: [String],
  },
  {
    timestamps: true,

    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.plugin(mongooseUniqueValidator);
userSchema.virtual(
  'friends',
  {
    ref: 'User',
    localField: 'friendsId',
    foreignField: '_id',
    justOne: false,
  },
  { toJSON: { virtuals: true } },
);
userSchema.virtual(
  'lastMessages',
  {
    ref: 'Message',
    localField: 'chatIds',
    foreignField: 'chatId',
    justOne: false,
    options: {
      sort: {
        date: -1,
      },
      limit: 1,
    },
  },
  { toJSON: { virtuals: true } },
);
export const UserModel = mongoose.model('User', userSchema);
