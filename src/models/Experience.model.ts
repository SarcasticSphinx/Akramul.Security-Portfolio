import mongoose, { Document, Schema } from "mongoose";

export interface IStats {
  [key: string]: string; // dynamic keys like clients, assessments, uptime, etc.
}

export interface IExperience extends Document {
  title: string;
  role: string;
  icon: string; // store icon name as string, e.g., 'Building2'
  period: string;
  location: string;
  type: string;
  description: string;
  details: string[];
  achievements: string;
  stats: IStats;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true },
    role: { type: String, required: true },
    icon: { type: String, required: true },
    period: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: [String], required: true },
    achievements: { type: String, required: true },
    stats: { type: Map, of: String, required: true },
  },
  { timestamps: true }
);

const Experience =
  mongoose.models.Experience ||
  mongoose.model<IExperience>("Experience", ExperienceSchema);
  
export default Experience;
