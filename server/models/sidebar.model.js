// models/sidebar.model.js
import mongoose from "mongoose";

// Define child schema recursively
const childSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    default: "",
  },
  url: {
    type: String,
  },
  children: [] // initially empty, will define recursively below
});

// Recursive assignment
childSchema.add({
  children: [childSchema]
});

// Top-level sidebar schema
const sidebarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
    default: "",
  },
  url: {
    type: String,
  },
  children: [childSchema]
}, {
  timestamps: true
});

export default mongoose.model("Sidebar", sidebarSchema);
