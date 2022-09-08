import mongoose, { model, Schema } from 'mongoose';
import { User } from '../types';

export interface IUser extends Document {}

const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    minlength: 6
  },
  plants: {
    type: Array,
    required: false
  },
  lastLoggedIn: {
    type: Date,
    required: false
  }
});

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.models.User || model<IUser>('User', userSchema);
