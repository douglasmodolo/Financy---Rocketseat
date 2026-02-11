import { Service } from "typedi";
import { CreateTransactionInput, UpdateTransactionInput } from "../dtos/input/transaction.input.js";
import { prismaClient } from "../../prisma/prisma.js";


@Service()
export class TransactionService {

    async createTransaction(data: CreateTransactionInput, userId: string) {
        return prismaClient.transaction.create({
            data: {
                ...data,
                userId
            },
        });
    }

    async getTransactionsByUserId(userId: string) {
        return prismaClient.transaction.findMany({
            where: { userId },
        });
    }

    async updateTransaction(id: string, data: UpdateTransactionInput, userId: string) {
        const transaction = await prismaClient.transaction.findUnique({
            where: { id, userId },
        });

        if (!transaction) {
            throw new Error('Transação não encontrada.');
        }

        return prismaClient.transaction.update({
            where: { id, userId },
            data: {
                amount: data.amount ?? transaction.amount,
                description: data.description ?? transaction.description,
                date: data.date ?? transaction.date,
                categoryId: data.categoryId ?? transaction.categoryId,
            },
        });
    }

    async deleteTransaction(id: string, userId: string) {
        const transaction = await prismaClient.transaction.findUnique({
            where: { id, userId },
        });

        if (!transaction) {
            throw new Error('Transação não encontrada.');
        }

        await prismaClient.transaction.delete({
            where: { id, userId },
        });
    }

    async findTransaction(id: string, userId: string) {
        const transaction = await prismaClient.transaction.findUnique({
            where: { id, userId },
        });

        if (!transaction) {
            throw new Error('Transação não encontrada');
        }

        return transaction;
    }
}