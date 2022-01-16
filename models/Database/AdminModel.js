import { Schema, model } from 'mongoose';
import SERVER_MESSAGES from '../../utils/constants/server-messages.js';

// admin schema
const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: email => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email)
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      SERVER_MESSAGES.uzb.ADMIN_PASSWORD_ERROR
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// export admin model
export default model('Admin', adminSchema);
