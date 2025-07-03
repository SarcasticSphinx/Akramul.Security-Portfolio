import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  password: string;
  email: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
