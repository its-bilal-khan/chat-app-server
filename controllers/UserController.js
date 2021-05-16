const models = require('../models');

module.exports = {
    async GetAllUsers(req, resp) {
        try {
            const users = await models.User.find({}).select("name email friendsId").exec();
            resp.send(users);
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    async GetUserById(req, resp) {
        try {
            const user = await models.User.findById(req.params.id).populate({
                path:"friends", select: "name email"
            }).select("name email friends friendsId").exec();

            resp.send({
                id: user._id,
                name: user.name,
                email: user.email,
                friends:user.friends,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            });
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    async GetUserFriends(req, resp) {
        try {
            const user = await models.User.findById(req.params.id).populate({
                path:"friends", select: "name email"
            }).select("friends friendsId").exec();

            resp.send(user.friends);
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    async SearchUsersFriend(req, resp) {
        try {
            const users = await models.User.find({
                $and: [
                    { 
                        friendsId:{ $elemMatch: {$eq: req.query.id } },
                        $or:[
                            {
                                name:{ 
                                    $regex: '.*' + req.query.search + '.*' 
                                }
                            },
                            {
                                email:{ 
                                    $regex: '.*' + req.query.search + '.*' 
                                }
                            }
                        ],  
                    },
                ],
                
            })
            .populate({path:"friends", select:"name email", })
            .select("name email friends friendsId");
            resp.send(users);
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    async SearchUsers(req, resp) {
        try {
            const users = await models.User.find({
                $and: [
                    { 
                        $or:[
                            {
                                name:{ 
                                    $regex: '.*' + req.query.search + '.*' 
                                }
                            },
                            {
                                email:{ 
                                    $regex: '.*' + req.query.search + '.*' 
                                }
                            }
                        ],  
                    },
                ],
                
            })
            .select("name email friendsId");

            resp.send(users);
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    async AddFriend(req, resp) {
        try {
            const doesUserExit = await models.User.exists({ _id: req.body.friendId });;
            const alreadyFriend = await models.User.exists({ friendsId:{ $elemMatch: {$eq: req.body.friendId } }})
            if(doesUserExit && !alreadyFriend){
                const updatedFriend = await models.User.findOneAndUpdate(
                    {
                        _id:req.body.friendId
                    }, 
                    {
                        $push: {
                            friendsId:req.body.userId
                        }
                    },
                    {new: true}
                )
                const updatedUser = await models.User.findOneAndUpdate(
                    {
                        _id:req.body.userId
                    }, 
                    {
                        $push: {
                            friendsId:req.body.friendId
                        }
                    },
                    {new: true}
                )
                resp.send({updatedUser,updatedFriend});
                return;
            }
            if(alreadyFriend){
                resp.status(500).send("Already friends");
                return;
            }
            resp.status(500).send("Invalid friend")
        } catch (error) {
            resp.status(500).send(error);
        }
    },
    
    
};