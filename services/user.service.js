import { v4 as uuid } from 'uuid';
export class UserService {
  constructor(userRepo, messageService) {
    this.userRepo = userRepo;
    this.messageService = messageService;
  }
  creatUser = async userDto => this.userRepo.createUser(userDto);
  GetAllUsers = async search =>
    this.userRepo.getUsers(['userName', 'friendsId'], search);
  GetUserById = async id =>
    this.userRepo.getUserByIdWithFriends(
      id,
      ['userName', 'friendsId', 'chatIds'],
      ['userName', 'chatIds'],
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

    const alreadyFriend = await this.userRepo.isAlreadyAFriend(
      userId,
      friendId,
    );
    if (alreadyFriend) {
      throw Error.BadRequest('Already a friend');
    }
    if (doesUserExit && !alreadyFriend) {
      const chatId = uuid();
      const updatedFriend = await this.userRepo.addFriend(
        friendId,
        userId,
        chatId,
      );
      const updatedUser = await this.userRepo.addFriend(
        userId,
        friendId,
        chatId,
      );
      return { updatedUser, updatedFriend };
    }
    throw Error.BadRequest('Invalid friend');
  };
}
