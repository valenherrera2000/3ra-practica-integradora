import config from '../config/config.js';

export let UserDao = null;

switch (config.PERSITENCE) {
    case 'file':
    case 'memory':
        throw new Error('Not implemented 😱');
    case 'mongo':
        UserDao = (await import('./user.mongodb.dao.js')).default;
        break;
    default:
        throw new Error('Invalid persistence option in configuration 😱');
}

