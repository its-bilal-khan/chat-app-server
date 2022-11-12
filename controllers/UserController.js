export class UserController {
  constructor(userService) {
    this.userService = userService;
  }
  GetAllUsers = async (req, resp) => {
    try {
      const users = await this.userService.GetAllUsers(req.query.search);
      resp.send({ data: users });
    } catch (error) {
      console.error(error);
      resp.status(500).send('Internal Server Error');
    }
  };
  async GetUserById(req, resp) {
    try {
      const user = await this.userService.GetUserById(req.params.id);
      resp.send({
        id: user._id,
        name: user.name,
        email: user.email,
        friends: user.friends,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send(error);
    }
  }
  async GetUserFriends(req, resp) {
    try {
      const user = await this.userService.GetUserFriends(req.params.id);

      resp.send(user.friends);
    } catch (error) {
      console.error(error);
      resp.status(500).send(error);
    }
  }
  getUserDetails = async (req, resp) => {
    const userId = req.user._id;
    const user = await this.userService.GetUserById(userId);
    resp.send({
      data: user,
    });
  };
  async SearchUsersFriend(req, resp) {
    try {
      const userId = req.user._id;
      const user = await this.userService.SearchUsersFriend(
        userId,
        req.query.search,
      );
      resp.send({
        data: user,
      });
    } catch (error) {
      console.error(error);
      resp.status(500).send(error);
    }
  }
  async SearchUsers(req, resp) {
    try {
      const users = await this.userService.SearchUsers(req.query.search);

      resp.send(users);
    } catch (error) {
      console.error(error);
      resp.status(500).send(error);
    }
  }
  AddFriend = async (req, resp) => {
    const { updatedUser, updatedFriend } = await this.userService.AddFriend(
      req.body.userId,
      req.body.friendId,
    );
    return resp.send({ updatedUser, updatedFriend });
  };
}
