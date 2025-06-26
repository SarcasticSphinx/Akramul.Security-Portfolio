import mongoose, { Document, Schema } from "mongoose";

export interface ITestimonial extends Document {
  testimonialId: number;
  name: string;
  testimonial: string;
  company: string;
  profilePic: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    testimonialId: { type: Number, unique: true },
    name: { type: String, required: true },
    profilePic: { type: String },
    testimonial: { type: String, required: true },
    company: { type: String },
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", TestimonialSchema);
export default Testimonial;
