import mongoose, { Document, Schema } from "mongoose";

// Interface for a single image object
export interface IImage {
  src: string;
  alt: string;
}

// Interface for the main document
// Changed 'image: IImage;' to 'images: IImage[];'
export interface IArticle extends Document {
  title: string;
  description: string;
  images: IImage[]; // Now an array of IImage
}

// Schema for a single image object
const ImageSchema = new Schema<IImage>(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false } // Optional: prevents Mongoose from creating _id for sub-documents if not needed
);

// Main schema for EducationAndCertification
const educationAndCertification = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [ImageSchema],
    },
  },
  { timestamps: true }
);

// Model definition
const EducationAndCertification =
  mongoose.models.EducationAndCertification ||
  mongoose.model<IArticle>("EducationAndCertification", educationAndCertification);

export default EducationAndCertification;
