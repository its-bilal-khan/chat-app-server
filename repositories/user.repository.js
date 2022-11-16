import * as models from './../models';
export class UserRepository {
  async createUser(userDto) {
    const user = new models.UserModel(userDto);
    return user.save();
  }
  #getDbSelectColumnObj = selectedColumns => selectedColumns.join(' ');

  getUserByUserName = async userName =>
    models.UserModel.findOne({ userName }).select(
      'userName password friendsId',
    );

  getUsers = async (selectedColumns = [], search) => {
    return search
      ? this.searchUsers(search, selectedColumns)
      : models.UserModel.find({}, this.#getDbSelectColumnObj(selectedColumns));
  };

  getUserByIdWithFriends = async (
    id,
    userSelectedColumns,
    friendSelectedColumns,
  ) =>
    models.UserModel.findById(
      id,
      this.#getDbSelectColumnObj(userSelectedColumns),
    )
      .populate({
        path: 'friends',
        select: friendSelectedColumns.join(' '),
      })
      .populate({
        path: 'lastMessages',
      });
  searchUserFriends = async (friendId, searchQuery, userSelectedColumns) =>
    models.UserModel.find(
      {
        $and: [
          {
            friendsId: { $elemMatch: { $eq: friendId } },
            $or: [
              {
                userName: {
                  $regex: '.*' + searchQuery + '.*',
                },
              },
            ],
          },
        ],
      },
      this.#getDbSelectColumnObj(userSelectedColumns),
    ).populate({
      path: 'friends',
      select: 'userName',
    });

  searchUsers = async (searchQuery, userSelectedColumns) =>
    models.UserModel.find(
      {
        userName: {
          $regex: '.*' + searchQuery + '.*',
        },
      },
      this.#getDbSelectColumnObj(userSelectedColumns),
    );

  userExists = async id =>
    models.UserModel.exists({
      _id: id,
    });

  isAlreadyAFriend = async (userId, id) =>
    models.UserModel.exists({
      _id: userId,
      friendsId: { $elemMatch: { $eq: id } },
    });
  addFriend = async (userId, friendId, chatId) =>
    models.UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $push: {
          friendsId: friendId,
          chatIds: chatId,
        },
      },
      { new: true },
    );
}
