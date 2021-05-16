const User = function(userDetails) {
    this.details = userDetails;
    this.friendsId = userDetails.friendsId;
    this.isFriend = (friendId) => {
        return this.friendsId.includes(friendId)
    }
}
const UserDetails = {
    users: [],
    IsAlreadyJoinded: function (userId) {
        return this.users.find((user) => user.details.id === userId);
    },
    AddUser : function ({user}) {
        const existingUser = this.IsAlreadyJoinded(user.id);
        if(existingUser){
            return existingUser;
        }
        const newUser = new User(user);
        this.users.push(newUser);
        return newUser;
    },
    RemoveUser : function (id) {
        const index = this.users.findIndex(user => user.details.id === id);
        if(index !== -1){
           return this.users.splice(index, 1)[0];
        }
    },
    GetUser : function (id){ return this.users.find(user => user.details.id === id) },
    GetAllUsers : function() { return this.users } ,
}


module.exports = UserDetails;