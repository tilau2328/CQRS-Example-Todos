import * as mongoose from 'mongoose';

export const TodoListSchema = new mongoose.Schema({
    listId: { type: String, required: true },
    title: { type: String, required: true },
});