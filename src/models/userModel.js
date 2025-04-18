const db = require('../config/db.js');

class User {
    async getAllUsers() {
        const res = await db.query('SELECT * FROM users');
        return res.rows;
    }

    async getUser(id) {
        const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return res.rows[0];
    }

    async createUser(data) {
        const res = await db.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id', [data.name, data.email]);
        return res.rows[0].id;
    }

    async updateUser(id, data) {
        await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [data.name, data.email, id]);
    }

    async deleteUser(id) {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
    }
}

module.exports = new User();

