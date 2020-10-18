import { IsEnum, IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTaskFilterDto {

    @IsOptional()
    @IsEnum(TaskStatus)
    // @IsIn([
    //     TaskStatus.OPEN,
    //     TaskStatus.IN_PROGRESS,
    //     TaskStatus.DONE,
    // ])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}