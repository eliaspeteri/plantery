import mongoose, { model, Schema, Types } from 'mongoose';

export interface ISession extends Document {
  user: Types.ObjectId;
  token: String;
  ttl: Date;
}

const sessionSchema: Schema = new Schema<ISession>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true
  },
  ttl: {
    type: Date,
    required: true
  }
});

sessionSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default mongoose.models.Session ||
  model<ISession>('Session', sessionSchema);
