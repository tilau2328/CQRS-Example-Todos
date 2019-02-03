import * as mongoose from 'mongoose';

export const TodoSchema = new mongoose.Schema({
    todoId: { type: String, unique: true },
    title: { type: String, required: true },
    listId: { type: String, required: true },
    completed: { type: Boolean, default: false },
});