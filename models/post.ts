import mongoose, { model, Schema, Types } from 'mongoose';

export interface IPost extends Document {
  createdAt: Date;
  createdBy: Types.ObjectId;
  updatedAt: Date;
  updatedBy: Types.ObjectId;
  postTitle: String;
  message: String;
  category: Types.ObjectId;
  comments?: Types.ObjectId[];
}

const postSchema: Schema = new Schema<IPost>({
  createdAt: {
    type: Date,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedAt: {
    type: Date,
    required: false
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true,
    minlength: 3
  },
  message: {
    type: String,
    required: true,
    minlength: 3
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  comments: {
    type: [Schema.Types.ObjectId],
    ref: 'Comments',
    required: false
  }
});

postSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.models.Post || model<IPost>('Post', postSchema);
