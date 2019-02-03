import { Document } from 'mongoose';

export interface Todo extends Document {
    completed: boolean;
    listId: string;
    title: string;
}