import {Injectable} from '@nestjs/common';
import {PrismaService} from '../prisma/prisma.service';
import {Task} from '@prisma/client';

@Injectable()
export class TaskService {
    constructor(private prisma: PrismaService) {
    }

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: number) {
        return this.prisma.task.findFirst({
            where: {id: id},
        });
    }

    async createTask(data: Task): Promise<Task> {
        return this.prisma.task.create({data})
    }

    async updateTask(id: number, data: Task): Promise<Task> {
        return this.prisma.task.update({
            where: {id: id},
            data: data
        })
    }
}
