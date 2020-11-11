import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TasksModule } from './tasks.module';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User) : Promise<Task>{
        const found = await this.taskRepository.findOne({
            where: {
                id,
                userId: user.id
            }
        });        
        if(!found) {
            throw new NotFoundException(`Task with ID \"${id}\" not found`)
        }
        return found;
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user)
    }

    async deleteTask(id: number, user: User): Promise<void> {
        const result = await this.taskRepository.delete({
                id,
                userId: user.id
            })
        if(result.affected === 0) {
            throw new NotFoundException(`Task with ID \"${id}\" not found`);
        }
        // this.tasks = this.tasks.filter(task => task.id !== found.id);
    }
    async updateStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }
    // updateTaskStatus(id: string, status: TaskStatus) : Task{
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
    
}

