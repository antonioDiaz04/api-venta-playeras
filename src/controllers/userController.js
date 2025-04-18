const userModel = require('../models/userModel');

class UserController {
    async getUsers(req, res) {
        const users = await userModel.getAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }

    async getUser(req, res, id) {
        const user = await userModel.getUser(id);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'User not found' }));
        }
    }

    async createUser(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const data = JSON.parse(body);
            const id = await userModel.createUser(data);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ id }));
        });
    }

    async updateUser(req, res, id) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const data = JSON.parse(body);
            await userModel.updateUser(id, data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User updated' }));
        });
    }

    async deleteUser(req, res, id) {
        await userModel.deleteUser(id);
        res.writeHead(204);
        res.end();
    }
}

module.exports = new UserController();
