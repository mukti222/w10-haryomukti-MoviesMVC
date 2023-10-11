//entity User
class User {
    constructor(email, gender, password, role) {
        this.email = email;
        this.gender = gender;
        this.password = password;
        this.role = role;
    }
}

module.exports = User;