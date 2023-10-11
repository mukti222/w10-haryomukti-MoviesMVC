const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userControllers");

// router.post('/signin', UserController.signin);
// CRUD utk pengguna
router.post('/register', UserController.register);
router.get('/users', UserController.getUsers);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser );

module.exports = router;


/*PENGETESAN CRUD
// get users (bisa view): http://localhost:3000/user/users
// POST users : http://localhost:3000/user/register
{
    "email": "mukti222@gmail.com",
    "gender": "male",
    "password": "password123",
    "role": "muktiiinew222"
}
//UPDATE PUT users : http://localhost:3000/user/update/101
{
    "email": "muktiudated",
    "gender": "muktiupdated",
    "password": "updated",
    "role": "updated"
}
//DELETE user : http://localhost:3000/user/delete/101
*/