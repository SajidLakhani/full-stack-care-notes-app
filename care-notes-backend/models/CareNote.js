import { Schema, model } from 'mongoose';

const CareNoteSchema = new Schema({
  residentName: { type: String, required: true },
  authorName: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Number, default: Date.now },
});

export default model('CareNote', CareNoteSchema);
