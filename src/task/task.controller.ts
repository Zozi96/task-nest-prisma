import {Body, Controller, Get, NotFoundException, Param, Post, Put} from '@nestjs/common';
import {TaskService} from './task.service';
import {Task} from "@prisma/client";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get()
    async getAllTasksApi() {
        return await this.taskService.getAllTasks();
    }

    @Get(':id')
    async getTaskApi(@Param('id') id: string) {
        const task = await this.taskService.getTaskById(Number(id));
        if (!task) throw new NotFoundException('Task does not exist')
        return task
    }

    @Post()
    async createTaskApi(@Body() data: Task) {
        return await this.taskService.createTask(data);
    }

    @Put(':id')
    async updateTaskApi(@Param('id') id: string, @Body() data: Task) {
        return await this.taskService.updateTask(Number(id), data);
    }
}
