import { Document } from 'mongoose';

export interface TodoList extends Document {
    title: string;
}