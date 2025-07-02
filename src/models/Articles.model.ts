import mongoose, { Document, Schema } from "mongoose";

export interface IImage {
  src: string;
  alt: string;
}

export interface IArticle extends Document {
  title: string;
  description: string;
  image: IImage;
  icon?: string; // icon is optional
  link: string;
}

const ImageSchema = new Schema<IImage>({
  src: { type: String, required: true },
  alt: { type: String, required: true },
});

const ArticleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: ImageSchema,
      required: true,
    },
    icon: {
      type: String,
      required: false,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Article =
  mongoose.models.Article || mongoose.model<IArticle>("Article", ArticleSchema);

export default Article;
