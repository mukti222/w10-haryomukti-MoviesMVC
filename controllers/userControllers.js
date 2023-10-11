const UserService = require("../services/userServices");

class UserController {

    //CREATE
    static register(req, res) {
        const { email, gender, password, role } = req.body;
        UserService.createUser({ email, gender, password, role }, (err, newUserId) => {
            if (err) {
                res.status(500).json({ message: 'Server error' });
            } else {
                res.status(201).json({ message: 'Pengguna terdaftar', userId: newUserId });
            }
        });
    }

    //GET
    static getUsers(req, res) {
        UserService.getAllUsers((err, users) => {
            if (err) {
                res.status(500).json({ message: 'Server error' });
            } else {
                res.render("users", { users });
            }
        });
    }

    //UPDATE
    static updateUser(req, res) {
        const userId = req.params.id; // Ambil ID dari parameter rute
        const updatedUser = req.body; // Ambil data yang akan diubah
    
        UserService.updateUserById(userId, updatedUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Kesalahan server' });
            } else {
                res.status(200).json({ message: 'Pengguna diperbarui' });
            }
        });
    }

    //DELETE
    static deleteUser(req, res) {
        const userId = req.params.id; // Ambil ID dari parameter rute
    
        UserService.deleteUserById(userId, (err) => {
            if (err) {
                res.status(500).json({ message: 'Kesalahan server' });
            } else {
                res.status(200).json({ message: 'Pengguna dihapus' });
            }
        });
    }
}

module.exports = UserController;
