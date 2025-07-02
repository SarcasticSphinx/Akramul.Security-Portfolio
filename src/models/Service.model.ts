import mongoose, { Document } from "mongoose";

export interface IService extends Document {
  serviceId: number;
  title: string;
  availability: string;
  content: string;
  category: string;
  icon: string;
  relatedIds: string[];
  status: string;
  confidence: number;
}

const ServiceSchema = new mongoose.Schema(
  {
    serviceId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    relatedIds: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;
