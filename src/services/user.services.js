import UserRepository from '../repositories/user.repository';

export default class UserService {
    static findAll(filter = {}) {
        return UserRepository.getAll(filter);
    }

    static async create(payload) {
        console.log('Creating a new user 🙋‍♂️');
        const user = await UserRepository.create(payload);
        console.log(`User created successfully (${user._id}) 🙋‍♂️`);
        return user;
    }

    static findById(uid) {
        return UserRepository.getById(uid);
    }

    static updateById(uid, payload) {
        return UserRepository.updateById(uid, payload);
    }

    static deleteById(uid) {
        return UserRepository.deleteById(uid);
    }
}
