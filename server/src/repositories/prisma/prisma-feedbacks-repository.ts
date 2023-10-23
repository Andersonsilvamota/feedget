import { prisma } from "../../prisma";
import { FeedbaksRepository, FeedbackCreateData } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbaksRepository{
    async create({type, comment, screenshot}: FeedbackCreateData){
        await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        })
    }
}