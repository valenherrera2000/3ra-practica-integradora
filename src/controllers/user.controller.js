import UserService from '../services/user.services';

export default class UserController {
    static async create(data) {
        console.log('Creating a new user 🙋‍♂️');
        const newUser = await UserService.create(data);
        console.log('User created successfully 🙋‍♂️');
        return newUser;
    }

    static async get(query = {}) {
        const users = await UserService.findAll(query);
        return users;
    }

    static async getById(userId) {
        const user = await UserService.findById(userId);
        if (!user) {
            throw new Error(`User ID not found: ${userId} 😨`);
        }
        return user;
    }

    static async updateById(userId, data) {
        await UserController.getById(userId);
        console.log('Updating the user 🙋‍♂️');
        await UserService.updateById(userId, data);
        console.log('User updated successfully 🙋‍♂️');
    }

    static async deleteById(userId) {
        await UserController.getById(userId);
        console.log('Deleting the user 🙋‍♂️');
        await UserService.deleteById(userId);
        console.log('User deleted successfully 🙋‍♂️');
    }
}
