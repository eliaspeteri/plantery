import { model, Schema, Document } from 'mongoose';
import { Cultivation, Plant } from '../types';

export interface IPlant extends Document {
  id: string;
  name: string;
  scientificName: string;
  description?: string;
  cultivation?: Cultivation;
  createdAt: string | Date;
  createdBy?: string;
  updatedAt?: string | Date;
  updatedBy?: string;
  ecology?: string;
  taxonomy?: string;
}

const plantSchema: Schema = new Schema<Plant>({
  name: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  cultivation: {
    temperature: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    },
    humidity: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    },
    light: {
      type: String,
      enum: ['shade', 'half-shade', 'medium-sun', 'full-sun'],
      required: true
    },
    water: {
      timesPerMonth: {
        type: Number,
        required: true
      },
      temperature: {
        min: {
          type: Number,
          required: true
        },
        max: {
          type: Number,
          required: true
        }
      }
    },
    fertilizer: {
      timesPerMonth: {
        type: Number,
        required: true
      }
    },
    acidity: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

plantSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  }
});

export default model<IPlant>('Plant', plantSchema);
