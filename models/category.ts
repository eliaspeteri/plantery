import mongoose, { model, Schema, Types } from 'mongoose';
import { NewCategory } from '../types';

export interface ICategory extends Document, NewCategory {
  posts: Types.ObjectId[];
}

const categorySchema: Schema = new Schema<ICategory>({
  title: {
    type: String,
    required: true,
    minlength: 3,
    unique: true
  },
  description: {
    type: String,
    required: true,
    minlength: 3
  },
  posts: {
    type: [Schema.Types.ObjectId],
    required: false
  }
});

categorySchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.models.Category ||
  model<ICategory>('Category', categorySchema);
