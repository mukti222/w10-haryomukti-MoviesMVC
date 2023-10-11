const pool = require("../config/connection");

class UserRepository {
    //CREATE
    static createUser(user, callback) {
        const { email, gender, password, role } = user;

        // Mengambil ID terakhir dari database
        const getLastUserIdQuery = 'SELECT id FROM users ORDER BY id DESC LIMIT 1';

        pool.query(getLastUserIdQuery, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                let newId = 1;

                // Jika ada data, gunakan ID terakhir dan tambahkan 1
                if (result.rows.length > 0) {
                    newId = result.rows[0].id + 1;
                }

                // Query untuk memasukkan pengguna baru dengan ID yang telah dihitung
                const insertUserQuery = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5)';

                pool.query(insertUserQuery, [newId, email, gender, password, role], (err, insertResult) => {
                    if (err) {
                        callback(err, null);
                    } else {
                        callback(null, newId);
                    }
                });
            }
        });
    }

    //GET
    static getAllUsers(callback) {
        const query = 'SELECT email, gender, role FROM users';

        pool.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                const users = result.rows;
                callback(null, users);
            }
        });
    }

    //UPDATE
    static updateUserById(id, updatedUser, callback) {
        const { email, gender, password, role } = updatedUser;
        const query = 'UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5';
    
        pool.query(query, [email, gender, password, role, id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }
    
    //DELETE
    static deleteUserById(id, callback) {
        const query = 'DELETE FROM users WHERE id = $1';
    
        pool.query(query, [id], (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        });
    }    
}

module.exports = UserRepository;
