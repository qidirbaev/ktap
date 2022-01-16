import { users } from '../../database/USERS.js';
import { JWT_PRIVATE_KEY } from '../../config/Auth.js';
import jwt from 'jsonwebtoken';

export const authenticate = (user, fn) => {
    console.log('Authenticating as ', user);
    const signed_user = users.find(u => u.id === user.id);
    console.log("User's id: ", user.id);
    if (signed_user) {
        const token = jwt.sign(user.id, JWT_PRIVATE_KEY, { expiresIn: 60 * 60 });
        return fn(null, token);
    } else {
        return fn(new Error('cannot find user'), null);
    }
}