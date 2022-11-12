import * as models from '../models';
export class UserService {
  constructor(userRepo) {
    this.userRepo = userRepo;
  }
  creatUser = async userDto => this.userRepo.createUser(userDto);
  GetAllUsers = async search =>
    this.userRepo.getUsers(['userName', 'friendsId'], search);
  GetUserById = async id =>
    this.userRepo.getUserByIdWithFriends(
      id,
      ['userName', 'friendsId'],
      ['userName'],
    );
  GetUserFriends = async id =>
    this.userRepo.getUserByIdWithFriends(
      id,
      ['userName', 'friendsId'],
      ['userName'],
    );

  getUserWithPasswordByUserName = async userName =>
    this.userRepo.getUserByUserName(userName);

  SearchUsersFriend = async (id, search) =>
    this.userRepo.searchUserFriends(id, search, ['userName', 'friendsId']);
  SearchUsers = async search =>
    this.userRepo.searchUserFriends(search, ['userName', 'friendsId']);
  AddFriend = async (userId, friendId) => {
    const doesUserExit = await this.userRepo.userExists(friendId);

    const alreadyFriend = await this.userRepo.isAlreadyAFriend(friendId);
    if (alreadyFriend) {
      throw Error.BadRequest('Already a friend');
    }
    if (doesUserExit && !alreadyFriend) {
      const updatedFriend = await this.userRepo.addFriend(friendId, userId);
      const updatedUser = await this.userRepo.addFriend(userId, friendId);
      return resp.send({ updatedUser, updatedFriend });
    }
    throw Error.BadRequest('Invalid friend');
  };
}
