import { Service } from "typedi";
import { prismaClient } from "../../prisma/prisma.js";
import { UpdateCategoryInput } from "../dtos/input/category.input.js";

@Service()
export class CategoryService {

    async createCategory(name: string, userId: string) {
        return prismaClient.category.create({
            data: {
                name,
                userId
            },
        });
    }

    async getCategoriesByUserId(userId: string) {
        return prismaClient.category.findMany({
            where: { userId },
        });
    }

    async updateCategory(id: string, data: UpdateCategoryInput, userId: string) {
        const category = await prismaClient.category.findUnique({
            where: { id, userId },
        });

        if (!category) {
            throw new Error('Categoria não encontrada.');
        }

        return prismaClient.category.update({
            where: { id, userId },
            data: {
                name: data.name ?? category.name,
            },
        });
    }

    async deleteCategory(id: string, userId: string) {
        const category = await prismaClient.category.findUnique({
            where: { id, userId },
        });

        if (!category) {
            throw new Error('Categoria não encontrada.');
        }

        await prismaClient.category.delete({
            where: { id, userId },
        });
    }

    async findCategory(id: string, userId: string) {
        const category = await prismaClient.category.findUnique({
            where: { id, userId },
        });

        if (!category) {
            throw new Error('Categoria não encontrada');
        }

        return category;
    }
}