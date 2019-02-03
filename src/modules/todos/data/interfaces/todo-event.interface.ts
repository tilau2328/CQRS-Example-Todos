import { Document } from 'mongoose';

export interface TodoEvent extends Document {
    payload: string;
    listId: string;
    type: string;
}