import { UserSchema } from '../models/Schemas/UserSchema.js';


const result = UserSchema.validate({ username: '', password: '' });

console.log(result.error?.details[0].message);

