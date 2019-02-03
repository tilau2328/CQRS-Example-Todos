import * as mongoose from 'mongoose';

export const TodoEventSchema = new mongoose.Schema({
  type: String,
  listId: String,
  payload: String,
});