import { ICommand } from "@nestjs/cqrs";

export interface ITodoCommand extends ICommand {
    type: string;
}