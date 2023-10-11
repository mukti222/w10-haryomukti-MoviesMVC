const UserRepository = require("../repositories/userRepository");

class UserService {
    //CREATE
    static createUser(user, callback) {
        UserRepository.createUser(user, callback);
    }
    
    //GET
    static getAllUsers(callback) {
        UserRepository.getAllUsers((err, users) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, users);
            }
        });
    }

    //UPDATE
    static updateUserById(id, updatedUser, callback) {
        UserRepository.updateUserById(id, updatedUser, callback);
    }
    
    //DELETE
    static deleteUserById(id, callback) {
        UserRepository.deleteUserById(id, callback);
    }
}

module.exports = UserService;
